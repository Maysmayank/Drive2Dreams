import dbConnect from "@/lib/dbConnect";
import { CourseInfoModel } from "@/models/courseInfo";
type CourseData={
    university: string; // Name of the university or college
    title: string; // Title of the course
    courseInfo: string; // Detailed information about the course
    courseContent?: string[]; // Optional array of strings for course content like syllabus
    duration?: string; // Duration of the course
    syllabus?: string; // Optional field for storing file path or URL to PDF
}
  
export async function GET(request: Request) {
    try {
        await dbConnect();
        const courseData=await CourseInfoModel.find({});
        if(courseData.length>0){
            return Response.json({
                success: true,
                message: "Fetched all the course data successfully",
                courseData:courseData
            }, {
                status: 200,
            })
        }
        else{
            
            return Response.json({
                success: false,
                message: " CourseData Fetching failed"
            }, {
                status: 400,
            })
        }
        
    }
    catch(error){
        console.log("here");
        
        console.error("Error fetching course data:", error);

        return Response.json({
            success: false,
            message: "Error while getting Coursedata from database"
        }, {
            status: 500,
        })
    }
}