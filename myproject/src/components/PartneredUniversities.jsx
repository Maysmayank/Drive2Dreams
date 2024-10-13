import dbConnect from '@/lib/dbConnect';
import { UniversityInfoModel } from '@/models/UniversityModel';
import React from 'react'
import UniversityCard from '@/components/UniversityCard'



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
    <div className='flex flex-col items-center justify-center bg-pink-200 p-10  gap-10'>
      <h1 className='font-bold text-4xl'>Partenered universities</h1>
      
      {
        data.length === 0 ? ("not available") :
          (
            <div className='flex w-[90%] items-center justify-center '>
              <div className='grid items-center   justify-center w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4'>
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
