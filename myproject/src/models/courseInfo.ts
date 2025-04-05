import mongoose, { Schema, Document, Types } from "mongoose";
import { UniversityInfoModel } from "./UniversityModel";
// Define the TypeScript interface for the CourseInfo document
export interface CourseInfo extends Document {
    university?: Types.ObjectId;
    universityName:String;
    title: string; // Title of the course
    courseInfo: string; // Detailed information about the course
    eligibilityCriteria:string[];
    videoUrl:string;
    affilitatedWith:string;
    specializationOffered:string[];
    admissionProcess?: string; // Optional array of strings for course content like syllabus
    duration?: string; // Duration of the course
    Brochure?: string; // Optional field for storing file path or URL to PDF
    courseRating:number;
    Ebook?:string;
    features: {
        heading: string; // Main heading
        subheadings: string[]; // Array of subheadings for each heading
    }[];
}

const CourseInfoSchema: Schema = new mongoose.Schema<CourseInfo>({
    university: {
        type: Schema.Types.ObjectId,
        ref: UniversityInfoModel,  
        required: true,
    },
    universityName:{
        type:String,
        required:true,
    },
    title: {
        type: String,
        required: true,
    },
    courseInfo: {
        type: String,
        required: true,
    },
    admissionProcess: {
        type: String, // Array of strings for multiple lines of course content
    },
    affilitatedWith:{
        type:String,
        required:false,
    },
    eligibilityCriteria:{
        type:[String],
        required: true,
        default:[""]
    },
    videoUrl:{
        type:String,
        default:'',
        required:false
    },
    specializationOffered:{
        type:[String],
        default:[''],
        required:true,
    },
    courseRating:{
        type:Number,
        required:true,
        default:4
    },
    duration: {
        type: String,
    },
    Brochure: {
        type: String, // URL or path to the PDF file
        default:''
    },
    Ebook:{
        type:String,
        default:''
    },
    features: [
        {
          Heading: { type: String, required: true },
          subHeadings: { type: [String], required: true, default: [] },
        },
    ],
    
});

const CourseInfoModel = mongoose.models?.CourseInfo || mongoose.model<CourseInfo>('CourseInfo', CourseInfoSchema);

export  {CourseInfoModel};
