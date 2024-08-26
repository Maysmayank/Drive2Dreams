import dbConnect from "@/lib/dbConnect";
import { FormModel } from "@/models/user";
import { NextRequest } from "next/server";

export async function POST(req:NextRequest){    
    dbConnect();
    
    try{
        const {username,email,phone_number,program}=await req.json();
        
        const isUserPresent=await FormModel.findOne({email});
        if(isUserPresent){
            return Response.json({
                success:false,
                message:"You have already been submitted your form"
            })
            
        }else{
            let formData=new FormModel({
                username:username,
                email:email,
                phone_number:phone_number,
                program:program
            })
        
            await formData.save();
            return Response.json({
                success: true,
                message: "form filled successfully",
            }, { status: 201 })
    
        }
        

    }catch(error){
        return Response.json({
            success: false,
            message: "Error in Form internal server in form/route"
        }, {
            status: 500,
        })
    }

} 