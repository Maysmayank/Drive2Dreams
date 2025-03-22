"use client";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import "react-quill/dist/quill.snow.css"; // Add this line
import axios from "axios";
import { toast } from "../ui/use-toast";
import CloudinaryImageUploader from "../CloudinaryImageUploader";
import { revalidatePath } from "next/cache";
import { revalidateCourseData } from "@/lib/action";
import { Router, useRouter } from "next/router";
const Editor = dynamic(() => import("../admin/Editor"), { ssr: false });

interface Payload {
    title: string;
    thumbnail: string;
    description: string;
    content: string;
    role: string;
    userEmail: string;
}

function CreateBlog() {
    const { data: session } = useSession();
    const [thumbnailUrl, setThumbnailUrl] = useState("");
    const [payload, setPayload] = useState<Payload>({
        title: "",
        thumbnail: "",
        description: "",
        content: "",
        role: "",
        userEmail: "",
    });
    // 🔧 Fix: Properly updating `thumbnail` in `payload`
    useEffect(() => {
        setPayload((prev: Payload) => ({ ...prev, thumbnail: thumbnailUrl }));
    }, [thumbnailUrl]);

    const [isPreviewOpen, setIsPreviewOpen] = useState(false);

    useEffect(() => {
        if (session?.user) {
            setPayload((prev: any) => ({
                ...prev,
                role: session.user.role,
                userEmail: session.user.email,
            }));
        }
    }, [session]);

    // Update Payload State
    const handleChange = (field: keyof Payload, value: string) => {
        setPayload((prev) => ({ ...prev, [field]: value }));
    };

    // Submit Function

    const handleSubmit = async () => {
        console.log(payload);
        const response = await axios.post("/api/blog/create-blog", payload)
        if (response.data.success) {
            toast({
                variant:'constructive',
                description: "blog published"
            })
            
            const revalidateResponse = await axios.post("/api/revalidate");
            if (revalidateResponse.data.success) {
                console.log("Paths revalidated successfully");
            } else {
                console.error("Failed to revalidate paths");
            }
    

            
            console.log('revalidation the path /blogs')
        } else {
            toast({
                description: "not published"
            })
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6 flex flex-col gap-4 bg-white shadow-md rounded-lg">
            {/* Title Input */}
            <CloudinaryImageUploader label={"upload thumbnail"} setUrl={setThumbnailUrl} />
            {thumbnailUrl}
            <input
                type="text"
                placeholder="Title"
                value={payload.title}
                onChange={(e) => handleChange("title", e.target.value)}
                className="w-full p-3 text-3xl font-bold border-b outline-none"
            />

            {/* descrioption Input */}
            <input
                type="text"
                placeholder="Write Description about the blog (max 3-4 lines)"
                value={payload.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full p-3 text-lg text-gray-500 border-b outline-none"
            />

            {/* Editor Component */}
            <Editor setState={(content: string) => handleChange("content", content)} />

            <div className="flex md:mt-20 gap-4">
                {/* Submit Button */}
                <button
                    onClick={handleSubmit}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Publish
                </button>

                {/* Preview Button */}
                <button
                    onClick={() => setIsPreviewOpen(true)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
                >
                    Preview
                </button>
            </div>

            {/* Preview Modal */}
            {isPreviewOpen && (
                <div className="fixed  inset-0 bg-black bg-opacity-50  flex items-center justify-center p-4">
                    <div className="bg-white overflow-y-scroll p-6 rounded-lg shadow-lg max-w-4xl py-20 h-full w-full">
                        <h2 className="text-3xl font-bold">{payload.title}</h2>
                        <h3 className="text-lg text-gray-500 mt-2">{payload.description}</h3>
                        <div className="mt-4 border-t pt-4 text-gray-700">
                            {/* Apply ql-editor class to the preview content */}
                            <div className="ql-editor" dangerouslySetInnerHTML={{ __html: payload.content }} />
                        </div>

                        {/* Close Button */}
                        <button
                            onClick={() => setIsPreviewOpen(false)}
                            className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

export default CreateBlog;