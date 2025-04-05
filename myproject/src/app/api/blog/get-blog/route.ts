import dbConnect from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";
import { NextRequest } from "next/server";

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    await dbConnect();

    const searchParams = request.nextUrl.searchParams;
    
    const title = searchParams.get("title") || "";
    
    const blog = await BlogModel.findOne({ title });

    if (!blog) {
      return Response.json(
        { success: false, message: "Blog not found." },
        { status: 404 }
      );
    }

    return Response.json(
      { success: true, data: blog },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return Response.json(
      {
        success: false,
        message: "Something went wrong while fetching a blog with this title.",
      },
      { status: 500 }
    );
  }
}
