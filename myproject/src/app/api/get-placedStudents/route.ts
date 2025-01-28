import dbConnect from "@/lib/dbConnect";
import { PlacedStudentModel } from "@/models/PlacedStudents";
import { NextRequest } from "next/server";
export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        const searchParams=request.nextUrl.searchParams
        const universityName=searchParams.get('universityName') 
        const placedStudents = await PlacedStudentModel.find({ universityName: universityName });

        if (placedStudents.length > 0) {

            return Response.json({
                success: true,
                message: "PlacedStudent Data Found",
                placedStudentsData: placedStudents
            }, {
                status: 201,
            })

        } else {
            return Response.json({
                success: false,
                message: "UnviersityData Not Found"
            }, {
                status: 400,
            })
        }
    } catch (error) {
        
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : null;

        return Response.json({
            success: false,
            message: "Error Occured fetching course details Internal Server Error",
            showError: errorMessage
        }, {
            status: 500,
        })
    }
}