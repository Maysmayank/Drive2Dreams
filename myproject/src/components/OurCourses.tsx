'use client'
import React, { useEffect, useState } from 'react';
import CourseCard from '@/components/CourseCard';
import Pagination from './Pagination';
import { CourseInfoType } from '../../ModelTypes/ModelTypes';
import Image from 'next/image';
import axios from 'axios';

const LIMIT = 2
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
    <div className=' mt-10 md:mt-20'>
      <div className='mt-2 flex flex-col items-center pb-0 px-3'>
        <h1 className='font-bold mb-20 text-2xl md:rubik-homepage-title md:text-4xl'>Top MBA/PGDM Programs</h1>

        {/* Grid for courses */}
        <div className='flex flex-col md:flex-row flex-wrap justify-center gap-10 space-x-1 md:ml-28 md:mr-28'>

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
                rating={course.courseRating}
                affilitatedWith={course.affilitatedWith}
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
