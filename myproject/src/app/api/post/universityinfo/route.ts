import dbConnect from "@/lib/dbConnect";
import { UniversityInfoModel } from "@/models/UniversityModel";
import { cloudinary } from "@/utils/cloudinary";
import { NextResponse } from "next/server";


export async function POST(request: Request, response: NextResponse) {
    await dbConnect();
    try {
        let data = await request.formData();
        
        let image = data.get("image") as File;
        
        if (!image) {
            return Response.json({
                success: false,
                message: "Form Error: Image Required ",
            }, {
                status: 400,
            })
        } else {
            let universityName = data.get("universityName");
            let isUniversityExists = await UniversityInfoModel.find({
                universityName: universityName,
            });
            if (isUniversityExists.length > 0) {
                return Response.json({
                    success: false,
                    message: "The University info with this Title already Exists ",
                }, {
                    status: 400,
                })
            } else {
                const arrayBuffer = await image.arrayBuffer();
                const buffer = new Uint8Array(arrayBuffer);
                let res: any= await new Promise((resolve, reject) => {
                    cloudinary.uploader
                        .upload_stream({ folder: "ImageBucket", public_id: image.name}, function (error, result) {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(result as any);
                        })
                        .end(buffer);
                });


                let cloudImageUrl=res.secure_url;
                let cloudImageName=res.display_name;
                const newUniversity = new UniversityInfoModel({
                    universityName: data.get("universityName"),
                    aboutUniversity: data.get("aboutUniversity"),
                    admissionProcess: data.get("admissionProcess"),
                    cutoffs: data.get("cutoffs"),
                    cloudinaryImageUrl:cloudImageUrl,
                    cloudinaryImageName:cloudImageName

                });

                await newUniversity.save();

                return Response.json({
                    success: true,
                    message: "University Added successfully ",
                }, {
                    status: 200,
                })

            }
        }
    } catch (err) {
        // console.log(err);

        return Response.json({
            success: false,
            message: "Error Occured, Try again ",
        }, {
            status: 500,
        })
    }


}