'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import Box from '@mui/material/Box';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';
import Link from 'next/link'
const labels = {
  0.5: '5',
  1: '10',
  1.5: '15',
  2: '20',
  2.5: '25',
  3: '30',
  3.5: '35',
  4: '40',
  4.5: '45',
  5: '50',
};



function CourseCard({ title, text, duration, universityName,affilitatedWith, image, rating }) {
  
  return (
    <div className=' mb-[350px] md:mb-[400px] relative border flex flex-col items-center'>

      <Image src={image} alt="image"
        className={`relative z-10 w-[95%] md:w-[345px] h-[220px] hover:scale-105 transition-transform duration-300`}
        width={300} height={300}  ></Image>

      <div
        className=' absolute border w-[100%]  md:w-[110%]  flex flex-col   md:p-2 top-[85px] md:top-[80px]'
        style={{ boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px' }}
      >
        <div className='px-4 md:px-1 justify-evenly flex flex-col mt-[145px] min-h-[350px] gap-4'>

          <h2 className='font-bold break-words'>{title}</h2>

          <p className='  text-sm text-justify'>{text.slice(0,150)}.. <span className='text-slate-400'>see more</span></p>

          <div className='flex'>
            <p className='text-sm font-semibold'>Duration : {duration}  |   Affiliated with {affilitatedWith}</p>
          </div>
          <div className='bottom-box mt-2 mb-5 flex justify-between  items-center'>

            <div className="flex items-center gap-2">
              <Stack spacing={1}>
                <Rating name="half-rating" readOnly defaultValue={rating} precision={0.5} />
              </Stack>
              <span className="font-semibold">{rating}</span>

            </div>

            <Link href={`courses/${encodeURIComponent(title)}`}>
              <Button className='bg-[#3B80E8] text-white md:mr-2 hover:bg-[#116BF1]'>
                Apply Now
              </Button>
            </Link>

          </div>
        </div>

      </div>
    </div>

  )
}

export default CourseCard
