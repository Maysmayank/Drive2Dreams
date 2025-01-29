"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import {PlacedStudent} from "@/models/PlacedStudents";
import { StudentCard } from "./PlacedStudents";

export default function DynamicUniversityCardinfo({
  universityImage,
  universityName,
  aboutUniversity,
  cutoffs,
  ageOfUniversity,
  industryConnections,
  highestPackageOffered,
  placementRatio
}: any) {

  const [placedStudentData, setPlacedStudentData] = useState<
  PlacedStudent[]
  >([]);
  const [loading, setLoading] = useState(false);
  
  useEffect(() => {
    
   async function fetchPlacedStudents(){
    try {
      setLoading(true);
      
      const response = await axios.get(`/api/get-placedStudents?universityName=${universityName}`);

      setPlacedStudentData(response.data.placedStudentsData);
    } catch (error) {
      console.error("Error fetching course data:", error);
    } finally {
      setLoading(false);
    }
   }

   fetchPlacedStudents()


  }, []);

  

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
          <h1 className="font-semibold w-[96%] max-h-[270px]  text-4xl text-wrap md:text-6xl text-white">
            {universityName}
          </h1>
        </div>
      </div>
      <div className=" w-[87%] md:w-[80%]  m-auto">
        <div className="structure-container flex flex-col gap-10 mt-10  md:p-5 md:mx-5">
          <div className="flex flex-col gap-5 md:gap-8 mb-2">
            <h1 className="font-semibold text-3xl md:m-auto md:text-6xl text-center ">
              About {universityName}
            </h1>
            <p className="about-university text-justify nunito-para ">
              {aboutUniversity}
            </p>
          </div>

          

          {/* Admission Process */}
          <div className="flex  w-full flex-col  gap-8">
            <h1 className="font-semibold text-2xl md:m-auto md:text-5xl text-center ">
              Admission Process
            </h1>
            <p className="text-justify nunito-para">{cutoffs}</p>
          </div>

          {/* PlacedStudents */}
          {
            placedStudentData.length!==0&&<div className="flex flex-col gap-20">
            <h1 className="text-2xl md:text-5xl font-bold text-center">Placed Students</h1>
            <div className="grid grid-cols-1 md:grid-cols-4">
              {
                placedStudentData.map((student,index)=>{
                  return<StudentCard 
                  key={index}
                  studentImg={student.cloudinaryStudentImageUrl} 
                  studentName={student.studentName}
                  companyName={student.companyName}
                  companyLogo={student.cloudinaryCompanyLogoImageUrl}
                  />
                  
                })
              }
  
            </div>
            </div>
          }
        </div>
      </div>
    </>
  );
}
