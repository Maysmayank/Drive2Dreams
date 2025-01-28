import * as z from 'zod';


// Define the Zod schema for course information form validation
export const UniversityInfoSchema = z.object({
    universityName: z.string().min(1, { message: "University name is required" }),
    aboutUniversity: z.string().min(1, { message: "Info about university is required" }),
    ageOfUniversity: z.coerce.number().min(1, { message: "Age of University is required" }),
    highestPackageOffered: z.coerce.number().min(1, { message: "Mention the highest package" }),
    industryConnections: z.coerce.number().min(1, { message: "Mention the connections" }),
    placementRatio: z.coerce.number().min(1, { message: "Mention the placement ratio" }),
    cutoffs: z.string(),
    image: z
      .any()
      .refine((files) => Array.from(files).every((file) => file instanceof File), {
        message: "Expected a file",
      })
      .optional(),
  });