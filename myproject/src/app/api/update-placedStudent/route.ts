
import { PlacedStudent, PlacedStudentModel } from "@/models/PlacedStudents";
import { CloudinaryProp } from "../post/addPlacedStudents/route";
import { cloudinary } from "@/utils/cloudinary";

const uploadImage = async (file: File): Promise<CloudinaryProp> => {
  const arrayBuffer = await file.arrayBuffer();
  const buffer = new Uint8Array(arrayBuffer);

  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        { folder: "ImageBucket", public_id: file.name },
        (error, result) => {
          if (error) {
            reject(error);
            return;
          }
          resolve(result as any);
        }
      )
      .end(buffer);
  });
};
export async function PATCH(request: Request) {
  const { searchParams } = new URL(request.url);
  const studentId = searchParams.get("studentId");

  if (!studentId) {
    return Response.json(
      { success: false, message: "Student ID is required" },
      { status: 400 }
    );
  }

  const formData = await request.formData();
  const studentName = formData.get("studentName") as string;
  const companyName = formData.get("companyName") as string;
  const universityName = formData.get("universityName") as string;
  const studentImage = formData.get("studentImage") as File | null;
  const companyImage = formData.get("companyImage") as File | null;

  // console.log("Received Form Data:", { studentName, companyName, universityName, studentImage, companyImage });

  // Step 1: Fetch current student data from DB
  const existingStudent = await PlacedStudentModel.findById(studentId);
  
  if (!existingStudent) {
    return Response.json(
      { success: false, message: "Student not found" },
      { status: 404 }
    );
  }

  // Step 2: Initialize the query for updating the student
  const query: Partial<PlacedStudent> = {};

  // Compare student data and update only if different
  if (studentName && studentName !== existingStudent.studentName) {
    query.studentName = studentName;
  }

  if (companyName && companyName !== existingStudent.companyName) {
    query.companyName = companyName;
  }

  if (universityName && universityName !== existingStudent.universityName) {
    query.universityName = universityName;
  }

  // Step 3: Handle Image Uploads Only If Files are Provided
  try {
    // Check if studentImage is a valid File object before attempting upload
    if (studentImage && studentImage instanceof File) {
      console.log("Uploading Student Image...");
      const uploadedStudentImage = await uploadImage(studentImage);
      if (uploadedStudentImage.secure_url !== existingStudent.cloudinaryStudentImageUrl) {
        query.cloudinaryStudentImageUrl = uploadedStudentImage.secure_url;
        query.cloudinaryStudentImageName = uploadedStudentImage.display_name;
      }
    }

    // Check if companyImage is a valid File object before attempting upload
    if (companyImage && companyImage instanceof File) {
      console.log("Uploading Company Image...");
      const uploadedCompanyImage = await uploadImage(companyImage);
      if (uploadedCompanyImage.secure_url !== existingStudent.cloudinaryCompanyLogoImageUrl) {
        query.cloudinaryCompanyLogoImageUrl = uploadedCompanyImage.secure_url;
        query.cloudinaryCompanyImageName = uploadedCompanyImage.display_name;
      }
    }
  } catch (error) {
    console.error("Error uploading images:", error);
    return Response.json(
      { success: false, message: "Image upload failed" },
      { status: 500 }
    );
  }

  // Step 4: Update only if there are changes
  if (Object.keys(query).length === 0) {
    return Response.json(
      { success: true, message: "No changes detected, update skipped" },
      { status: 200 }
    );
  }

  await PlacedStudentModel.updateOne(
    { _id: studentId },
    { $set: query }
  );

  return Response.json(
    { success: true, message: "Student details updated successfully" },
    { status: 200 }
  );
}




