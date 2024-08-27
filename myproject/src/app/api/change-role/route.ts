import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user";

export async function PATCH(request: Request) {
    
    try {
        await dbConnect();
        const{searchParams}=new URL(request.url)
        
        const queryParam={
            role:searchParams.get("role")|| '',
            email:searchParams.get("email")|| '',
        }
        

        const user =await UserModel.findOneAndUpdate(
            {email:queryParam.email},
            
            {$set:{
                    role:queryParam.role
                }},

            {new:true}
        )
        

        if(user){
            return Response.json({
                success: true,
                message: `Role has been changed to ${queryParam.role}`,
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
            message: "Error while changing the role"
        }, {
            status: 500,
        })
    }
}
