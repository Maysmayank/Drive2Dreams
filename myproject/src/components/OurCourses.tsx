import React from 'react'
import CourseCard from '@/components/CourseCard'
type CourseData={
  university: string; // Name of the university or college
  title: string; // Title of the course
  courseInfo: string; // Detailed information about the course
  courseOverview:string;
  courseContent?: string[]; // Optional array of strings for course content like syllabus
  duration?: string; // Duration of the course
  syllabus?: string; // Optional field for storing file path or URL to PDF
}

type courseDataProps={
  courseData:CourseData[]
} 

export default function OurCourses({courseData}:courseDataProps) {  
  return (
    <div className='relative'>
      <div className='mt-10  flex items-center flex-col gap-20 pb-10 justify-center '>
        <h1 className='font-bold text-4xl'  > Our Courses</h1>
        <div className='flex flex-col gap-8 items-center  md:justify-between md:flex-row md:gap-3 '>
        {courseData.length===0?(
          <p className='text-center text-lg'>No courses available at the moment.</p>
        )
        :
        (
          courseData.map((course)=>(
            <CourseCard  key={course.title} title={course.title} text={course.courseOverview} duration={course.duration}></CourseCard>
          ))
        )}
        </div>
      </div>
    </div>
  )
}

