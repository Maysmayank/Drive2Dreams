import GoogleProvider from "next-auth/providers/google";
import  CredentialsProvider from "next-auth/providers/credentials";
import { NextAuthOptions } from "next-auth";
import NextAuth from "next-auth/next";
import dbConnect from "@/lib/dbConnect";
import { UserModel } from "@/models/user";
import bcryptjs from 'bcryptjs';
export const authOptions: NextAuthOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
    CredentialsProvider({    
      id:"credentials",
      name:"Credentials",

      credentials:{
          email: { label: "email", type: "text ", placeholder: "enter an Email" },
          password: { label: "Password", type: "password" },  
      },

     async authorize(credentials:any):Promise<any>{
      await dbConnect();
      try {
         const user= await UserModel.findOne({$or:[
              {email:credentials.identifier},
              {username:credentials.identifier}
          ]})
          
          if(!user){
              throw new Error("No user found with email")
          }
          const isPasswordCorrect=await bcryptjs.compare(credentials.password,user.password)
          if(isPasswordCorrect){
              return user;
          }else{
              throw new Error("incorrect password");
          }
      
      } catch (error:any) {
          throw new Error(error);
      }
     }
  })
  
  ],

  pages: {
    signIn: '/login'
  },
  session: {
    strategy: "jwt",
    maxAge:24*60*60
  },
  secret:process.env.NEXTAUTH_SECRET!,
  callbacks:{
    async signIn({ account, profile }) {

      if (account?.provider === 'google') {
        if(!profile?.email){
          return false
        }
        try{
          await dbConnect();      
          let user = await UserModel.findOne({email:profile.email})
        
          if(!user){
            const newUser= new UserModel({
            username:profile.name,
            email:profile.email, 
            })
            
            await newUser.save();
          }          
          return true  
        } catch (error) {
          console.error("Error during sign-in:", error);
          return false; // Prevent sign-in on error
        }
      }
      return true;
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