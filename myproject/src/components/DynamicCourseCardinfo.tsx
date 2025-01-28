"use client";
import React from "react";
import Image from "next/image";
import FormComponent from "./Form";

import Link from "next/link";
import {PlacedStudents} from  '@/components/PlacedStudents'
import { GraduationCap } from "lucide-react";
import SalientFeaturesCard from '@/components/SalientFeaturesCard'
import { Button } from "./ui/button";
import { PlacedStudent } from "@/models/PlacedStudents";
const Specialization = [
  'MArketing',
  'OB and HRM',
  "Fianance",
  "Business Analytics",
  "International Business",
  "Logistics and Supply Chain",
  "New Age and StartUps"
]
const features = {
  "Certifications": [
    "Power BI",
    "Digital and Social Media Marketing",
    "Statistical Package for the Social Sciences (SPSS)",
    "Foreign Language (French/German)",
    "Blockchain",
    "Marketing Analytics",
    "Business Analytics",
    "HR Analytics",
    "Yellow Belt Six Sigma"
  ],
  "Talk Series": [
    "The Chanakya Talk Series (CTS)",
    "The Prabodhan Talk Series (PTS)",
    "Samreek Leadership Talks (SLT)"
  ],

  "Programs": [
    "Employability Skills Enhancement Programme (ESEP)",
    "Self Directed Learning (SDL)",
    "Outbound Training Programme",
    "Corporate Awareness Programme"
  ]
};
type DynamicCourseCardinfoProps = {
  title: string;
  courseInfo: string;
  videoUrl:string;
  specializationOffered:string[];
  eligibilityCriteria: string[];
  image: string | undefined; 
  aboutUniversity: string;
  universityName: string;
  syllabus?: string;
  placedStudentData:PlacedStudent[];
};


export default function DynamicCourseCardinfo({
  courseInfo,
  eligibilityCriteria,
  aboutUniversity,
  title,
  specializationOffered,
  syllabus,
  videoUrl,
  universityName,
  image,
  placedStudentData
  
}: DynamicCourseCardinfoProps) {

  return (
    <div className="md:pt-[85px] min-h-[100vh]">
      
      <h1 className="text-wrap text-xl md:text-3xl text-left font-bold md:w-[70%] px-3 py-8 md:ml-28">
        {title}
      </h1>

      <div className=" flex flex-col-reverse gap-10  md:flex-row  md:max-w-[85%] m-auto md:mt-10 justify-between " style={{ boxShadow: " rgba(0, 0, 0, 0.15) 10px 5px 30px, rgba(0, 0, 0, 0.23) 0px 6px 6px" }}>
        
        <div className="left-container ml-8  pb-5 flex flex-col gap-5 ">

          <div className="flex items-center md:pt-8 gap-3">

            <GraduationCap size={35} />
            <h2 className="font-semibold text-2xl">Specialization Offered </h2>

          </div>


          <ul className="list-disc list-inside flex flex-col gap-1 md:px-4 ">

            {
              specializationOffered.map((item) => {
                return <>
                  <li className="text-left text-wrap break-words">
                    {item}
                  </li>
                </>
              })
            }

          </ul>

          <Button className="bg-blue-500 w-[40%] text-center hover:bg-blue-700 ml-2 mt-2 md:mb-0 mb-10">Get Brochure</Button>
        </div>


        <div className="right-container flex flex-col justify-center m-auto h-[240px] md:h-[400px]">
          <video controls width={550} height={500} muted autoPlay loop>
          <source src={videoUrl} type="video/mp4"/>
          </video>
        </div>
      </div>


      <section className="my-12 md:my-20 md:py-10 ">
        <SalientFeaturesCard features={features} courseInfo={courseInfo} universityName={universityName} courseTitle={title} />

      </section>

      <div className="m-auto w-[90%] flex flex-col gap-4 md:gap-8">
        {/*About University */}
        <div className="w-full  m-auto md:my-5  flex flex-col md:flex-row justify-between items-center gap-5" >

          <div className="md:w-[80%] p-2">
            <h1 className=" mb-5 text-3xl font-semibold md:course-title-dynamic">
              {`Why ${universityName} ?`}
            </h1>
            <p className="text-justify tezt-md">
              {aboutUniversity}
            </p>
          </div>

          <div className="right-container  h-[200px] md:h-[280px] hover:scale-105 transition-all" style={{ boxShadow: "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px" }}>
            <Image
              src={image|| ''}
              alt="image"
              layout="contain"
              height={500}
              width={700}
              className="object-fill h-full rounded-md"
            />
          </div>
        </div>


        {/* course OverView
        <div className="w-full structure-container my-10 ">

          <div className="flex flex-col gap-3  mb-5">
            <h1 className=" mb-2 md:mb-5 text-3xl font-semibold md:course-title-dynamic">
              Course Overview
            </h1>
            <p className="text-justify nunito-para">{courseInfo}</p>
          </div>
        </div> */}

        {/* Eligibility Criteria */}
        <div className="w-full">

          <h1 className=" mb-5 font-semibold text-3xl md:course-title-dynamic">
            Eligibility Criteria
          </h1>

          <div className="eligibility-info">
            {eligibilityCriteria.length === 0 ? (
              "No eligibility criteria"
            ) : (
              <ul className=" pl-4 md:pl-5 flex flex-col gap-2 list-disc">
                {eligibilityCriteria.map((item: any, i: number) => (
                  <li key={i} className="break-words">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
        
        {/**Syllabus */}
        <div className=" text-center syllabus hidden">
          <button
            className="bg-[#110C44] text-white rounded-md my-6 p-3 px-4"
            disabled={!syllabus}
          >
            {!syllabus
              ? "Syllabus Will be added Soon"
              : "Download Syllabus"}
          </button>
        </div>
       

{    placedStudentData.length!==0&&    <PlacedStudents placedStudentData={placedStudentData}/>
}

        
        <h1 className="text-3xl mt-10  m-auto font-semibold md:text-5xl ">
              Talk To Our Expert
        </h1>
        
        <div className=" mt-8 md:mt-5 mb-10 rounded-md grid grid-cols-1 md:grid-cols-2 gap-10 ">
          
          <div className=" flex relative items-center md:flex-col justify-center ">  
            <Image src={'/expert.gif'} 
            unoptimized
            className="w-full h-full"
            width={200} height={200} alt="expert"/>
            
          </div>
          <strong className="md:hidden text-xl text-slate-600 m-auto">Fill Out the Form </strong>
          <FormComponent />
        </div>
      </div>

    </div>
  );
}
