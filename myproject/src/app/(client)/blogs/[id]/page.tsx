"use client";

import React, { useEffect, useState } from "react";
import { BlogType } from "../../../../../ModelTypes/ModelTypes";
import axios from "axios";

interface Props {
  params: {
    id: string; // the dynamic parameter from the URL
  };
}

const Page = ({ params }: Props) => {
  const title = decodeURIComponent(params.id);
  const [blog, setBlog] = useState<BlogType | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!title) return;

    const fetchBlog = async () => {
      try {
        setLoading(true);
        const response = await axios.get(`/api/blog/get-blog?title=${title}`);
        if (response.data.success) {
          setBlog(response.data.data);
        } else {
          console.error("Error fetching blog: Blog not found");
        }
      } catch (error) {
        console.error("Error fetching blog:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [title]);

  if (loading) return <div className="text-center text-gray-500 py-10">Loading...</div>;
  if (!blog) return <div className="text-center text-gray-500 py-10">Blog not found</div>;

  return (
    <div className="max-w-4xl mx-auto mt-10  p-6">
   

      {/* Blog Title */}
      <h1 className="text-4xl font-bold text-gray-900 mb-4">{blog.title}</h1>

      {/* Blog Description */}
      <p className="text-lg text-gray-600 mb-8">{blog.description}</p>

      {/* Blog Content */}
      <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: blog.content }} />
    </div>
  );
};

export default Page;
