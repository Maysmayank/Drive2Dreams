import { toast } from "@/components/ui/use-toast";
import dbConnect from "@/lib/dbConnect";
import { PlacedStudentModel } from "@/models/PlacedStudents";
export async function DELETE(req:Request){

    try{
        dbConnect();
        const {searchParams}=new URL(req.url);
        const queryParam={
            id:searchParams.get('studentId')
        }
        const deleteId=queryParam.id
        
        
        const isDeleted= await PlacedStudentModel.deleteOne({_id:deleteId})

        if(isDeleted){
            return Response.json({
                success: true,
                message: "The Student Details has been Deleted"
            }, {
                status: 200,
            })
        }else{
            return Response.json({
                success: false,
                message: "Error Occured while Deleting the Student Details Try Again"
            }, {
                status: 201,
            })
        }

    } catch(error){
        console.error("Error Deleting Student data:", error);

        return Response.json({
            success: false,
            message: "Error while Deleting from database"
        }, {
            status: 500,
        })
    }   
}