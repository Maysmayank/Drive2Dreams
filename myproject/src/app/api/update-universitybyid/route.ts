import dbConnect from "@/lib/dbConnect";
import { UniversityInfoModel } from "@/models/UniversityModel";
import { cloudinary } from "@/utils/cloudinary";

type universityInfo = {
    universityName: string;
    aboutUniversity: string;
    admissionProcess: string;
    cutoffs: string,
    image: File
}
interface UniversityUpdateData {
    universityName?: string | undefined;
    aboutUniversity?: string | undefined;
    admissionProcess?: string | undefined;
    cutoffs?: string | undefined;
    cloudinaryImageName?: string;
    cloudinaryImageUrl?: string
}
export async function PATCH(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const queryParam = {
            id: searchParams.get('id')
        }
        const updateId = queryParam.id


        const formData = await request.formData();

        // Extract fields from formData
        const universityName = formData.get('universityName') as string | undefined;
        const aboutUniversity = formData.get('aboutUniversity') as string | undefined;
        const admissionProcess = formData.get('admissionProcess') as string | undefined;
        const cutoffs = formData.get('cutoffs') as string | undefined;
        const image = formData.get('image') as File | undefined; // This will be the File object
        
        let updateFields: UniversityUpdateData = {};

        // Check for undefined fields and assign them
        if (universityName !== undefined) updateFields.universityName = universityName;
        if (aboutUniversity !== undefined) updateFields.aboutUniversity = aboutUniversity;
        if (admissionProcess !== undefined) updateFields.admissionProcess = admissionProcess;
        if (cutoffs !== undefined) updateFields.cutoffs = cutoffs;
        if (image && image  instanceof  File) {
            const arrayBuffer = await image.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);
            let res: any = await new Promise((resolve, reject) => {
                cloudinary.uploader
                    .upload_stream({ folder: "ImageBucket", public_id: image.name }, function (error, result) {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(result as any);
                    })
                    .end(buffer);
            });


            let cloudImageUrl = res.secure_url;
            let cloudImageName = res.display_name;

            updateFields.cloudinaryImageUrl = cloudImageUrl;
            updateFields.cloudinaryImageName = cloudImageName;
        }

        // Only update if there are fields to update
        if (Object.keys(updateFields).length > 0) {
            const isUpdated = await UniversityInfoModel.updateOne(
                { _id: updateId },
                { $set: updateFields }
            );


            if (isUpdated) {
                return Response.json({
                    success: true,
                    message: "The University data has been Updated"
                }, {
                    status: 200,
                })
            } else {
                return Response.json({
                    success: false,
                    message: "Review your Entered Fields or Try Again"
                }, {
                    status: 201,
                })
            }

        }
    }

    catch (error) {

        console.error("Error Updating University data", error);

        return Response.json({
            success: false,
            message: "Error while Updating from database"
        }, {
            status: 500,
        })
    }
}


export async function GET(request: Request) {
    try {
        await dbConnect();
        const { searchParams } = new URL(request.url);
        const queryParam = {
            id: searchParams.get('id')
        }
        const id = queryParam.id

        const data = await UniversityInfoModel.findOne({ _id: id });
        const newdata = JSON.stringify(data);

        if (data) {
            return Response.json({
                success: true,
                message: newdata,

            }, {
                status: 200,
            })
        } else {
            return Response.json({
                success: false,
                message: "Error while fetching the Univerity data ,Try later"
            }, {
                status: 200,
            })
        }

    }
    catch (error) {
        console.log(error);

        return Response.json({
            success: false,
            message: "Error while Getting the University data from database. Try again"
        }, {
            status: 500,
        })
    }
}