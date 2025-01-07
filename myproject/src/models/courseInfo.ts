import mongoose, { Schema, Document, Types } from "mongoose";
import { UniversityInfoModel } from "./UniversityModel";
// Define the TypeScript interface for the CourseInfo document
interface CourseInfo extends Document {
    university: Types.ObjectId;
    title: string; // Title of the course
    courseInfo: string; // Detailed information about the course
    eligibilityCriteria:string[];
    courseContent?: string[]; // Optional array of strings for course content like syllabus
    duration?: string; // Duration of the course
    syllabus?: string; // Optional field for storing file path or URL to PDF
    
}


const CourseInfoSchema: Schema = new mongoose.Schema<CourseInfo>({
    university: {
        type: Schema.Types.ObjectId,
        ref: UniversityInfoModel,  // Use the model name as a string
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    courseInfo: {
        type: String,
        required: true,
    },
    courseContent: {
        type: [String], // Array of strings for multiple lines of course content
    },

    eligibilityCriteria:{
        type:[String],
        required: true,
        default:[""]
    },

    duration: {
        type: String,
    },
    syllabus: {
        type: String, // URL or path to the PDF file
    }
});

const CourseInfoModel = mongoose.models?.CourseInfo || mongoose.model<CourseInfo>('CourseInfo', CourseInfoSchema);

export  {CourseInfoModel};
