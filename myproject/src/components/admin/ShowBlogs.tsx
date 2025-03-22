"use client";

import { Edit2, Loader2, SquarePlus, Trash2 } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { BlogType } from "../../../ModelTypes/ModelTypes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import ConfirmationModal from "../ConfirmationModal";
import axios from "axios";
import { toast } from "../ui/use-toast";

const blognav = [
    {
        label: "Post",
        icon: <SquarePlus />,
        path: "/admin/create-blog",
    },
    {
        label: "Edit",
        icon: <Edit2 />,
        path: "/admin/edit-blog",
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
                <div className="absolute right-5 mt-5">
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
            <div className="flex flex-col gap-5 md:my-20 my-10 mb-10 w-[95%] md:w-[85%] mx-auto">
                <h1 className="text-3xl md:text-4xl md:my-5 my-4 font-bold text-gray-900 text-center">
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
    const router=useRouter()

    const handleDeletion = async() => {
        try {
            const response = await axios.delete(`/api/blog/delete-blog?title=${blog.title}&role=${session?.user.role==="admin"?"admin":"user"}`)
            if(response.data.success){
                toast({
                    description:"Blog Deleted",
                    variant:"constructive"
                })
            }
            else{
                toast({
                    description:"Trouble Deleting Blog",
                    variant:"destructive"
                })
            }
        } catch (error:any) {
            console.log(error);
            
            toast({
                description:error.message.response.data.message,
                variant:"destructive"
            })
        }finally{
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
                        onClick={(e) => {
                            e.stopPropagation(); // Prevent BlogCard click
                            e.preventDefault(); // Prevent Link navigation
                            setShowConfirmationModal(true);
                        }}
                    >
                        {session?.user.role === "admin" && (
                            <div className="hover:scale-110 absolute right-5">
                                <Trash2 size={25} />
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
                </div>
            </div>
        </div>
    );
};

export default ShowBlogs;