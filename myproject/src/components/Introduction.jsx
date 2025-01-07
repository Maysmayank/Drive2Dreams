'use client';
import React, { useState } from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation'
import FormComponent from './Form';
import Image from 'next/image';
import Link from 'next/link';
export default function Introduction() {
  const [showContact, setShowContact] = useState(true);

  const router = useRouter();
  function HandleClick() {
    setShowContact(false)
  }


  return (
    <>
      <div >
        <div className="relative  w-full -translate-y-14 z-0 md:w-[92%] md:translate-y-0  m-auto h-[400px] md:h-[500px] md:mt-10">
          <Image
            className="object-contain md:object-cover w-full h-full" // Ensures the image fills and maintains aspect ratio
            src="/Graduation.jpg"
            alt="Graduation"
            layout='fill'
          />

          <div className='absolute flex items-center  inset-0 text-white'>
            <div className=' translate-y-5 md:-translate-y-2 translate-x-6 flex flex-col'>
            <h2 className='font-black text-2xl md:text-[40px]'>Discover Your</h2>
            <h1 className='font-black text-4xl md:text-7xl'>Dream Campus</h1>

            <Link href={'/contact'}>
            <Button className='bg-[#3B80E8] text-[12px] md:text-xl hover:bg-[#3e7cd9] hover:scale-105 transition-all mt-4 md:mt-10 md:w-[30%] ml-2' onClick={HandleClick}>Get Started</Button>

            </Link>
            </div>
          

            
          </div>
        
         

        </div>
      </div>
      {
        showContact && (
          <div className='absolute bg-black flex items-center justify-center animate-jump-in animate-delay-1000  opacity-96 z-10 p-2 top-[10%] w-full md:top-[16%] md:p-0  '>

            <div className='absolute  pt-10 bg-white  flex flex-col items-center top-[15%] md:w-[40%] md:top-[50%]'>

              <Button className='absolute top-7 right-4' onClick={HandleClick}>X</Button>

              <div className="flex px-2 flex-col items-center">
                <h1>Connect With Us</h1>
                <span>Fill in Your Details to Receive Expert Advice</span>
              </div>

              <div className='w-full flex justify-center'>
                <FormComponent />
              </div>

            </div>


          </div>
        )
      }

    </>

  )
}
