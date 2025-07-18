import dbConnect from "@/lib/dbConnect";
import { UniversityInfoModel } from "@/models/UniversityModel";
import { log } from "console";
export async function POST(request: Request) {

    try {
        await dbConnect();
        let { universityName } = await request.json();
        let decodedUniversityName=decodeURIComponent(universityName)        
        const universityData = await UniversityInfoModel.find({ universityName: decodedUniversityName });

        if (universityData.length > 0) {

            return Response.json({
                success: true,
                message: "University Data Found",
                universityData: universityData
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