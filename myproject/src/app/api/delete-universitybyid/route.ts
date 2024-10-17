import { toast } from "@/components/ui/use-toast";
import dbConnect from "@/lib/dbConnect";
import { UniversityInfoModel } from "@/models/UniversityModel";
export async function DELETE(req:Request){

    try{
        dbConnect();
        const {searchParams}=new URL(req.url);
        const queryParam={
            id:searchParams.get('id')
        }
        const deleteId=queryParam.id
        
        
        const isDeleted= await UniversityInfoModel.deleteOne({_id:deleteId})

        if(isDeleted){
            return Response.json({
                success: true,
                message: "The University has been Deleted"
            }, {
                status: 200,
            })
        }else{
            return Response.json({
                success: false,
                message: "Error Occured while Deleting the University Try Again"
            }, {
                status: 201,
            })
        }

    } catch(error){
        console.error("Error Deleting University data:", error);

        return Response.json({
            success: false,
            message: "Error while Deleting from database"
        }, {
            status: 500,
        })
    }   
}