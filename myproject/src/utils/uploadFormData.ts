"use server";

import dbConnect from "@/lib/dbConnect";
import { cloudinary } from "../utils/cloudinary";
import { UniversityInfoModel } from "@/models/UniversityModel";
import { error } from "console";

export default async function handleUpload(formData: FormData) {
    try {
        await dbConnect();
        let image = formData.get("image") as File;
        
        if (!image) {
            return {
                success: false,
                message: "Form Error: Image Required",
            };


        } else {


            let universityName = formData.get("universityName");
            let isUniversityExists = await UniversityInfoModel.find({
                universityName: universityName,
            });


            if (isUniversityExists.length > 0) {
                
                
                return {
                    success: false,
                    message: "University Info already Exists",
                };


            } else {
                const arrayBuffer = await image.arrayBuffer();
                
                const buffer = new Uint8Array(arrayBuffer);  
                console.log("here 1----");
                
                let res: any= await new Promise((resolve, reject) => {
                    cloudinary.uploader
                        .upload_stream({ folder: "ImageBucket", public_id: image.name}, function (error, result) {
                            if (error) {
                                reject(error);
                                return;
                            }
                            resolve(result);
                        })
                        .end(buffer);
                });
                
                console.log("here2");
                
                let cloudImageUrl=res.secure_url;
                let cloudImageName=res.display_name;
                const newUniversity = new UniversityInfoModel({
                    universityName: formData.get("universityName"),
                    aboutUniversity: formData.get("aboutUniversity"),
                    admissionProcess: formData.get("admissionProcess"),
                    cutoffs: formData.get("cutoffs"),
                    cloudinaryImageUrl:cloudImageUrl,
                    cloudinaryImageName:cloudImageName

                });


                console.log(newUniversity);
                

                await newUniversity.save();

                return {
                    success: true,
                    message: "University Info Added successfully",
                };
            }
        }
    } catch (error:any) {
        console.log("Error message:", error.message);
        console.log("Error stack:", error.stack);
        console.log("Full Error:", JSON.stringify(error, Object.getOwnPropertyNames(error)));        
        return {
            success: false,
            message: "Something went wrong",

        };
    }

}
