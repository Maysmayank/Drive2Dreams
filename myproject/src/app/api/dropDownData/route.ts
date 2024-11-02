import dbConnect from "@/lib/dbConnect";
import { CourseInfoModel } from "@/models/courseInfo";
import { CourseInfoType } from "../../../../ModelTypes/ModelTypes";
import { University } from "lucide-react";
export async function POST(req:Request){
    try {

        await dbConnect();
        const  {value}=await req.json();
        
        const data:CourseInfoType[]=await CourseInfoModel.find({title:{"$regex":value,"$options":"i"}})
        .populate('university','universityName').select(" -_id -eligibilityCriteria");
        
        let fetchedCourseData=data.map((course)=>(
            {
                title:course.title,
                UniversityName:course.university.universityName,
            }
        ))
        
        if(fetchedCourseData.length>0){
            return Response.json({
                success: true,
                data:fetchedCourseData,
                message: "Requested Course Data found"
            }, {
                status: 200,
            })
        }
        else{
            return Response.json({
                success: false,
                message: "Course not found"
            }, {
                status: 400,
            })
        }
        
       

    } catch (error) {
        console.log(error);
        return Response.json({
            success: false,
            message: "Error Occurred in searching in Database"
        }, {
            status: 500,
        })
    }
}