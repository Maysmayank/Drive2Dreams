import GoogleProvider from "next-auth/providers/google";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user";
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    })
  ],

  pages: {
    signIn: '/signup'
  },
  session: {
    strategy: "jwt"
  },
  secret:process.env.NEXT_AUTH_SECRET,
  callbacks:{
    async signIn({ account, profile }) {
      if(!profile?.email){
        return false
      }
      try{
        dbConnect();      
        let user = await UserModel.findOne({email:profile.email})
        
        if(!user){
          const newUser=new UserModel({
            username:profile.name,
            email:profile.email,
          })
          
          await newUser.save();
        }
        
        return true  
      }catch (error) {
        console.error("Error during sign-in:", error);
        return false; // Prevent sign-in on error
      }
    },

    async jwt({ token,user}) {
      if(user){
        const dbUser = await UserModel.findOne({ email: token.email });
          token.id=user.id?.toString();
          token.role=dbUser.role;
          
      }
      return token
    },
    
    async session({session,token}){
      if(token){
        session.user.id=token.id;
        session.user.role=token.role;
      }
      return session
    }

  }
}

export default NextAuth(authOptions)