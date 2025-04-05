'use client';

import AdminCourseinfoFormComponent from "@/components/admin/AdminCourseinfoForm";
import React from "react";

interface PageProps {
  params: {
    id?: string;
  };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default function Page({ params, searchParams }: PageProps) {
  return (
    <div className='flex flex-col w-full bg-gray-900 text-white p-10'>
      <h1 className='font-medium text-3xl mb-5'>Add Course Information</h1>
      <AdminCourseinfoFormComponent id={params.id} />
    </div>
  );
}
