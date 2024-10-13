import React from "react";
import Image from "next/image";

export default function DynamicUniversityCardinfo({
  universityImage,
  universityName
}: any) {
  return (
    <>
      <div className="bg-gray-600 h-[400px] w-full relative">
        <Image
          src={universityImage}
          alt="image"
          layout="fill"
          objectFit="cover"
          className="object-contain h-full w-full"
        ></Image>
        <div className="absolute inset-0 bg-black opacity-30 "></div>
        
        <div className="absolute z-10 flex flex-col gap-10 top-[10%] left-[10%] ">
        
          <h1 className="font-semibold text-6xl text-white">{universityName}</h1>
          <button className="p-2 w-[100px] bg-blue-700 rounded-md text-white">
            Enroll Now
          </button>
        
        </div>
      </div>
      <div className="w-[80%] m-auto">
        <div className="structure-container mt-5 p-5 mx-5">
          <div className="flex flex-col gap-3 mb-5">
            <h1 className="font-semibold text-3xl">Course Overview</h1>
            <p className="overview ">{"courseOverview"}</p>
          </div>

          <div className="flex w-full ">
            <p className="break-words">{"courseContent"}</p>
          </div>
        </div>
      </div>
    </>
  );
}
