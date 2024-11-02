import React from 'react'
import Introduction from '@/components/Introduction'
import OurCourses from '@/components/OurCourses'
import dbConnect from '@/lib/dbConnect'
import StayConnected from '@/components/StayConnected'
import { CourseInfoModel } from '@/models/courseInfo'
import PartneredUniversities from '@/components/PartneredUniversities'
import { UniversityInfoType ,CourseInfoType} from '../../../ModelTypes/ModelTypes'


async function fetchCourseData(): Promise<CourseInfoType[]> {
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
  
      <div className="w-full flex flex-col gap-10">
        <Introduction />

        <OurCourses courseData={courseData}/>

        <PartneredUniversities/>
        
        <StayConnected/>
      </div>
    
  );
}
