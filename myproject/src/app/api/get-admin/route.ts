import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user";

export async function GET(request: Request) {
    
    try {
        await dbConnect();
        const{searchParams}=new URL(request.url)
        
        const queryParam={
            searchName:searchParams.get("searchName")|| ''
        }
        
        

        const user=await UserModel.find({
            $or:[
                {username:{"$regex":queryParam.searchName,"$options":"i"}},
                {email:{"$regex":queryParam.searchName,"$options":"i"}},
            ]
        }).select('-password -_id -__v');
        
        
        if(user.length>0){
            return Response.json({
                success: true,
                message: "User Found",
                user:user
            })    

        }else{
            return Response.json({
                success: false,
                message: "User Not Found"
            }, {
                status: 201,
            })
        }

    } catch (error) {
        return Response.json({
            success: false,
            message: "Error while Fetching all the user"
        }, {
            status: 500,
        })
    }
}
