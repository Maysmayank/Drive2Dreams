import dbConnect from '@/lib/dbConnect';
import { CourseInfoModel } from '@/models/courseInfo';
import React, { useState } from 'react'
import AdminCourseCard from './AdminCourseCard';
import ShowCount from '@/components/ShowCount'
type CourseData = {
  _id: string;        // we need id to delete the data or card so we use _id only here as we are getting  the _id from courseData 
  university: string; // Name of the university or college
  title: string; // Title of the course
  courseInfo: string; // Detailed information about the course
  courseOverview: string;
  courseContent?: string[]; // Optional array of strings for course content like syllabus
  duration?: string; // Duration of the course
  syllabus?: string; // Optional field for storing file path or URL to PDF
}

async function fetchCourseData(): Promise<CourseData[]> {
  try {
    await dbConnect(); // Connect to the database
    const courseData = await CourseInfoModel.find({});
    return courseData;
  } catch (error) {
    console.error('Error fetching course data:', error);
    return []; 
  }
}

async function DashboardView() {
  const courseData = await fetchCourseData();

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
                  <AdminCourseCard key={index} id={course._id.toString()} title={course.title} overview={course.courseOverview} />
                ))
              )}
            </div>
          </div>
        </div>

      </div>

    </div>
  )
}

export default DashboardView
