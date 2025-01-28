import mongoose, { Document, Schema ,Types} from "mongoose";
import { UniversityInfoModel } from "./UniversityModel";

export  interface PlacedStudent extends Document {
  universityId?:Types.ObjectId,
  universityName:string;
  companyName:string;
  studentName: string; 
  cloudinaryStudentImageName?: string;
  cloudinaryStudentImageUrl?: string;
  cloudinaryCompanyImageName?: string;
  cloudinaryCompanyLogoImageUrl?: string;
}

const PlacedStudentSchema: Schema = new mongoose.Schema<PlacedStudent>({
  universityId:{
    type: Schema.Types.ObjectId,
    required:true,
    ref:UniversityInfoModel
  },
  universityName:{
    type:String,
    required:true
  },
  studentName: {
    type: String,
    required: true, // Ensure the student name is mandatory
  },
  companyName:{
    type:String,
    required:true
  },
  cloudinaryStudentImageUrl: {
    type: String,
    required: true, // Optional field
    default:'',

  },
  cloudinaryStudentImageName: {
    type: String,
    required: true, // Optional field
  },
  cloudinaryCompanyImageName: {
    type: String,
    required: true, // Optional field
  },
  cloudinaryCompanyLogoImageUrl: {
    type: String,
    default:'',

    required: true, // Optional field
  },
});

// Exporting the Mongoose model
const PlacedStudentModel = mongoose.models?.PlacedStudent || mongoose.model<PlacedStudent>('PlacedStudent', PlacedStudentSchema);

export { PlacedStudentModel };
