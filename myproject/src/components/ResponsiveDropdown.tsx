'use client';
import { Dispatch, SetStateAction, useEffect } from "react";
import { useRouter } from 'next/navigation'
import React from 'react';
interface CourseInfoSearchBarType{
  title:string;
  UniversityName:string;
}

interface ResponsiveDropdownProps {
  value: string; 
  courseInfo:CourseInfoSearchBarType[];
  setValue: Dispatch<SetStateAction<string>>;
  
}

function ResponsiveDropdown( { value, setValue,courseInfo} :ResponsiveDropdownProps) {
    let router=useRouter();
    
  return (
    <div id='dropDownDiv' >
      {value &&courseInfo.length > 0 && (
        
        <div className='relative flex flex-col items-center justify-center bg-white  pt-4 pb-2 rounded-b-md md:pt-2  md:pb-1 text-black'>
          <div className=' flex flex-col items-center gap-2'>

            <span className='text-sm opacity-90'>Results ({courseInfo.length})</span>
            <ul className='flex flex-col gap-2 '>
          

              {courseInfo.map((course, ind) => (
                
                <li 
                  onClick={() => {
                    setValue("")
                  router.push(`/courses/${encodeURIComponent(course.title)}`);
                  }}
                
                  className='flex flex-col gap-2 px-3 py-1 md:px-4 md:py-1 hover:bg-blue-400 text-sm break-words' key={ind} >
                  <span>{course.title} </span> 
                  <span className='text-[12px]'> university: {course.UniversityName} </span>           
                  <hr />
                </li>

                
              ))}
            </ul>

            {courseInfo.length<4?<p className='opacity-60 text-sm'> No more results</p> :<p className='opacity-60 text-sm'>see more results</p>}
          </div>
        </div>
      )}
    </div>
  );
}

export default ResponsiveDropdown;
