import React from "react";
import CloudinaryUploader from "@/components/CloudinaryUploader";

interface CourseMediaUploadsProps {
  videoUrl: string;
  setVideoUrl: (url: string) => void;
  brochureUrl: string;
  setBrochureUrl: (url: string) => void;
  ebookUrl: string;
  setEbookUrl: (url: string) => void;
}

export default function CourseMediaUploads({
  videoUrl,
  setVideoUrl,
  brochureUrl,
  setBrochureUrl,
  ebookUrl,
  setEbookUrl,
}: CourseMediaUploadsProps) {
  return (
    <div className="space-y-4">
      <CloudinaryUploader
        setUrl={setBrochureUrl}
        url={brochureUrl}
        label="Upload Brochure"
        type="pdf"
      />

      <CloudinaryUploader
        setUrl={setEbookUrl}
        url={ebookUrl}
        label="Upload Ebook"
        type="pdf"
      />

      <CloudinaryUploader
        setUrl={setVideoUrl}
        url={videoUrl}
        label="Upload Video"
        type="video"
      />
    </div>
  );
} 