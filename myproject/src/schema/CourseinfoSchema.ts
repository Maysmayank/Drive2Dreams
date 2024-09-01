import * as z from 'zod';

// Define the Zod schema for course information form validation
export const courseInfoSchema = z.object({
  university: z.string().min(1, { message: "University name is required" }),

  title: z.string().min(1, { message: "Title is required" }),
  
  courseInfo: z.string().max(2000, { message: "max-2000 letter can be written" }).optional(),

  courseOverview:z.string().max(360,{message:"only 10-15 lines are needed! "}),
  
  courseContent: z.array(z.string()).optional(), // Optional array of strings
  
  duration: z.string().min(1, { message: "Duration is required" }).optional(),
  
  syllabus: z.string().optional(), // Optional field for syllabus
});
