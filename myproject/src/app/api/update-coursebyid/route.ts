import dbConnect from "@/lib/dbConnect";
import { CourseInfoModel } from "@/models/courseInfo";
import { log } from "console";
type CourseData = {
    courseOverview:string;
    university: string; // Name of the university or college
    title: string; // Title of the course
    courseInfo: string; // Detailed information about the course
    courseContent?: string[]; // Optional array of strings for course content like syllabus
    duration?: string; // Duration of the course
    syllabus?: string; // Optional field for storing file path or URL to PDF
}

export async function PATCH(request: Request) {
    try {
        console.log("in route ")
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const queryParam = {
            id: searchParams.get('id')
        }
        const updateId = queryParam.id
        
        const { university, title, courseOverview,courseInfo, courseContent, duration, syllabus } = await request.json()
        
        const isUpdated = await CourseInfoModel.updateOne(
            { _id: updateId },
            {
                $set: {
                    university,
                    title,
                    courseInfo,
                    courseContent,
                    duration,
                    syllabus,
                    courseOverview
                }
            }
        )
        
        if (isUpdated) {
            return Response.json({
                success: true,
                message: "The course has been Updated"
            }, {
                status: 200,
            })
        } else {
            return Response.json({
                success: false,
                message: "Review your Entered Fields or Try Again"
            }, {
                status: 201,
            })
        }

    }
    catch (error) {

        console.error("Error Updating course data:", error);

        return Response.json({
            success: false,
            message: "Error while Updating from database"
        }, {
            status: 500,
        })
    }
}


export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const queryParam = {
            id: searchParams.get('id')
        }
        const id = queryParam.id
        
        const data=await CourseInfoModel.findOne({_id:id});
        let newData=JSON.stringify(data)
        
        if(data){
            return Response.json({
                success: true,
                message: newData,

            }, {
                status:200 ,
            })
        }else{
            return Response.json({
                success: false,
                message: "Error while fetching the Course Data"
            }, {
                status:200,
            })
        }

    }
    catch (error) {
        return Response.json({
            success: false,
            message: "Error while Getting the CourseData from database"
        }, {
            status: 500,
        })
    }
}