import * as z from 'zod';

export const signUpSchema = z.object({
    username: z.string().min(1, { message: "Username is required" }), // Ensure username is a non-empty string
    email: z.string().email({ message: "Invalid email address" }), // Validate email format
    password: z.string().min(3, { message: "Password must be at least 3 characters long" }), // Validate password length
});
