import dbConnect from "@/lib/dbConnect";
import { CourseInfoModel } from "@/models/courseInfo";

export async function GET(request: Request) {
    try{
        await dbConnect();
        const{searchParams}=new URL(request.url)

        let page=searchParams.get('page');
        let limit=searchParams.get('limit');

        let pageNumber=page?parseInt(page): 1; // default to 1
        let limitNumber=limit?parseInt(limit):3; // default limit is 3 

        const startIndex=(pageNumber-1)*limitNumber;
        const endIndex=pageNumber* (limitNumber);
        
        const totalCourses=await CourseInfoModel.countDocuments();

        let paginatedData= await CourseInfoModel.find().skip(startIndex).limit(limitNumber).populate('university');

        if(paginatedData.length>0){
            return Response.json({
                success:true,
                totalCourses,
                totalPages:Math.ceil(totalCourses/limitNumber),
                currentPage:pageNumber,
                paginatedCourses:paginatedData
            })
        }
        

    }catch(error){
        console.log(error);
        return Response.json({
            success:false,
            message:"error occured"
        })
    }
}
