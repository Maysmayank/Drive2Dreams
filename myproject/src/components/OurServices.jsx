import React from 'react'

export default function OurServices() {
  return (
    <div>
      <div className='mt-10 flex items-center flex-col gap-20 pb-10 justify-center '>
        <h1 className='font-bold text-4xl'  > Our Services</h1>
        <div className='flex justify-around gap-3 bg-yellow-50 w-[80%]'>
        
            <div className='serviceCard gap-2 flex flex-col h-[290px] rounded-xl p-3 bg-pink-400 text-center max-w-[290px]'>
                <h2 className='mb-5'>BBA Course Guidance</h2>
                <span>
                Explore our BBA course, designed to provide you with a comprehensive understanding of business management, finance, and marketing. We help you navigate the application process, ensuring you find the best program to suit your career goals and aspirations.
                </span>
            </div>

            <div className='serviceCard gap-2 flex flex-col h-[290px] rounded-xl p-3 bg-pink-400 text-center max-w-[290px]'>
                <h2 className='mb-5'>BBA Course Guidance</h2>
                <span>
                Explore our BBA course, designed to provide you with a comprehensive understanding of business management, finance, and marketing. We help you navigate the application process, ensuring you find the best program to suit your career goals and aspirations.
                </span>
            </div>

            <div className='serviceCard gap-2 flex flex-col h-[290px] rounded-xl p-3 bg-pink-400 text-center max-w-[290px]'>
                <h2 className='mb-5'>BBA Course Guidance</h2>
                <span>
                Explore our BBA course, designed to provide you with a comprehensive understanding of business management, finance, and marketing. We help you navigate the application process, ensuring you find the best program to suit your career goals and aspirations.
                </span>
            </div>
            
        </div>
      </div>
    </div>
  )
}

