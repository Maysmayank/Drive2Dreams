import React, { useState } from 'react'
import Introduction from '@/components/Introduction'
import OurCourses from '@/components/OurCourses'
import axios from 'axios'

type CourseData={
  university: string; // Name of the university or college
  title: string; // Title of the course
  courseInfo: string; // Detailed information about the course
  courseOverview:string;
  courseContent?: string[]; // Optional array of strings for course content like syllabus
  duration?: string; // Duration of the course
  syllabus?: string; // Optional field for storing file path or URL to PDF
}


async function  getServerSideProps():Promise<CourseData[]>{
  try {
    const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/get-courseinfo`);
    const courseData: CourseData[] = res.data.courseData; // Extract courseData from API response
    
    return courseData;
  } catch (error) {
    console.error('Error fetching course data:', error);
    return[]
  }
};

export  default async function Home() {

  const courseData=await getServerSideProps();
  return (
  <>
  <div className='w-full'>
    <Introduction/>
    <OurCourses courseData={courseData}/>
  </div>
  
  </>
  )
}