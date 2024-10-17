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
  
export async function DELETE(request: Request) {
    try {
        await dbConnect();
        const {searchParams}=new URL(request.url);
        // console.log(searchParams);
        const queryParam={
            id:searchParams.get('id')
        }
        const deleteId=queryParam.id
        const isDeleted= await CourseInfoModel.deleteOne({_id:deleteId})
        if(isDeleted){
            return Response.json({
                success: true,
                message: "The course has been Deleted"
            }, {
                status: 200,
            })
        }else{
            return Response.json({
                success: false,
                message: "Error Occured while Deleting the Course Try Again"
            }, {
                status: 201,
            })
        }
        
    }
    catch(error){
        
        console.error("Error Deleting course data:", error);

        return Response.json({
            success: false,
            message: "Error while Deleting from database"
        }, {
            status: 500,
        })
    }
}