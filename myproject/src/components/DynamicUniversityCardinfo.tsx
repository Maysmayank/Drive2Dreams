import React from "react";
import Image from "next/image";

export default function DynamicUniversityCardinfo({
  universityImage,
  universityName,
  aboutUniversity,
  cutoffs
}: any) {

  return (
    <>
      <div className="bg-gray-600 pt-[70px] min-h-[400px] w-full relative">
        <Image
          src={universityImage}
          alt="image"
          layout="fill"
          objectFit="cover"
          className="object-contain h-full w-full"
        ></Image>
        
        <div className="absolute inset-0 bg-black opacity-30 "></div>

        <div className="absolute z-10 flex flex-col gap-10 top-[10%] left-[10%] ">

          <h1 className="font-semibold w-[96%] max-h-[270px]  text-4xl text-wrap md:text-6xl text-white">{universityName}</h1>
        </div>
      </div>
      <div className=" w-[87%] md:w-[80%]  m-auto">

        <div className="structure-container flex flex-col gap-10 mt-10  md:p-5 md:mx-5">

          <div className="flex flex-col gap-5 md:gap-8 mb-2">
            <h1 className="font-semibold text-3xl md:m-auto md:text-6xl text-center ">About {universityName}</h1>
            <p className="about-university text-justify nunito-para ">{aboutUniversity}</p>
          </div>

          <div className="flex flex-col gap-5 md:gap-8 mb-2">
            <h1 className="font-semibold text-3xl md:m-auto md:text-6xl text-center ">CutOffs</h1>
            <p className="text-justify nunito-para">{cutoffs}</p>
          </div>

          <div className="flex  w-full flex-col  gap-8">
            <h1 className="font-semibold text-3xl md:m-auto md:text-6xl text-center ">Admission Process</h1>
            <p className="text-justify nunito-para">{cutoffs}</p>
          </div>

          <div className="">
            {
              // Image
            }
          </div>

        </div>
      </div>
    </>
  );
}
