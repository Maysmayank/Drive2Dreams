import dbConnect from "@/lib/dbConnect";
import { CourseInfoModel } from "@/models/courseInfo";

type CourseData = {
    courseOverview:string;
    university: string; // Name of the university or college
    title: string; // Title of the course
    courseInfo: string; // Detailed information about the course
    courseContent?: string[]; // Optional array of strings for course content like syllabus
    duration?: string; // Duration of the course
    eligibilityCriteria:string[];
    syllabus?: string; // Optional field for storing file path or URL to PDF
}

export async function PATCH(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const queryParam = {
            id: searchParams.get('id')
        }
        const updateId = queryParam.id
        
        const { university, title, courseOverview,courseInfo, courseContent, duration, syllabus,eligibilityCriteria } = await request.json()
        
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
                    courseOverview,
                    eligibilityCriteria //aaray of strings
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
        
        const data=await CourseInfoModel.findOne({_id:id}).populate("university","universityName");
        let {universityName}=data.university;

        let payload={
            universityName,...data._doc    // geeting universityName from university object and pushing rest data to the payload 
        }        
        let pay=delete payload.university   /// removing the university object {} containg all univerdsty info
        console.log("payload" ,payload);
        
        let newData=JSON.stringify(payload)
        
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