import React from 'react'
import Introduction from '@/components/Introduction'
import OurCourses from '@/components/OurCourses'
import dbConnect from '@/lib/dbConnect'
import { CourseInfoModel } from '@/models/courseInfo'
import PartneredUniversities from '@/components/PartneredUniversities'
type UniversityData = {
  _id: string;
  universityName: string;
  aboutUniversity: string;
  admissionProcess: string;
  cutoffs: string;
  cloudinaryImageUrl?: string;
  cloudinaryImageName?: string;
}

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


async function fetchCourseData(): Promise<CourseData[]> {
  try {
    await dbConnect(); // Connect to the database
    
    const fetchedCourseData = await CourseInfoModel.find({})
      .populate('university') // Populate the university reference
      .lean().exec(); // Convert Mongoose documents to plain JavaScript objects    

    let courseData=  JSON.parse(JSON.stringify(fetchedCourseData))
    
    
    return courseData;
  } catch (error) {
    console.error('Error fetching course data:', error);
    return [];
  }
}


export default async function Home() {
  const courseData = await fetchCourseData();
  
  return (
  
      <div className="w-full">
        <Introduction />

        <OurCourses courseData={courseData}/>

        <PartneredUniversities/>
      </div>
    
  );
}
