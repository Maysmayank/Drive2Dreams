import React from "react";
import Image from "next/image";
export default function DynamicCourseCardinfo({
  courseOverview,
  courseContent,
  title
}: any) {
  return (
    <>
      <div className="bg-gray-600 h-[300px] w-full relative">
        <Image
          src="/home.jpg"
          alt="image"
          layout="fill"
          objectFit="cover"
          className=" object-cover h-full w-full "
        ></Image>
        <div className="absolute inset-0 bg-yellow-200 opacity-50"></div>
        <div className="absolute flex flex-col gap-5 top-[30%] left-[10%]"> 
        <h1 className= " font-semibold text-6xl">{title}</h1>
        <button className="  p-2 bg-blue-700 rounded-md text-white">
          Enroll Now
        </button>
        </div>
      

      </div>
      <div className="w-[80%] m-auto">
        <div className="structure-container mt-5  p-5 mx-5 ">
          <div className="flex flex-col gap-3 mb-5">
            <h1 className="font-semibold text-3xl">Course Overview</h1>
            <p className="overview">{courseOverview}</p>
          </div>

          <div className="flex">
            <p>{courseContent}</p>
          </div>

        </div>
      </div>
    </>
  );
}
