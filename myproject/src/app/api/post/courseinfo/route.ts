import dbConnect from "@/lib/dbConnect";
import {CourseInfoModel} from "@/models/courseInfo";
import { NextResponse } from "next/server";

interface CourseInfo{
    university: string; // Name of the university or college
    title: string; // Title of the course
    courseInfo: string; // Detailed information about the course
    courseOverview:string,
    courseContent?: string[]; // Optional array of strings for course content like syllabus
    duration?: string; // Duration of the course
    syllabus?: string; // Optional field for storing file path or URL to PDF
}

export async function POST(request: Request,response:NextResponse) {
    await dbConnect();
    try {
        const{university,title,duration,courseInfo,courseContent,syllabus,courseOverview}=await request.json();
        
        const newCourse=new CourseInfoModel({
            university,
            title,
            duration,
            courseOverview,
            courseContent,
            courseInfo,
            syllabus
        })
        await newCourse.save();
        return Response.json({
            success: true,
            message: "New Course successfully added",
        }, {
            status: 201,
        })

    } catch (error) {
        // console.log(error);
        
        return Response.json({
            success: false,
            message: "Error while saving the Course details"
        }, {
            status: 500,
        })
    }
}