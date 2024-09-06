import React from 'react'
import Introduction from '@/components/Introduction'
import OurCourses from '@/components/OurCourses'
import axios from 'axios'
import dbConnect from '@/lib/dbConnect'
import { CourseInfoModel } from '@/models/courseInfo'
import { revalidateTag } from 'next/cache'
type CourseData={
  _id:string;
  university: string; // Name of the university or college
  title: string; // Title of the course
  courseInfo: string; // Detailed information about the course
  courseOverview:string;
  courseContent?: string[]; // Optional array of strings for course content like syllabus
  duration?: string; // Duration of the course
  syllabus?: string; // Optional field for storing file path or URL to PDF
}


async function fetchCourseData(): Promise<CourseData[]> {
  try {
    await dbConnect(); // Connect to the database
    const fetchedcourseData = await CourseInfoModel.find({})
    const totalCourses=await CourseInfoModel.countDocuments();
    
    
    const courseData = fetchedcourseData.map((course) => ({                        //Only plain objects can be passed to Client Components from Server Components.
      _id: course._id.toString(), // Convert MongoDB ObjectId to string
      university: course.university,
      title: course.title,
      courseInfo: course.courseInfo,
      courseOverview: course.courseOverview,
      courseContent: course.courseContent,
      duration: course.duration,
      syllabus: course.syllabus,
    }));
    
    return courseData;

  } catch (error) {
    console.error('Error fetching course data:', error);
    return []
  }
}

export default async function Home() {
  const courseData = await fetchCourseData();
  
  return (
  
      <div className="w-full">
        <Introduction />
        <OurCourses courseData={courseData}/>
      </div>
    
  );
}
