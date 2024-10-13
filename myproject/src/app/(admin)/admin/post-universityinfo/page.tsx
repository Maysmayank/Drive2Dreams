'use client';

import AdminUniversityinfoFormComponent from "@/components/admin/AdminUniversityinfoForm";
import React from "react";

function AddCourseInfo({courseData,id}:any) {
  return (
    <div className='flex flex-col  w-full bg-gray-900  text-white p-10'>
      <h1 className='font-medium text-3xl mb-5'>Add University Information</h1>
      <AdminUniversityinfoFormComponent/>
    </div>
  )
}

export default AddCourseInfo
