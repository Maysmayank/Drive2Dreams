import React from 'react'
import ServiceCard from '@/components/ServiceCard'
export default function OurServices() {
  return (
    <div>
      <div className='mt-10 flex items-center flex-col gap-20 pb-10 justify-center '>
        <h1 className='font-bold text-4xl'  > Our Services</h1>
        <div className='flex flex-col items-center md: justify-around md:flex-row gap-3 bg-yellow-50 w-[80%]'>
          
            <ServiceCard text={"Explore our BBA course, designed to provide you with a comprehensive understanding of business management, finance, and marketing. We help you navigate the application process, ensuring you find the best program to suit your career goals and aspirations."}> 
            </ServiceCard>
            <ServiceCard text={"Explore our BBA course, designed to provide you with a comprehensive understanding of business management, finance, and marketing. We help you navigate the application process, ensuring you find the best program to suit your career goals and aspirations."}> 
            </ServiceCard>
            <ServiceCard text={"Explore our BBA course, designed to provide you with a comprehensive understanding of business management, finance, and marketing. We help you navigate the application process, ensuring you find the best program to suit your career goals and aspirations."}> 
            </ServiceCard>
        </div>
      </div>
    </div>
  )
}

