'use client';
import DynamicCourseCardinfo from '@/components/DynamicCourseCardinfo';
import DynamicUniversityCardinfo from '@/components/DynamicUniversityCardinfo';
import dbConnect from '@/lib/dbConnect';
import { UniversityInfoModel } from '@/models/UniversityModel';
import React from 'react'

type UniversityInfo =
    {
        universityName: string;
        aboutUniversity: string;
        admissionProcess: string;
        cutoffs: string
    }
async function fetch_University_Data_ByName(universityName :string):Promise<UniversityInfo[]>{
    try {
        await dbConnect();
        const data=UniversityInfoModel.find({universityName:universityName})
        return data
    } catch (error) {
        console.error('Error fetching University data:', error);
        return [];
    }
}
async function page({params}:{params:{universityName:string}}) {
    const {universityName}=params;
    const decodeduniversityName=decodeURIComponent(universityName);
    const universityData:UniversityInfo[]= await fetch_University_Data_ByName(decodeduniversityName) 
    console.log(universityData);
    
    return (
        <div className="pt-[85px]">
      {universityData.length === 0 ? (
        "No University Info here at Home"
      ) : (
        universityData.map((university:any, index:any) => (
          
          <DynamicUniversityCardinfo
            key={index}
            universityImage={university.cloudinaryImageUrl}
            universityName={university.universityName}
            aboutUniversity={university.aboutUniversity}
            cutoffs={university.cutoffs}
          />
        ))
      )}
    </div>
    )
}

export default page
