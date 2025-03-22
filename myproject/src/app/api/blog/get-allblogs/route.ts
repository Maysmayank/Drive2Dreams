import dbConnect from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";

export async function GET(request: Request) {
    try {
        await dbConnect();

        const allBlogs = await BlogModel.find().populate('author');

        return Response.json({
            success: true,
            data: allBlogs
        }, { status: 200 });

    } catch (error) {
        console.error("Error fetching blogs:", error);
        return Response.json({
            success: false,
            message: "Something went wrong while fetching blogs."
        }, { status: 500 });
    }
}