"use client";

import { Edit2, Loader2, SquarePlus, Trash2, X } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BlogType } from "../../../ModelTypes/ModelTypes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ConfirmationModal from "../ConfirmationModal";
import axios from "axios";
import { toast } from "../ui/use-toast";
import { title } from "process";
import { Button } from "../ui/button";
import Editor from "./Editor";
import CloudinaryImageUploader from "../CloudinaryImageUploader";

const blognav = [
    {
        label: "Post",
        icon: <SquarePlus />,
        path: "/admin/create-blog",
    },

];

interface DisplayProps {
    blogs: BlogType[];
}

function ShowBlogs({ blogs }: DisplayProps) {
    const { data: session } = useSession();
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const isAdmin = session?.user?.role === "admin";
    console.log(blogs);

    return (
        <>
            {/* Admin Navigation */}
            {isAdmin && (
                <div className="absolute md:right-5 right-0  md:mt-5">
                    <div className="flex gap-4 items-center">
                        <ul className="flex gap-4">
                            {blognav.map((item, index) => (
                                <li
                                    key={index}
                                    className="flex cursor-pointer hover:scale-110 transition-all items-center p-2 flex-col hover:bg-yellow-200 rounded-md"
                                    onClick={() => router.push(item.path)}
                                >
                                    {item.icon}
                                    {item.label}
                                </li>
                            ))}
                        </ul>
                        <span className="text-gray-700 font-semibold">
                            Hi, {session?.user?.name}!
                        </span>
                    </div>
                </div>
            )}

            {/* Blog Listing Section */}
            <div className="flex flex-col  gap-5 md:my-20 my-14 mb-10 w-[95%] md:w-[85%] mx-auto">
                <h1 className="text-3xl md:text-4xl  md:my-5  font-bold text-gray-900 text-center">
                    KNOW MORE THROUGH BLOGS
                </h1>

                {loading ? (
                    <p className="text-center text-gray-600 items-center m-auto">
                        <Loader2 className="animate-spin" />
                    </p>
                ) : blogs.length === 0 ? (
                    <div className="text-center">
                        <span>Blog will be added soon</span>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 gap-6">
                        {blogs.map((blog, index) => (
                            <BlogCard key={index} blog={blog} />
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}

// Blog Card Component
const BlogCard = ({ blog }: { blog: BlogType }) => {
    const { data: session } = useSession();
    const [showConfirmationModal, setShowConfirmationModal] = useState(false);
    const router = useRouter()
    const [showEditModal, setShowEditModal] = useState(false)
    const handleDeletion = async () => {
        try {
            const response = await axios.delete(`/api/blog/delete-blog?title=${blog.title}&role=${session?.user.role === "admin" ? "admin" : "user"}`)
            if (response.data.success) {
                toast({
                    description: "Blog Deleted",
                    variant: "constructive"
                })

                try {
                    // Call the revalidation API
                    const revalidateResponse = await axios.post("/api/revalidate");
                    if (revalidateResponse.data.success) {
                        console.log("Paths revalidated successfully");
                    } else {
                        console.error("Failed to revalidate paths");
                    }
                } catch (error) {
                    console.log("error occured", error);

                }
            }
            else {
                toast({
                    description: "Trouble Deleting Blog",
                    variant: "destructive"
                })
            }
        } catch (error: any) {
            console.log(error);

            toast({
                description: error.message.response.data.message,
                variant: "destructive"
            })
        } finally {
            setShowConfirmationModal(false)
            router.refresh()
        }

    };

    return (
        <div className="flex relative flex-col md:flex-row gap-6 md:h-[280px] bg-white shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 rounded-lg">
            {/* Thumbnail Image */}
            <Link
                href={`/blogs/${encodeURIComponent(blog.title)}`}
                className="w-full md:w-[60%] h-[200px] md:h-auto"
            >
                <Image
                    width={400}
                    height={200}
                    src={blog.thumbnail || "/LOGOFINAL.png"} // Use a proper fallback image
                    alt={blog.title}
                    className="w-full h-full object-cover"
                />
            </Link>

            {/* Blog Content */}
            <div className="flex flex-col justify-between p-4 w-full">
                <Link href={`/blogs/${encodeURIComponent(blog.title)}`}>
                    <h2 className="text-xl md:text-2xl font-semibold text-gray-800">
                        {blog.title}
                    </h2>
                </Link>
                <p className="text-gray-600 text-sm md:text-base">
                    {blog.description.slice(0, 200)}...
                </p>

                {/* Blog Meta Information */}
                <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
                    <div className="flex items-center gap-2">
                        <Image
                            src={"/LOGOFINAL.png"}
                            width={60}
                            height={50}
                            alt="logo"
                            className="rounded-full"
                        />
                        <span>By CareerWay</span>
                    </div>

                    {/* Trash Icon */}
                    <div

                    >
                        {session?.user.role === "admin" && (
                            <div className=" flex items-center gap-4 absolute right-0">
                                <Edit2 className="hover:scale-110" onClick={() => setShowEditModal(true)} />


                                <Trash2 className="hover:scale-110" onClick={(e) => {
                                    e.stopPropagation(); // Prevent BlogCard click
                                    e.preventDefault(); // Prevent Link navigation
                                    setShowConfirmationModal(true);
                                }} size={25} />
                            </div>
                        )}
                    </div>

                    {/* Confirmation Modal */}

                    {showConfirmationModal && (
                        <ConfirmationModal
                            isVisible={showConfirmationModal}
                            onConfirm={handleDeletion}
                            onCancel={() => setShowConfirmationModal(false)}
                        />
                    )}


                    {
                        showEditModal &&session?.user.email&& (
                            <EditinfoModal title={blog.title} onCancel={() => setShowEditModal(false)} email={session?.user.email} role={session?.user.role} />
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default ShowBlogs;

function EditinfoModal({ title, onCancel, email, role }: { title: string; onCancel: () => void, email: string, role: string }) {
    console.log(email, role);

    const [blogData, setBlogData] = useState<BlogType | null>(null);
    const [thumbnailUrl, setThumbnailUrl] = useState("");

    const handleThumbnailUpload = (url: string) => {
        setThumbnailUrl(url);
        setUpdatedBlog((prev) => ({ ...prev, thumbnail: url }));
    };

    const [updatedBlog, setUpdatedBlog] = useState({
        title: "",
        content: "",
        thumbnail: "",
        description: "",
        userEmail: email, // Initialize with email
        role: role, // Initialize with role
    });

    useEffect(() => {
        setUpdatedBlog((prev) => ({
            ...prev,
            userEmail: email, // Update userEmail
            role: role, // Update role
        }));
    }, [email, role]); // Ensure role is also included in dependencies

    // Fetch blog data when the component mounts or when the title changes
    useEffect(() => {
        async function getBlog(title: string) {
            try {
                const response = await axios.get(`/api/blog/get-blog?title=${title}`);
                if (response.data.success) {
                    setBlogData(response.data.data);
                    setUpdatedBlog((prev) => ({
                        ...prev,
                        ...response.data.data, // Merge fetched data with existing state
                    }));
                    console.log(blogData);

                    toast({
                        description: "You can now Edit the content",
                        variant: "constructive"
                    })
                }
                else {
                    toast(
                        {
                            description: "the content is not fetched correctly",
                            variant: "destructive"
                        }
                    )
                }

            } catch (error) {
                console.error("Error fetching blog data:", error);
                toast({
                    description: "error Occured",
                    variant: "destructive"
                })
            }
        }

        getBlog(title);
    }, [title]); // Ensure `title` is included in the dependency array

    // Loading state
    if (!blogData) {
        return (
            <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="m-4 bg-white h-[100%] flex flex-col text-black w-[98%] md:w-[80%] p-7 rounded-md shadow-lg">
                    <p className="text-black text-center">Loading...</p>
                    <Button onClick={onCancel} className="text-black absolute right-40">
                        <X />
                    </Button>
                </div>
            </div>
        );
    }

    // Handle input changes
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setUpdatedBlog((prev) => ({
            ...prev,
            [name]: value, // Update the specific field in the state object
        }));
    };

    const handleApplyChanges = async () => {
        try {
            console.log(updatedBlog);

            const response = await axios.patch(`/api/blog/update-blog?blogTitle=${blogData.title}`, updatedBlog);
            if (response.data.success) {

                try {
                    const revalidateResponse = await axios.post("/api/revalidate");
                    if (revalidateResponse.data.success) {
                        window.location.reload();
                        console.log("revalidatation done");

                    } else {
                        console.error("Failed to revalidate paths");
                    }

                } catch (error) {
                    console.error("Failed to revalidate paths");

                }
                toast({
                    description: "Blog updated successfully",
                    variant: "constructive",
                });

                onCancel(); // Close the modal after successful update
            } else {
                toast({
                    description: "Failed to update blog",
                    variant: "destructive",
                });
            }
        } catch (error) {
            console.error("Error updating blog:", error);
            toast({
                description: "An error occurred while updating the blog",
                variant: "destructive",
            });
        }
    }

    return (
        <div className="fixed z-50 inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="m-4 bg-white h-[100vh]  overflow-y-scroll flex flex-col text-black w-[98%] md:w-[80%] p-7 rounded-md shadow-lg">
                {/* Input for the title */}
                <p>Editor:{updatedBlog.userEmail}</p>
                <p>role: {updatedBlog.role}</p>
                <div className="flex flex-col mt-10 gap-2">
                    <label htmlFor="title">Title</label>
                    <input
                        name="title"
                        id="title"
                        value={updatedBlog.title} // Use updatedBlog.title as the value
                        onChange={handleInputChange} // Update updatedBlog.title on change
                        className="w-full p-2 mb-4 border  border-gray-300 rounded-md"
                        placeholder="Enter title"
                    />
                </div>

                {/* Input for the description */}
                <div className="gap-2 flex flex-col">
                    <label htmlFor="description">Description</label>
                    <textarea
                        name="description"
                        id="description"
                        value={updatedBlog.description} // Use updatedBlog.description as the value
                        onChange={handleInputChange} // Update updatedBlog.description on change
                        className="w-full p-5 mb-4 border border-gray-300 rounded-md"
                        placeholder="Enter description"
                        rows={4}
                    />
                </div>

                {/* Editor for the content */}
                <Editor
                    setState={(content) =>
                        setUpdatedBlog((prev) => ({
                            ...prev,
                            content, // Update the content field in the state object
                        }))
                    }
                    defaultValue={updatedBlog.content}
                />

                {/* Input for the thumbnail */}
                <div className="p-4 mt-20">

                </div>
                <CloudinaryImageUploader setUrl={handleThumbnailUpload} label={"Select Thumbnail"} />

                <div className="flex md:flex-row  flex-col items-center">
                    {
                        blogData.thumbnail === "" ? (<p className="bg-red-400 p-4 my-5">No thumbnail is uploaded previously</p>) : (
                            <Image src={blogData.thumbnail} alt="Previous blog Image" height={200} width={200}></Image>

                        )
                    }
                    {
                        blogData.thumbnail && <span>previous Image already uploaded</span>

                    }
                </div>

                <Button onClick={onCancel} className="bg-white text-black  absolute right-40">
                    <X />
                </Button>

                <div className="flex  gap-4">
                    <Button
                        className="bg-blue-500 text-white"
                        onClick={handleApplyChanges}
                    >
                        Apply changes
                    </Button>
                </div>
            </div>
        </div>
    );
}