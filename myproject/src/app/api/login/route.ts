import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user";
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
export async function POST(request: Request) {
    await dbConnect();
    try {
        const { email, password } = await request.json();
        const existingUserEmail = await UserModel.findOne({ email });
        if(!existingUserEmail){
            return Response.json({
                success: false,
                message: "You need to signup up first then try login again",
            }, { status: 201 })
        }
        else{
            const isPasswordValid = await bcryptjs.compare(password, existingUserEmail.password);
            if(!isPasswordValid){
                return Response.json({
                    success: false,
                    message: "wrong credentials try again ",
                }, { status: 201 })
            }else{
                
                const token=jwt.sign({username:existingUserEmail.username},process.env.JWT_SECRET! as string)
                return Response.json({
                    success: true,
                    message: "Logged in successfully!",
                    token:token // sending token to client to set in localstorage
                }, { status: 201 })
            }

        }

    } catch (err) {
        return Response.json({
            success: false,
            message: "Error while logging user"
        }, {
            status: 500,
        })
    }
}

