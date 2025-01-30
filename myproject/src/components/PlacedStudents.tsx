'use Client'
import { PlacedStudent } from '@/models/PlacedStudents';
import Image from 'next/image'
import React from 'react'



type PlacedStudentsProps = {
  placedStudentData: PlacedStudent[];
};

function PlacedStudents({placedStudentData}:PlacedStudentsProps) {
  return (
    <div className="w-full flex flex-col items-center md:bg-gray-100 py-10 md:mt-10">
      <h1 className="text-3xl md:text-4xl font-extrabold mb-12 md:mb-6 text-gray-800">
        Placed Students
      </h1>

      <div className="grid md:mt-5 w-[77%] grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
        {/* Example student cards */}
        
        {
          placedStudentData.map((student,index)=>{
            return   <StudentCard
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
  );
}

type StudentCardProps = {
  studentImg?: string;
  studentName: string;
  companyName: string;
  companyLogo?: string;
};

function StudentCard({ studentImg, studentName, companyName, companyLogo }:StudentCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden transform transition-transform hover:scale-105 hover:shadow-lg">
      {/* Student Image */}
      <div className="w-full h-48 relative">
        <Image
          src={studentImg|| ''}
          alt={studentName}
          className="object-contain"
          fill
        />
      </div>

      {/* Card Content */}
      <div className="p-4 flex flex-col items-center text-center">
        <h2 className="text-lg font-semibold text-gray-800">{studentName}</h2>
        <p className="text-sm text-gray-500">{companyName}</p>

        {/* Company Logo */}
          <Image
            src={companyLogo|| ''}
            alt={companyName + " Logo"}
            width={80}
            height={80}
            className="object-contain mt-5"
          />
      </div>
    </div>
  );
}


export  {PlacedStudents,StudentCard}
