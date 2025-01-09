'use client'
import React from 'react'
import Image from 'next/image'
import { Button } from './ui/button'
import { useRouter } from 'next/navigation'
import { Star } from 'lucide-react'
import Link from 'next/link'
function CourseCard({ title, text, duration, universityName, image }) {
  
  return (
  <div className=' mb-[300px]  md:mb-[300px] relative flex flex-col items-center'>
    
    <Image src={image} alt="image"  
      className={`relative z-10 w-[95%] md:w-[400px] h-[220px] hover:scale-105 transition-transform duration-300`} 
      width={300} height={300}  ></Image>   
    
    <div 
      className=' absolute border w-[100%]  md:w-[110%]  flex flex-col justify-end  min-h-[450px] md:min-h-[460px] md:p-2 top-[85px] md:top-[80px]'
      style={{boxShadow: 'rgba(0, 0, 0, 0.1) 0px 1px 3px 0px, rgba(0, 0, 0, 0.06) 0px 1px 2px 0px'}}
    >
      <div className=' px-4 md:px-1 justify-between  md:pt-0 flex flex-col h-[300px] gap-4'>

        <h2 className='font-bold break-words '>{title}</h2>

        <p className=' line-clamp-6 text-sm text-justify'>{text}</p>

        <div className='flex'>
            <p className='text-sm font-semibold'>Duration : {duration}  |   Affiliated with AKTU</p>
        </div>
  
        <div className='bottom-box mt-2 mb-5 flex justify-between  items-center'>
          
          <div className='stars flex gap-1  '>
            {Array.from({length:5},(_,index)=>{
              return  <Star
              key={index}
              className="w-6 h-6"
              style={{ fill: '#FFE227', stroke: '#FFE227' }} // Fill and stroke for full yellow
            />
            })}
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
