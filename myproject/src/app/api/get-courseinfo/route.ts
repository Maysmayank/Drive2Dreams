import dbConnect from "@/lib/dbConnect";
import { CourseInfoModel } from "@/models/courseInfo";

export async function GET(request: Request) {
    
    try {
        await dbConnect();
        const{searchParams}=new URL(request.url)
        
        const queryParam={
            searchName:searchParams.get("title")|| ''
        }
        let title=queryParam.searchName;
        
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
        console.log("error  occured Detected: ",error);
        return Response.json({
            success: false,
            message: "Error Occured fetching course details Internal Server Error"
        }, {
            status: 500,
        })
        

    }
}
        
        