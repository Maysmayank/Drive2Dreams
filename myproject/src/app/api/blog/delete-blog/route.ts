import dbConnect from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";

export async function DELETE(request: Request) {
    try {
        await dbConnect();
        const {searchParams}=new URL(request.url);
        const queryParam={
            title:searchParams.get('title'),
            role:searchParams.get('role')
        }
        
        const deleteTitle=queryParam.title
        const role=queryParam.role

        if(role==='admin' ){
            const blogExists=await BlogModel.findOne({title:deleteTitle});
            console.log(blogExists);
            
            if(!blogExists){
                return Response.json({
                    success: false,
                    message: "The Blog is already deleted"
                }, {
                    status: 201,
                })
            }

            const isDeleted= await BlogModel.deleteOne({title:deleteTitle})

            if(isDeleted){
                return Response.json({
                    success: true,
                    message: "The Blog has been Deleted"
                }, {
                    status: 200,
                })
            }else{
                return Response.json({
                    success: false,
                    message: "Error Occured while Deleting the Blog. Try Again"
                }, {
                    status: 201,
                })
            }
        }else{
            return Response.json({
                success: false,
                message: "Not authorized"
            }, {
                status: 401,
            })
        }
        
        
        
    }

    catch(error){
        
        // console.error("Error Deleting Blog data:", error);

        return Response.json({
            success: false,
            message: "Error while Deleting from database"
        }, {
            status: 500,
        })
    }
}