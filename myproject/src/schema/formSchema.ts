import * as z from 'zod'

export const formSchema = z.object({
    username:z.string().min(1,({message:"username is required"})),
    email: z.string().email({ message: "Invalid email address" }),
    phone_number:z.string().min(10,({message:"Phone number required"})),
    program: z.enum(['PGDM', 'MBA','B.tech']), // Dropdown options

});