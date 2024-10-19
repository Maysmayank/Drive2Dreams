'use client'
import React from "react";
import Image from "next/image";
import FormComponent from "./Form";
import Link from "next/link";
export default function DynamicCourseCardinfo({
  courseInfo,
  eligibilityCriteria,
  aboutUniversity,
  title,
  syllabus,
  image
}: any) {

  return (
    <div className="pt-[75px] md:pt-[85px] min-h-[100vh]">
      <div className="w-full pt-16 md:pt-10 relative min-h-[370px] md:min-h-[400px]">
        <Image
          src={image}
          alt="image"
          layout="fill"
          className="object-cover h-full"
        />

        <div className="absolute inset-0 bg-yellow-200 opacity-50"></div>

        <div className="absolute max-h-[300px] grid grid-cols-1 grid-rows-2  gap-28 md:gap-10 ml-5 mt-0 md:ml-16 w-[90%]  md:w-[85%]">
          
          <h1 className="text-2xl md:text-4xl font-semibold w-full text-center break-words overflow-wrap break-word">
            {title}

            <div className="md:flex md:items-center md:justify-center">
            
            
            <Link href="/contact">
              <button className="z-50 bg-blue-700 text-white text-center  rounded-sm px-4 py-1 mt-10 text-[15px] md:px-6 md:py-2">
                Enroll Now
              </button>
            </Link>
          </div>
          </h1>

          

        </div>
      </div>



      <div className=" md:w-[85%] m-auto">
        <div className="structure-container mt-5 pt-5 md:p-5 mx-5">
          <div className="flex flex-col gap-3  mb-5">
            <h1 className=" mb-2 md:mb-5 text-3xl font-semibold md:course-title-dynamic">Course Overview</h1>
            <p className="text-justify nunito-para">{courseInfo}</p>
          </div>

          <div className="flex flex-col gap-8 w-full pt-5 ">
            <h1 className=" md:mb-5 font-semibold text-3xl md:course-title-dynamic">Eligibility Criteria</h1>
            <div className="eligibility-info">
              {
                eligibilityCriteria.length === 0 ? "No eligibility criteria" : (
                  <ul className=" pl-4 md:pl-5 flex flex-col gap-2 list-disc">
                    {eligibilityCriteria.map((item: any, i: number) => (
                      <li key={i}>{item}</li>
                    ))}

                  </ul>
                )
              }
            </div>

            <div className=" text-center syllabus">

              <button className="bg-[#110C44] text-white rounded-md my-6 p-3 px-4" disabled={!syllabus}>
                {!syllabus ? "Syllabus Will be added Soon" : "Download Syllabus"}
              </button>

            </div>
          </div>


          <div className="mt-10 flex flex-col gap-4 aboutuniversity">
            <h1 className="mb-2 md:mb-5 text-3xl font-semibold md:course-title-dynamic">About University</h1>
            <p className="text-justify open-sans-paragraph">
              {aboutUniversity}
            </p>
          </div>

          <div className="mt-20 rounded-md grid grid-cols-1 md:grid-cols-2 gap-10 ">
            <div className=" flex items-center pb-10 md:pb-0 bg-white justify-center ">
              <h1 className="text-5xl font-semibold md:text-8xl ">Talk TO Our Expert</h1>
            </div>
            <FormComponent />
          </div>
        </div>
      </div>
      
    </div>
  );
}
