import dbConnect from "@/lib/dbConnect";
import BlogModel from "@/models/Blog";

export async function GET(request: Request) {
  try {
    await dbConnect();

    const { searchParams } = new URL(request.url);

    const queryParam = {
      searchName: searchParams.get("title") || "",
    };
    const fetchTitle=queryParam.searchName
    
    const blog = await BlogModel.findOne({ title: fetchTitle });

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
