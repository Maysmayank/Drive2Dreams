import dbConnect from '@/lib/dbConnect';
import { UniversityInfoModel } from '@/models/UniversityModel';
import React from 'react'
type UniversityInfo =
    {
        universityName: string;
        aboutUniversity: string;
        admissionProcess: string;
        cutoffs: string,
        cloudinaryImageUrl?:string;
        cloudinaryImageName?:string;
    }
export default async function fetch_University_Data_ByName(universityName :string):Promise<UniversityInfo[]>{
    try {
        await dbConnect();
        const data=await UniversityInfoModel.find({universityName:universityName})
        console.log(data);
        
        return data

    } catch (error) {
        console.error('Error fetching University data:', error);
        return [];
    }
}