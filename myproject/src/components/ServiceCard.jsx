import React from 'react'

function ServiceCard({text}) {
  return (
    <div className='flex max-w-[450px] gap-2 flex-col  rounded-xl p-3 bg-pink-400 text-center md:max-w-[290px]'>
            <h2 className='mb-5'>BBA Course Guidance</h2>
            <span>
            Explore our BBA course, designed to provide you with a comprehensive understanding of business management, finance, and marketing. We help you navigate the application process, ensuring you find the best program to suit your career goals and aspirations.
            </span>
    
    </div>
  )
}

export default ServiceCard
