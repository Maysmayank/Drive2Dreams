import dbConnect from "@/lib/dbConnect";
import { CourseInfoModel } from "@/models/courseInfo";
import { UniversityInfoModel } from "@/models/UniversityModel";
export async function POST(request: Request) {
    
    try {
        await dbConnect();
        let {title}=await request.json();
        console.log(title);
        
        
        const courseData=await CourseInfoModel.find({title:title}).populate('university')
        if(courseData.length>0){
            return Response.json({
                success: true,
                message: "Course Data Found",
                courseData:courseData
            }, {
                status: 201,
            })
        }else{
            return Response.json({
                success: false,
                message: "CourseData Not Found"
            }, {
                status: 400,
            })
        }

    }catch(error){  
         const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    const errorStack = error instanceof Error ? error.stack : null;
        return Response.json({
            success: false,
            message: "Error Occured fetching course details Internal Server Error",
            showError:errorMessage
        }, {
            status: 500,
        })
        

    }
}
        
        
