'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
function CourseCard({ title,text, duration,universityName,image }) {
  let router=useRouter();
  return (
    <div className='courseCardContainer flex  max-w-[390px] md:min-w-[320px] gap-2 flex-col rounded-t-xl  text-center md:max-w-[290px] '>
      <Image src={image} alt="image" className='w-full overflow-hidden rounded-t-xl h-[200px]' width={500} height={500} ></Image>

      <h2 className='text-black font-semibold text-2xl break-words'>{title}</h2>

      <div className=' flex flex-col gap-5 p-4'>
        
        <span className='   line-clamp-6 mb-5'>
          {text}...
        </span>

        <span className='ml-3 text-left'> <p className=' inline font-bold'>Offered university: </p> {universityName}</span>
        <span className='ml-3 font-bold text-left'>Duration : {duration}</span>
      </div>

      <Button className='m-auto w-[50%] bg-[rgb(226,186,74)] mb-6' onClick={()=>(router.push(`/courses/${encodeURIComponent(title)}`))}> Learn More</Button>
    </div>
  )
}

export default CourseCard
