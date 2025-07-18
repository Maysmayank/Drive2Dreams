import dbConnect from "@/lib/dbConnect";
import {CourseInfoModel} from "@/models/courseInfo";
import { UniversityInfoModel } from "@/models/UniversityModel";
import { NextResponse } from "next/server";

interface CourseInfo{
    university: string; // Name of the university or college
    universityName:string;
    title: string; // Title of the course
    courseInfo: string; // Detailed information about the course
    courseContent?: string[]; // Optional array of strings for course content like syllabus
    duration?: string; // Duration of the course
    syllabus?: string; // Optional field for storing file path or URL to PDF
}

export async function POST(request: Request,response:NextResponse) {
    await dbConnect();
    try {
        let{universityName,category,Ebook,brochureUrl,title,duration,courseInfo,admissionProcess,eligibilityCriteria,videoUrl,specializationOffered,courseRating,affilitatedWith,feature}=await request.json();
        
        // console.log(category);
        Ebook=Ebook?.trim().replace(
            "/raw/upload/",
            "/raw/upload/fl_attachment/"
        );
        console.log(Ebook);

        const isCourseExisted=await CourseInfoModel.find({title:title}) 
        
        let isUniversityExists= await UniversityInfoModel.findOne({universityName:universityName}) // cehck if university exists for the course to add
        
        if(!isUniversityExists){
            return Response.json({
                success: false,
                message: "University Not Found. Please Register University First then try again ",
            }, {
                status: 201,
            })
        }
        if(isCourseExisted.length>0){
            
            return Response.json({
                success: false,
                message: "The Course with this Title already Exists ",
            }, {
                status: 201,
            })
        }else{
            const newCourse=new CourseInfoModel({
                university:isUniversityExists._id,
                universityName:universityName,
                videoUrl:videoUrl,
                specializationOffered:specializationOffered,
                courseRating:courseRating,
                Ebook:Ebook,
                affilitatedWith,
                title,
                duration,
                admissionProcess,
                courseInfo,
                category:category,
                Brochure:brochureUrl,
                eligibilityCriteria, // array of string
                features:feature
            
            })
            let d=await newCourse.save();            
            console.log(d);
            
            return Response.json({
                success: true,
                message: "New Course successfully added",
            }, {
                status: 201,
            })
        }
       

    } catch (error) {
        console.log(error);
        
        return Response.json({
            success: false,
            message: "Error while saving the Course details"
        }, {
            status: 500,
        })
    }
}