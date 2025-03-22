"use client";

import { Edit2, Loader2, SquarePlus } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import { BlogType } from "../../../../ModelTypes/ModelTypes";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

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

function Page() {
  const { data: session } = useSession();
  const [blogPosts, setBlogPosts] = useState<BlogType[]>([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  let isAdmin = session?.user.role === "admin";

  useEffect(() => {
    async function fetchAllBlogs() {
      setLoading(true);
      try {
        const response = await axios.get(`/api/blog/get-allblogs`,{
          headers: {
            "Cache-Control": "no-store",
          },
        });
        
        setBlogPosts(response.data.data);
      } catch (error: any) {
        console.error("Error fetching Blogs", error.response?.data?.message);
      } finally {
        setLoading(false);
      }
    }

    fetchAllBlogs();
  },[]);

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
            <span className="text-gray-700 font-semibold">Hi, {session?.user.name}!</span>
          </div>
        </div>
      )}

      {/* Blog Listing Section */}
      <div className="flex flex-col gap-5 md:my-20 my-10 mb-10 w-[95%] md:w-[85%] mx-auto">
        <h1 className="text-3xl md:text-4xl md:my-5 my-4  font-bold text-gray-900 text-center">
          KNOW MORE THROUGH BLOGS
        </h1>

        {loading ? (
          <p className="text-center text-gray-600 items-center m-auto"><Loader2 className="animate-spin"/></p>
        ) : (
         blogPosts.length===0?(<div className="text-center">
          <span>Blog will be added Soon</span>
          </div>):( <div className="grid grid-cols-1 gap-6">
          {blogPosts.map((blog, index) => (
            <Link key={index} href={`/blogs/${encodeURIComponent(blog.title)}`} className="w-full">
              <BlogCard blog={blog} />
            </Link>
          ))}
        </div>)
        )}
      </div>
    </>
  );
}

// Blog Card Component
const BlogCard = ({ blog }: { blog: BlogType }) => {
  return (
    <div className="flex flex-col md:flex-row gap-6 md:h-[280px] bg-white shadow-lg overflow-hidden border border-gray-200 hover:shadow-2xl transition-all duration-300 rounded-lg">
      {/* Thumbnail Image */}
      <div className="w-full md:w-[60%] h-[200px] md:h-auto">
        <Image
          width={380}
          height={200}
          src={blog.thumbnail}
          alt={blog.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Blog Content */}
      <div className="flex flex-col justify-between p-4 w-full">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800">{blog.title}</h2>
        <p className="text-gray-600 text-sm md:text-base">{blog.description.slice(0, 200)}...</p>

        {/* Blog Meta Information */}
        <div className="flex justify-between items-center mt-4 text-gray-500 text-sm">
          <div className="flex items-center gap-2">
            <Image
              src={"/LOGOFINAL.png"}
              width={30}
              height={30}
              alt="logo"
              className="rounded-full"
            />
            <span>By CareerWay</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Page;
