'use client';

import AddPlacedStudents from "@/components/admin/AddPlacedStudentsForm";
import AdminCourseinfoFormComponent from "@/components/admin/AdminCourseinfoForm";
import React from "react";

function addPlacedStudents({courseData,id}:any) {
  return (
    <div className='flex flex-col  w-full bg-gray-900  text-white p-10'>
      <h1 className='font-medium text-3xl mb-5'>Add Placed Students Information</h1>
      <AddPlacedStudents/>
    </div>
  )
}

export default addPlacedStudents
