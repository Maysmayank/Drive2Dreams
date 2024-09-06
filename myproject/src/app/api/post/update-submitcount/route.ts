import dbConnect from "@/lib/dbConnect"
import { FormSubmissionCountModel } from "@/models/FormSubmission";

export async function POST(request:Request){
    try {
        await dbConnect();
        const countDoc= await FormSubmissionCountModel.updateOne(
            {},    // query filter 
            {$inc:{count:1}},
            {upsert:true}
        )

        return Response.json({
            success: true,
            message: "Count updated",
        }, {
            status: 201,
        })
    } catch (error) {
        return Response.json({
            success: true,
            message: "Count not updated",
        }, {
            status: 201,
        })
    }
    
}


export async function GET(request:Request){
    try {
        await dbConnect();
        const count= await FormSubmissionCountModel.findOne();
//        console.log(count); { _id: new ObjectId('66d7403537a20427ab9bb97b'), __v: 0, count: 2 }
        
        return Response.json({
            success: true,
            message:count.count,
        }, {
            status: 201,
        })
    } catch (error) {
        return Response.json({
            success: true,
            message:  " error : Count not Fetched!!",
        }, {
            status: 201,
        })
    }
    
}