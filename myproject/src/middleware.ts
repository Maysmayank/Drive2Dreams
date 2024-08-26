import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";
console.log("hi");

export default withAuth(
    function middleware(req:NextRequestWithAuth){
        if(req.nextUrl.pathname.startsWith("/dashboard")&& req.nextauth.token?.role!=="admin"){
            return NextResponse.rewrite(new URL("/denied",req.url))
        }
        
    },{
        callbacks:{
            authorized:((token)=> !!token)
        }
    }
)

export const config={matcher:['/contact','/dashboard']}