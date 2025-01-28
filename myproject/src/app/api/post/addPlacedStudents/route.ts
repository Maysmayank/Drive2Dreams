import dbConnect from "@/lib/dbConnect";
import { PlacedStudentModel } from "@/models/PlacedStudents";
import { UniversityInfoModel } from "@/models/UniversityModel";
import { cloudinary } from "@/utils/cloudinary";
import { NextResponse } from "next/server";

interface CloudinaryProp {
    secure_url: string;
    display_name: string;
}

export async function POST(request: Request) {
    await dbConnect();

    try {
        const data = await request.formData();

        const studentName = data.get("studentName") as string;
        const companyName = data.get("companyName") as string;
        const universityName = data.get("universityName") as string;
        const studentImage = data.get("studentImage") as File;
        const companyImage = data.get("companyImage") as File;

        if (!(studentImage instanceof File) || !(companyImage instanceof File)) {
            return NextResponse.json(
                { success: false, message: "Form Error: Valid Images Required" },
                { status: 400 }
            );
        }

        // Check if the university exists
        const isUniversityExists = await UniversityInfoModel.findOne({ universityName });

        if (!isUniversityExists) {
            return NextResponse.json(
                { success: false, message: "The University is not Registered or Added" },
                { status: 400 }
            );
        }

        // Upload images to Cloudinary
        const uploadImage = async (file: File): Promise<CloudinaryProp> => {
            const arrayBuffer = await file.arrayBuffer();
            const buffer = new Uint8Array(arrayBuffer);

            return new Promise((resolve, reject) => {
                cloudinary.uploader.upload_stream(
                    { folder: "ImageBucket", public_id: file.name },
                    (error, result) => {
                        if (error) {
                            reject(error);
                            return;
                        }
                        resolve(result as any);
                    }
                ).end(buffer);
            });
        };

        const [uploadedStudentImage, uploadedCompanyImage] = await Promise.all([
            uploadImage(studentImage),
            uploadImage(companyImage),
        ]);

        // Save placed student to the database
        const newPlacedStudent = new PlacedStudentModel({
            universityId:isUniversityExists._id,
            universityName:universityName,
            studentName:studentName,
            companyName:companyName,
            cloudinaryStudentImageName: uploadedStudentImage.display_name,
            cloudinaryStudentImageUrl: uploadedStudentImage.secure_url,
            cloudinaryCompanyImageName: uploadedCompanyImage.display_name,
            cloudinaryCompanyLogoImageUrl: uploadedCompanyImage.secure_url,
        });
        console.log(isUniversityExists._id);
        
        await newPlacedStudent.save();

        return NextResponse.json(
            { success: true, message: "Placed Students Added Successfully" },
            { status: 200 }
        );
    } catch (err) {
        console.error(err);

        return NextResponse.json(
            { success: false, message: "Error Occurred, Try Again" },
            { status: 500 }
        );
    }
}
