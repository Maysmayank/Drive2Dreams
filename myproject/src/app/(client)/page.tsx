import React from 'react'
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



// Fetch data using a server-side function
async function fetchCourseData(): Promise<CourseData[]> {
  try {
    const res = await fetch(`${process.env.NEXTAUTH_URL}/api/get-courseinfo`, {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Cache-Control': 'no-cache',
  },
});
    if(!res.ok){
      console.log("Failed to fetch the data");
      
    }
    const data=await res.json();
    
    return data.courseData; // Extract courseData from API response
  } catch (error) {
    console.error('Error fetching course data:', error);
    return []; // Return an empty array in case of error
  }
}
// export const revalidate=10

export default async function Home() {
  const courseData = await fetchCourseData();
  
  return (
  
      <div className="w-full">
        <Introduction />
        <OurCourses courseData={courseData} />
      </div>
    
  );
}
