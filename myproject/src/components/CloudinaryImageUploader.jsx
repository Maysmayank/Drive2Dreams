'use client';
import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useState } from 'react';

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

const CloudinaryImageUploader = ({ setUrl, label }) => {
  const [preview, setPreview] = useState(null);

  const handleSuccess = (result) => {
    if (result.event === 'success') {
      const imageUrl = result.info.secure_url;
      setUrl(imageUrl);
      setPreview(imageUrl);
    }
  };

  return (
    <div className="flex items-center gap-6 border p-6 rounded-lg shadow-lg bg-white">
      {/* Left: Wireframe Preview */}
      <div className="w-[500px] h-[200px] border-2 border-dashed border-gray-400 flex items-center justify-center rounded-lg bg-gray-100">
        {preview? (
            <div className='h-[200px]'>
          <Image src={preview} alt="thumbnailImage" height={200} width={200} className="h-full  w-full rounded-lg " />
            </div>
        ) : (
          <p className="text-gray-500 text-sm text-center">Thumbnail image will appear here</p>
        )}
      </div>

      {/* Right: Upload Button */}
      <div className="flex flex-col items-center">
        <CldUploadButton
          options={{ multiple: false, resourceType: 'image' }}
          uploadPreset={cloudPresetName}
          onSuccess={handleSuccess}
          className={`${
            preview ? 'bg-green-500' : 'bg-blue-500'
          } py-2 px-4 rounded-lg text-white transition-all`}
        >
          {preview ? 'Uploaded' : label}
        </CldUploadButton>

        {preview && (
          <a
            href={preview}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-2 text-blue-500 underline text-sm"
          >
            View Full Image
          </a>
        )}
      </div>
    </div>
  );
};

export default CloudinaryImageUploader;
