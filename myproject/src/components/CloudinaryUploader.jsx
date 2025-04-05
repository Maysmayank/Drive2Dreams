'use client';
import { CldUploadButton } from 'next-cloudinary';

const cloudPresetName = process.env.NEXT_PUBLIC_CLOUDINARY_PRESET_NAME;



const CloudinaryUploader = ({ url, setUrl,label,type }) => {

  const handleSuccess = (result) => {
    // The result object contains information about the uploaded file
    console.log(result);
    
    if (result.event === 'success') {
      // The URL of the uploaded image is available in result.info.secure_url
      if(type==='pdf'){
        setUrl(result.info.secure_url.replace("/raw/upload/", "/raw/upload/fl_attachment/"));
      }else{
        setUrl(result.info.secure_url);
      }
    }
  };

  return (
    <div>
      <CldUploadButton
        options={{ multiple: true, resourceType:`${type==='pdf'?'raw':'video'}`}}
        uploadPreset={cloudPresetName}
        
        onSuccess={handleSuccess} 
        className={`${url?'bg-green-500 ':'bg-red-500'} py-2 px-3 rounded border mt-4 text-white
         transition ease-in-out delay-200`}
      >
        <span className={` text-white`}>{url ? 'Uploaded' : label }</span>
      </CldUploadButton>

      {url && (
        <div className="mt-4  w-full text-wrap  break-words">
          {url.includes("/raw/")?<p>Uploaded pdf link</p>:<p>Uploaded Video Link</p>}
          <a href={url} target="_blank" rel="noopener noreferrer">
            {url}
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