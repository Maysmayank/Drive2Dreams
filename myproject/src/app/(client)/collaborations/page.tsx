import React from 'react'
import dbConnect from '@/lib/dbConnect';
import { UniversityInfoModel } from '@/models/UniversityModel';
import CollaboratedUniversity from '@/components/CollaboratedUniversity'
type UniversityInfo =
    {
        universityName: string;
        aboutUniversity: string;
        admissionProcess: string;
        cutoffs: string;
        cloudinaryImageUrl?:string;
    cloudinaryImageName?:string;
    }

async function fetchedAllUniversityData():Promise<UniversityInfo[]>{
    try {
        await dbConnect();        
        const data=UniversityInfoModel.find({})   // fetch all data
        return data
    } catch (error) {
        console.error('Error fetching University data:', error);
        return [];
    }
}


 const  Collaborations = async() => {

  const allUniversitydata:UniversityInfo[] =await fetchedAllUniversityData();
    
  return (
    <div className='pt-[80px]'>
      <div className=' main-container min-h-[100vh] my-5 mb-16 md:w-full flex flex-col items-center justify-center gap-4'>
        <h1 className='my-7   md:text-5xl font-bold bg-[#e1944c] px-10 py-2'>Our University Collaborators</h1>
        <hr className='  w-full'/>
        <div className='w-[80%] flex-col flex gap-20 mt-10'>
        {
            allUniversitydata.length===0?(""):
            (
                allUniversitydata.map((university,i)=>(
                    <CollaboratedUniversity
                    key={i}
                    image={university.cloudinaryImageUrl}
                    universityName={university.universityName}
                    aboutUniversity={university.aboutUniversity}
                    />
                ))
            )
        }
        </div>
        
      </div>
    </div>
  )
}

export default Collaborations