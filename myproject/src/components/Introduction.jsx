'use client';
import React, { useState } from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation'
import Image from 'next/image';
import Link from 'next/link';
import { EbookDownload } from './DynamicCourseCardinfo';

export default function Introduction() {
  const router = useRouter();
  const Ebook = "https://res.cloudinary.com/diht8xvzr/raw/upload/fl_attachment/v1743941866/kod00f77ax8er3sj5krb.pdf";
  const [showEbook, setShowEbook] = useState(false);

  return (
    <>
      <div>
        <div className="relative w-full -translate-y-16 z-0 md:-translate-y-8 m-auto mt-[70px] h-[300px] md:h-[500px] md:w-[99%] md:mt-10">
          <Image
            className="object-contain md:object-cover w-full h-full"
            src="/Graduation.jpeg"
            alt="Graduation"
            fill
          />

          <div className='absolute flex items-center inset-0 text-white'>
            <div className=' md:-translate-y-2 translate-x-6 flex flex-col'>
              <h2 className='font-black text-2xl md:text-[40px]'>Discover Your</h2>
              <h1 className='font-black text-4xl md:text-7xl'>Dream Campus</h1>
             
            </div>
          </div>
        </div>
      </div>

                <EbookDownload Ebook={Ebook} />
    </>
  )
}
