import * as z from 'zod';
interface UniversityInfo extends Document{
    universityName:string;
    aboutUniversity:string;
    admissionProcess:string;
    cutoffs:string,
    image:File
}
// Define the Zod schema for course information form validation
export const UniversityInfoSchema = z.object({
    universityName: z.string().min(1, { message: "University name is required" }),
    aboutUniversity:z.string().min(1,{message:"info about university Required"}),
    admissionProcess:z.string(),
    cutoffs:z.string(),
    image: z.any()
        .refine(files => {return Array.from(files).every(file => file instanceof File)}, { message: "Expected a file" })
})