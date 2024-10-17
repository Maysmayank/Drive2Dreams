import * as z from 'zod';

// Define the Zod schema for course information form validation
export const courseInfoSchema = z.object({
  universityName: z.string().min(1, { message: "University name is required" }),

  title: z.string().min(1, { message: "Title is required" }),
  
  courseInfo: z.string().min(2,{message:"Enter this field"}),
  
  courseContent: z.array(z.string()).optional(), // Optional array of strings
  
  duration: z.string().min(1, { message: "Duration is required" }).optional(),
  
  syllabus: z.string().optional(), // Optional field for syllabus
  })