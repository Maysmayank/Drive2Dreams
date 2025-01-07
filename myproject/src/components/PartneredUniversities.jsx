import dbConnect from '@/lib/dbConnect';
import { UniversityInfoModel } from '@/models/UniversityModel';
import React from 'react'
import UniversityCard from '@/components/UniversityCard'
import Image from 'next/image';

/**no in use  */

async function fetchUniversityData() {
  try {
    await dbConnect();    
    const data = await UniversityInfoModel.find({});
    return data

  } catch (error) {
    console.log(error);
    return []
  }

}

async function PartneredUniversities() {
  let data = await fetchUniversityData();
  
  return (
    <div className='flex flex-col items-center justify-center  p-6 gap-10 md:gap-16'>
      <h1 className='font-bold  text-center text-3xl md:text-5xl md:homepage-title2'>Partenered Universities</h1>
      
      { 
        data.length === 0 ? (
          <p className='text-center gap-5  items-center flex flex-col text-lg col-span-full'>
              <Image src="/giphy.webp" className='' width={300} height={200} alt='no courses available image' ></Image>
              <span className=''>Universities will Be added Soon...</span>
            </p>
        ) :
          (
            <div className=' flex  md:w-[80%] items-center justify-center '>
              <div className='grid items-center gap-2 md:gap-10 justify-center w-full grid-cols-2 lg:grid-cols-4 '>
                {data.map((uni,index) => (
                <UniversityCard key={index} universityName={uni.universityName} imageUrl={uni.cloudinaryImageUrl} />
                ))}
              </div>
            </div>
          )
      }
   
      
    </div>
  )
}

export default PartneredUniversities
