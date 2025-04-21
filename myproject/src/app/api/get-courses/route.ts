import dbConnect from "@/lib/dbConnect";
import { CourseInfoModel } from "@/models/courseInfo";

export const dynamic = "force-dynamic";

export async function GET(request: Request): Promise<Response> {
    try {
        await dbConnect();
        const url = new URL(request.url);
        const category = url.searchParams.get("category");

        const courses = await CourseInfoModel.find({ category }).populate(
            "university"
        );

        if (courses.length > 0) {
            return new Response(
                JSON.stringify({
                    success: true,
                    courses: courses,
                }),
                { status: 200, headers: { "Content-Type": "application/json" } }
            );
        }
    else {
        return new Response(
            JSON.stringify({
                success: false,
                message: "No more courses found!",
            }),
            { status: 200, headers: { "Content-Type": "application/json" } }
        );
    }
} catch (error) {
    console.error(error);
    return new Response(
        JSON.stringify({
            success: false,
            message: "An error occurred",
        }),
        { status: 500, headers: { "Content-Type": "application/json" } }
    );
}
}
