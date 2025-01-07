import { NextRequestWithAuth, withAuth } from "next-auth/middleware"
import { NextResponse } from "next/server";

export default withAuth(
    function middleware(req:NextRequestWithAuth){
        console.log(`running middleware on path${req.nextUrl.pathname}`);
                
        
        if(req.nextUrl.pathname.startsWith("/admin")&& req.nextauth.token?.role!=="admin"){
            return NextResponse.rewrite(new URL("/denied",req.url))
        }
        
    },{
        callbacks:{
            authorized:((token)=> !!token)  // Ensures that there is a valid token
        }
    }
)

export const config={matcher:['/admin/:dashboard*']}