import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user";
import bcryptjs from 'bcryptjs';
export async function POST(request: Request) {
    await dbConnect();
    try {
        const { username, email, password } = await request.json();
        const existingUserVerifiedByEmail = await UserModel.findOne({ email });

        if (existingUserVerifiedByEmail) {
            return Response.json({
                success: false,
                message: "email already Taken",
            }, { status: 400 })
        }
        
        const hashedPassword= await bcryptjs.hash(password,10);
        let newUser = new UserModel({
            username, email, password:hashedPassword
        })
        await newUser.save();

        return Response.json({
            success: true,
            message: "signup successful",
        }, { status: 201 })



    } catch (err) {
        console.error("error registering user", err);
        return Response.json({
            success: false,
            message: "Error signup user"
        }, {
            status: 500,
        })
    }
}

