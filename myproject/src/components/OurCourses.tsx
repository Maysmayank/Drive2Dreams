'use client'
import React, { useEffect, useState } from 'react';
import CourseCard from '@/components/CourseCard';
import Pagination from './Pagination';
import { CourseInfoType } from '../../ModelTypes/ModelTypes';
import Image from 'next/image';
import axios from 'axios';

const LIMIT = 3
interface OurCoursesProps {
  initialCourseData: CourseInfoType[];
  initialTotalPages:number;
}

export default function OurCourses({initialCourseData,initialTotalPages}:OurCoursesProps) {

  const [currentpage, setcurrentPage] = useState(1);
  const [paginatedData, setPaginatedData] = useState<CourseInfoType[]>(initialCourseData)
  const [totalPages, setTotalPages] = useState<number>(initialTotalPages);



  useEffect(() => {
    async function fetch() {
      
      if(currentpage===1) return;

      const response = await axios.get(`/api/get-paginated-data?page=${currentpage}&limit=${LIMIT}`);

      if (response.data.success) {
        setPaginatedData((prevData) => [
          ...prevData, // Existing data
          ...response.data.paginatedCourses, // New data from the API
        ]);

        setTotalPages(response.data.totalPages)
        setcurrentPage(response.data.currentPage)
      }
    }

    fetch()


  }, [currentpage])


  return (
    <div className='relative'>
      <div className='mt-2 flex flex-col items-center pb-5 px-3'>
        <h1 className='font-bold mb-12 text-3xl md:rubik-homepage-title md:text-5xl'>Our Courses</h1>

        {/* Grid for courses */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>

          {paginatedData.length === 0 ? (
            <p className='text-center  items-center flex flex-col text-lg col-span-full'>
              <Image src="/ComingSoon.webp" className='' width={300} height={100} alt='no courses available image' ></Image>
              <span className=''>Hey, Courses are on the way, they will Be added Soon...</span>
            </p>
          ) : (
            paginatedData.map((course) => (
              <CourseCard
                key={course.title}
                image={course.university.cloudinaryImageUrl}
                title={course.title}
                text={course.courseInfo}
                duration={course.duration}
                universityName={course.university.universityName}
              />
            ))
          )}

        </div>
        {
          paginatedData &&

          <Pagination currentPage={currentpage} totalPages={totalPages} onPageChange={setcurrentPage} />
        }

      </div>
    </div>
  );
}
