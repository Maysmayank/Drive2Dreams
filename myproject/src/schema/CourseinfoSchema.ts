import * as z from 'zod';

// Define the Zod schema for course information form validation
export const courseInfoSchema = z.object({
  universityName: z.string().min(1, { message: "University name is required" }),

  title: z.string().min(1, { message: "Title is required" }),
  courseInfo: z.string().min(2,{message:"Enter this field"}),
  
  admissionProcess: z.string(),
  
  duration: z.string().min(1, { message: "Duration is required" }).optional(),
  courseRating:z.coerce.number().max(5,{message:"the maximum rating can be 5"}),
  
  Brochure: z.string().optional(), // Optional field for syllabus
  
})

