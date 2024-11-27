import React from 'react'
import Introduction from '@/components/Introduction'
import OurCourses from '@/components/OurCourses'
import dbConnect from '@/lib/dbConnect'
import StayConnected from '@/components/StayConnected'
import { CourseInfoModel } from '@/models/courseInfo'
import PartneredUniversities from '@/components/PartneredUniversities'
import { UniversityInfoType ,CourseInfoType} from '../../../ModelTypes/ModelTypes'



export default async function Home() {

  
  return (
  
      <div className="w-full flex flex-col gap-10">
        <Introduction />

        <OurCourses />

        <PartneredUniversities/>
        
        <StayConnected/>
      </div>
    
  );
}
