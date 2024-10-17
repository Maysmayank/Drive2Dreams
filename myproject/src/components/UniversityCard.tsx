'use client'
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';

function UniversityCard({ imageUrl, universityName }: any) {
  let router = useRouter();
  let [hover, sethover] = useState(false);
  return (
    <div className='flex flex-col gap-2  items-center rounded-sm w-full'>
      <div className='relative' onMouseLeave={() => sethover(false)} onMouseEnter={() => sethover(true)} >
        <Image src={imageUrl} width={400} height={400} className=' rounded-sm md:w-[400px] object-fill h-[120px] w-[150px] md:h-[150px] ' alt='' />
        {
          hover && (
            <div className="">
              {/* Overlay */}
              <div className=" duration-500  duration-800 ease-in absolute inset-0 flex items-center justify-center  bg-black opacity-40 z-10"></div>

              {/* Centered Button on top of the overlay */}
              <div className='absolute m-auto inset-0 items-center  justify-center flex'>
                <Button
                  className=" z-20"
                  onClick={() => router.push(`/university/${encodeURIComponent(universityName)}`)}
                >
                  Know More
                </Button>
              </div>
            </div>
          )
        }


      </div>

    </div>

  );
}

export default UniversityCard;
