'use client'
import Image from 'next/image';
import React, { useEffect } from 'react';
import { Button } from './ui/button';
import { useRouter } from 'next/navigation';
import { cloudinary } from '@/utils/cloudinary';
import image from '../../public/pixelcut-export.png'
import { UniversityInfoModel } from '@/models/UniversityModel';
import dbConnect from '@/lib/dbConnect';
import { date } from 'zod';



function UniversityCard({imageUrl,universityName}:any) {  
  let router=useRouter();

  return (
    <div className=' flex flex-col gap-2 items-center rounded-md'>
      <Image src={imageUrl} width={400} height={400}  className='rounded-t-md w-auto' alt=''/>
      <Button onClick={()=>router.push(`/university/${encodeURIComponent(universityName)}`)}>Know More</Button>
    </div>
    
  );
}

export default UniversityCard;
