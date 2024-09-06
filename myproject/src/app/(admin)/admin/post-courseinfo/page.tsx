'use client';

import AdminCourseinfoFormComponent from "@/components/admin/AdminCourseinfoForm";
import React from "react";

function AddCourseInfo({courseData,id}:any) {
  return (
    <div className='flex flex-col  w-full bg-gray-900  text-white p-10'>
      <h1 className='font-medium text-3xl mb-5'>Add Course Information</h1>
      <AdminCourseinfoFormComponent courseData={courseData} id={id}/>
    </div>
  )
}

export default AddCourseInfo
