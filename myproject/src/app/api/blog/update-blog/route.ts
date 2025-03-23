import dbConnect from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";
import { UserModel } from "@/models/user";

export async function PATCH(request: Request) {
    try {
        dbConnect();
        const { searchParams } = new URL(request.url);
        const queryParam = {
            title: searchParams.get('blogTitle')
        }
        const updateTitle = queryParam.title;

        const data=await request.json();
        const {title,description,content,userEmail,role,thumbnail}=data;
        
        
        const userExists=await UserModel.findOne({email:userEmail,role:role});
        

        if(!userExists){
            return Response.json({
                success: false,
                message: `You're not logged or signed In`,
            },{
                status:401
            })
        }
        if(role==='admin'&& userExists){

            const blogExists=await BlogModel.findOne({title:updateTitle});
            if(!blogExists){
                return Response.json({
                    success: false,
                    message: "Can't Update, The Blog You're trying to update is deleted "
                }, {
                    status: 400,
                })
            }

            const isUpdated=await BlogModel.updateOne(
                { title: updateTitle },
                {
                    $set:{  
                        title,
                        description,
                        content,
                        thumbnail
                    }
                }
            )

            
            if (isUpdated.acknowledged) {
                return Response.json({
                    success: true,
                    message: "The Blog has been Updated"
                }, {
                    status: 200,
                })
            } else {
                return Response.json({
                    success: false,
                    message: "Try Again, Blog not Upddated"
                }, {
                    status: 201,
                })
            }
          
        }else{
            return Response.json({
                success: false,
                message: `You're Not Authorized`,

            },{status:401}) 
        }
    } catch (error) {
        console.log(error);
        return Response.json({
            success: false,
            message: `Something Wrong happened`,

        },{status:401}) 

    }
}