'use client'
import React, { useEffect, useState } from 'react';
import CourseCard from '@/components/CourseCard';
import Pagination from './Pagination';
type UniversityData = {
  _id: string;
  universityName: string;
  aboutUniversity: string;
  admissionProcess: string;
  cutoffs: string;
  cloudinaryImageUrl?: string;
  cloudinaryImageName?: string;
}

// Define the course data interface, where university is now of type UniversityData
type CourseData = {
  _id: string;
  university: UniversityData; // Full university object
  title: string;
  courseInfo: string;
  courseOverview: string;
  courseContent?: string[];
  duration?: string;
  syllabus?: string;
}

type CourseDataProps = {
  courseData: CourseData[];
};
const LIMIT=2
// const SKIP=(pagenumber-1)*LIMIT;

export default function OurCourses({ courseData }: CourseDataProps,) {
  
  const [pageNumber,setpageNumber]=useState(1);
  const [allcoursesdata]=useState<CourseData[]>(courseData);
  const [paginatedData,setPaginatedData]=useState<CourseData[]>([])
  const [totalCourses]=useState(courseData.length)

  useEffect(()=>{
    
    function paginationCalculation(){
      let startindex=(pageNumber-1)*LIMIT;
      let endIndex=pageNumber*LIMIT;
      const paginatedCourseData=allcoursesdata.slice(startindex,endIndex)
      setPaginatedData(paginatedCourseData)
    }
    
    paginationCalculation()

  },[pageNumber,LIMIT,courseData])
  
  
  return (
    <div className='relative'>
      <div className='mt-2 flex flex-col items-center pb-10 px-3'>
        <h1 className='font-bold mb-12 text-3xl md:rubik-homepage-title md:text-5xl'>Our Courses</h1>

        {/* Grid for courses */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          
          {paginatedData.length === 0 ? (
            <p className='text-center text-lg col-span-full'>No courses available at the moment.</p>
          ) : (
            paginatedData.map((course) => (
              <CourseCard
                key={course.title}
                image={course.university.cloudinaryImageUrl}
                title={course.title}
                text={course.courseInfo}
                duration={course.duration}
                universityName={course.university.universityName}
              />
            ))
          )}
        
        </div>
          {/* {pageNumber} */}
        {courseData&&<div>
          <Pagination  totalCourses={totalCourses} limit={LIMIT} pageNumber={pageNumber} setpageNumber={setpageNumber}/> 
        </div>
        }
      </div>
    </div>
  );
}
