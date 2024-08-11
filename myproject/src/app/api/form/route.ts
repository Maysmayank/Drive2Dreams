import dbConnect from "@/lib/dbConnect";
import { FormModel } from "@/models/user";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){    
    dbConnect();
    
    try{
        const {username,email,phone_number,location,course}=await req.json();
        let formData=new FormModel({
            username,
            email,
            phone_number,
            location,
            course
        })
        await formData.save();
        return Response.json({
            success: true,
            message: "form filled successfully",
        }, { status: 201 })


    }catch(error){
        return Response.json({
            success: false,
            message: "Error in Form internal server in form/route"
        }, {
            status: 500,
        })
    }

} 