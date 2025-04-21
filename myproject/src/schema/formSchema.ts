import * as z from 'zod';

export const formSchema = z.object({
    username: z.string().min(1, { message: "username is required" }),
    email: z.string().email({ message: "Invalid email address" }),
    phone_number: z
        .string()
        .length(10, { message: "Phone number must be exactly 10 digits" }),
    program: z.string(), // Dropdown options
});