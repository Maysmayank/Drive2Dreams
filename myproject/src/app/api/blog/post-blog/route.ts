import dbConnect from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";
import { UserModel } from "@/models/user";

export async function POST(request: Request) {
    dbConnect();
    try {
        const {title,metadata,blogImage,description,content,userEmail,role,thumbnail}=await request.json();
        
        const userExists=await UserModel.findOne({email:userEmail});
        
        if(!userExists){
            return Response.json({
                success: false,
                message: `You're not logged or signed In`,
            },{
                status:401
            })
        }


        if(role==='admin'&& userExists){

            const newBlog=new BlogModel({
                author:userExists._id,
                title,
                thumbnail,
                metadata,
                blogImage,
                description,
                content,

            })

            await newBlog.save();
            console.log(newBlog);
            
            return Response.json({
                success: true,
                message: `New Blog has been Added!`,
            },{
                status:201
            })

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
