import { University } from 'lucide-react';
import * as z from 'zod';

export const PlacedStudentSchema = z.object({
    universityName:z.string().min(2,{message:'universityName should be given'}),
    studentName: z.string().min(1, { message: "student name is required" }),
    companyName:z.string(),
    companyImage:z.any()
    .refine(files => {return Array.from(files).every(file => file instanceof File)}, { message: "Expected a file" }).optional(),

    studentImage: z.any()
        .refine(files => {return Array.from(files).every(file => file instanceof File)}, { message: "Expected a file" }).optional()
})