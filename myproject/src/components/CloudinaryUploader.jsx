'use client';
import { CldUploadButton } from 'next-cloudinary';

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;

const CloudinaryUploader = ({ videoUrl, setVideoUrl }) => {

  const handleSuccess = (result) => {
    // The result object contains information about the uploaded file
    if (result.event === 'success') {
      // The URL of the uploaded image is available in result.info.secure_url
      setVideoUrl(result.info.secure_url);
    }
  };

  return (
    <div>
      <CldUploadButton
        options={{ multiple: true }}
        uploadPreset={cloudPresetName}
        onSuccess={handleSuccess} // Use onSuccess instead of onUpload
        className={`${videoUrl?'bg-green-500 ':'bg-red-500'} py-2 px-3 rounded border mt-4 text-white
         transition ease-in-out delay-200`}
      >
        <span className={` text-white`}>{videoUrl ? 'Uploaded' : 'Upload the Video'}</span>
      </CldUploadButton>

      {videoUrl && (
        <div className="mt-4">
          <p>Uploaded File URL:</p>
          <a href={videoUrl} target="_blank" rel="noopener noreferrer">
            {videoUrl}
          </a>
          <span className="block text-red-500 text-center">
            Do not forget to enter the submit button
          </span>
        </div>
      )}
    </div>
  );
};

export default CloudinaryUploader;