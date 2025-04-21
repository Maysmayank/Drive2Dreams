import React from 'react'
import Introduction from '@/components/Introduction'
import OurCourses from '@/components/OurCourses'
import dbConnect from '@/lib/dbConnect'
import StayConnected from '@/components/StayConnected'
import { CourseInfoModel } from '@/models/courseInfo'
import RecruiterPanel from '@/components/RecruiterPanel'
import { CourseInfoType} from '../../../ModelTypes/ModelTypes'
import PopularPrograms from '@/components/PopularPrograms'
import PopUpForm from '@/components/PopUpForm'
import {ReviewCard} from '@/components/ReviewCard'
/**
 * 
 * we are using this serversideprop to get the inital 3 courses to prevent loading the contents at first on client side
 * so first three data will be loaded on the server and then the rest will be dynamically handled based on see more button
 */
const LIMIT=3
async function serverSideFetchCourseData(): Promise<{initialCourseData:CourseInfoType[]}> {
  try {
   
    await dbConnect(); // Connect to the database
    
    const fetchedCourseData = await CourseInfoModel.find({category:'masters'})
      .populate('university') // Populate the university reference
      .lean().exec(); // Convert Mongoose documents to plain JavaScript objects    
    
      let initialCourseData = JSON.parse(JSON.stringify(fetchedCourseData))
    const totalCourses=await CourseInfoModel.countDocuments();
  
    
    let initialTotalPages=Math.ceil(totalCourses/LIMIT);
      
    return {initialCourseData};
  } catch (error) {
    console.error('Error fetching course data:', error);
    return {initialCourseData:[]};
  }
}


export default async function Home() {

  const {initialCourseData}=await serverSideFetchCourseData();
  
  
  return (
  
      <div className="w-full flex flex-col md:gap-5">
        <PopUpForm/>
        <Introduction />
        <PopularPrograms/>
        <OurCourses initialCourseData={initialCourseData}/>
        <ReviewCard/>
        <RecruiterPanel/>
        <StayConnected/>
      </div>
    
  );
}
