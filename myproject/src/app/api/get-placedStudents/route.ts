import dbConnect from "@/lib/dbConnect";
import { PlacedStudentModel } from "@/models/PlacedStudents";
import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
    await dbConnect();

    try {
        const searchParams = request.nextUrl.searchParams;
        const universityName = searchParams.get('universityName');
        const studentId = searchParams.get('id');
        console.log(studentId);
        
        // Create a query object that will be built based on the parameters
        let query: any = {};

        // Check which parameters are provided and build the query accordingly
        if (universityName) {
            query.universityName = universityName;
        }

        if (studentId) {
            query._id = studentId; // Assuming `_id` is the studentId in the database
        }

        // Fetch data based on the query object
        const placedStudents = await PlacedStudentModel.find(query);

        if (placedStudents.length > 0) {
            return Response.json({
                success: true,
                message: "PlacedStudent Data Found",
                placedStudentsData: placedStudents
            }, {
                status: 201,
            });
        } else {
            return Response.json({
                success: false,
                message: "No data found for the provided parameters"
            }, {
                status: 400,
            });
        }
    } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : null;

        return Response.json({
            success: false,
            message: "Error occurred fetching the data. Internal Server Error",
            showError: errorMessage
        }, {
            status: 500,
        });
    }
}
