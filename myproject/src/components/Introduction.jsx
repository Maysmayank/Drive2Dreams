'use client';
import React, { useState } from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';


export default function Introduction() {

  const router = useRouter();
  

  return (
    <>
      <div >
        <div className="relative  w-full -translate-y-16 z-0 md:-translate-y-8  m-auto  mt-[70px] h-[300px]  md:h-[500px] md:w-[99%]  md:mt-10">
          <Image
            className="object-contain md:object-cover w-full h-full" // Ensures the image fills and maintains aspect ratio
            src="/Graduation.jpeg"
            alt="Graduation"
            fill
          />

          <div className='absolute flex items-center  inset-0 text-white'>
            <div className=' translate-y-5 md:-translate-y-2 translate-x-6 flex flex-col'>
              <h2 className='font-black text-2xl md:text-[40px]'>Discover Your</h2>
              <h1 className='font-black text-4xl md:text-7xl'>Dream Campus</h1>

              <Link href={'/contact'}>
                <Button className='bg-[#3B80E8] text-[12px] md:text-xl hover:bg-[#3e7cd9] hover:scale-105 transition-all mt-4 md:mt-10 md:w-[30%] ml-2'>Get Started</Button>

              </Link>
            </div>



          </div>



        </div>
      </div>
     

    </>

  )
}
