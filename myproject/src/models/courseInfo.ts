import mongoose, { Schema, Document } from "mongoose";


// Define the TypeScript interface for the CourseInfo document
interface CourseInfo extends Document {
    university: string; // Name of the university or college
    title: string; // Title of the course
    courseOverview:string; // give overview to show on CourseCard 
    courseInfo: string; // Detailed information about the course
    courseContent?: string[]; // Optional array of strings for course content like syllabus
    duration?: string; // Duration of the course
    syllabus?: string; // Optional field for storing file path or URL to PDF
}


const CourseInfoSchema: Schema = new Schema<CourseInfo>({
    university: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    courseOverview:{
        type:String,
        required:true
    },
    courseInfo: {
        type: String,
        required: true,
    },
    courseContent: {
        type: [String], // Array of strings for multiple lines of course content
    },
    duration: {
        type: String,
    },
    syllabus: {
        type: String, // URL or path to the PDF file
    }
});

const CourseInfoModel = mongoose.models.CourseInfo || mongoose.model<CourseInfo>('CourseInfo', CourseInfoSchema);

export  {CourseInfoModel};