'use client'
import React, { useEffect, useState } from 'react';
import CourseCard from '@/components/CourseCard';
import Pagination from './Pagination';
import { CourseInfoType } from '../../ModelTypes/ModelTypes';


type CourseDataProps = {
  courseData: CourseInfoType[];
};
const LIMIT=2
// const SKIP=(pagenumber-1)*LIMIT;

export default function OurCourses({ courseData }: CourseDataProps,) {
  
  const [pageNumber,setpageNumber]=useState(1);
  const [allcoursesdata]=useState<CourseInfoType[]>(courseData);
  const [paginatedData,setPaginatedData]=useState<CourseInfoType[]>([])
  const [totalCourses]=useState(courseData.length)

  useEffect(()=>{
    
    function paginationCalculation(){
      let startindex=(pageNumber-1)*LIMIT;
      let endIndex=pageNumber*LIMIT;
      const paginatedCourseData=allcoursesdata.slice(startindex,endIndex)
      setPaginatedData(paginatedCourseData)
    }
    
    paginationCalculation()

  },[pageNumber,LIMIT,courseData,allcoursesdata])
  
  
  return (
    <div className='relative'>
      <div className='mt-2 flex flex-col items-center pb-5 px-3'>
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
