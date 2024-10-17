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
    <div className='flex flex-col items-center justify-center p-6 pt-0  gap-10'>
      <h1 className='font-bold  text-center text-3xl md:text-5xl md:homepage-title2'>Partenered Universities</h1>
      
      {
        data.length === 0 ? ("not available") :
          (
            <div className='flex md:w-[80%] items-center justify-center '>
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
