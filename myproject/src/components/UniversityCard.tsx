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
      <div className='' onMouseLeave={() => sethover(false)} onMouseEnter={() => sethover(true)} >
        <Image src={imageUrl} width={400} height={400} className=' rounded-sm md:w-[400px] object-fill h-[120px] w-[150px] md:h-[150px] ' alt='' />
      


      </div>

    </div>

  );
}

export default UniversityCard;
