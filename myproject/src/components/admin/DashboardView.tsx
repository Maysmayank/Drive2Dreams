import dbConnect from '@/lib/dbConnect';
import { CourseInfoModel } from '@/models/courseInfo';
import React, { useState } from 'react'
import AdminCourseCard from './AdminCourseCard';
import ShowCount from '@/components/ShowCount'
import { UniversityInfoModel } from '@/models/UniversityModel';
import AdminUniversityCard from '@/components/admin/AdminUniversityCard'
import { CourseInfoType, UniversityInfoType } from '../../../ModelTypes/ModelTypes';

async function fetchCourse_University_Data(): Promise<{ courseData: CourseInfoType[], universityData: UniversityInfoType[] }> {
  try {
    await dbConnect(); // Connect to the database
    const courseData = await CourseInfoModel.find({});
    const universityData = await UniversityInfoModel.find({});
    return { courseData, universityData }; // Return both as an object
  } catch (error) {
    console.error('Error fetching course and university data:', error);
    return { courseData: [], universityData: [] }; // Return empty arrays on error
  }
}

async function DashboardView() {
  const {courseData,universityData} = await fetchCourse_University_Data();
  
  return (
    <div className='flex min-h-screen bg-gray-900  text-white p-10'>
      <div className='flex flex-col w-full'>
        <h1 className='font-medium text-3xl mb-5'>Dashboard</h1>

        <div className='flex flex-col gap-10'>
          <ShowCount />
          <div className='flex flex-col gap-10
          '>
            <p className='font-semibold text-2xl'>Courses You have added so Far</p>


            <div className='items-center grid grid-cols-1  md:grid-cols-2 lg:grid-cols-3 gap-6' >
              {courseData.length === 0 ? (
                <p className='text-center text-lg col-span-full'>No courses available at the moment.</p>
              ) : (
                courseData.map((course, index) => (
                  <AdminCourseCard key={index} id={course._id.toString()} title={course.title} overview={course.courseInfo} />
                ))
              )}
            </div>
          </div>

          <div className='flex flex-col gap-5'>
              
              <h1 className='font-semibold text-2xl'>Universities Added</h1>

              <div className='grid  items-center gap-5 justify-center w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-4 '>
              {
                universityData.length===0?(
                  <p className='text-center text-lg col-span-full'>No University Added</p>
                ):(
              
              universityData.map((university,index)=>(
                <AdminUniversityCard key={index} id={university._id?.toString()} image={university.cloudinaryImageUrl} universityName={university.universityName}/>
              )))}
              </div>
             
          </div>
        </div>

      </div>

    </div>
  )
}

export default DashboardView
