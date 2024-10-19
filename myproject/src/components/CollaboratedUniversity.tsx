import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

function CollaboratedUniversity({  image, universityName, aboutUniversity }: any) {
  return (
    <div className="flex md:min-h-[260px] flex-col gap-5 justify-center items-center md:flex-row">

      <div>
        <Image 
          src={image} 
          height={1000} 
          width={500} 
          className=" object-cover shadow-md" 
          alt={universityName}
        />
      </div>

    
      <div className="w-[95%]  md:w-[80%]  md:px-5 p-0 rounded-lg flex flex-col ">


        <h1 className="text-4xl mb-5 md:text-5xl font-bold text-left text-slate-900">
          {universityName}
        </h1>

        <p className="break-words text-justify md:text-justify nunito-para md:py-6 md:leading-relaxed line-clamp-6 md:line-clamp-2">
          {aboutUniversity} 
        </p>
        <p className='opacity-65'>see more</p>

        <div className='mt-10 md:m-0 flex items-center justify-center'>
        <Link href={`/university/${universityName}`}>
          <button className='bg-[#110C44] text-white inline px-5 p-2'>Get more Info</button>
        </Link>


        </div>
      </div>
    </div>
  )
}

export default CollaboratedUniversity
