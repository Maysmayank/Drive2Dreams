'use client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import {InputBox} from '@/components/InputBox'
import { useRouter } from 'next/navigation';
import Bottomwarning from '@/components/Bottomwarning'
import { signIn } from 'next-auth/react';
import axios from 'axios'
import { useToast } from "@/components/ui/use-toast"
import {loginSchema} from '@/schema/loginschema'
export default function Signup(){
  const [email,SetEmail]=useState("");
  const [password,SetPassword]=useState("");

  const router=useRouter();
  const { toast } = useToast()
  const navigate=(name:string)=>{
    router.push(name)
  }
  async function LoginHandler(){
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
        const errorMessage = validation.error.errors[0]?.message || "Invalid input";
        toast({
            title: 'Error',
            description: errorMessage,
            variant: "destructive"
        });
        return;
    }

    if (!email || !password) {
        toast({
            title: 'Error',
            description: 'Please fill in all fields.',
            variant: "destructive"
        });
        return;
    }


    try {
         
        const result = await signIn('credentials', {
          redirect: false,
          identifier:email,
          password
        });
    
        if (result?.error) {
          toast({
            title: 'Error',
            description: result.error,
            variant: "destructive"
        });
        } else if (result?.ok) {
              // Redirect to home or dashboard
            router.replace('/');
        }
    } catch (error) {
        toast({
          title: 'Error',
          description: 'An error occurred during login',
          variant: "destructive"
        });      
    }        

}

const handleGoogleSignIn = async () => { 
    try {
        await signIn('google', { redirect: true ,callbackUrl:'/'});        
    } catch (error) {
        toast({
            title: 'Error occured',
            description: 'Sign-in with Google failed. Please try again.',
            variant: 'destructive',
          });
    }
   
  };
    return(
        <div className='flex items-center justify-center'>
            <div className='  rounded-xl p-5 flex flex-col items-center gap-5 px-10' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                <div className='text-center mb-2 '>Login</div>
                <div className='flex flex-col gap-1'>
                    <InputBox onChange={(e:any)=>{SetEmail(e.target.value)}} label={"Email"} placeholder={"enter your Email" }></InputBox>
                    <InputBox onChange={(e:any)=>{SetPassword(e.target.value)}} label={"Password"} placeholder={"enter your password" }></InputBox>
                </div>
                <button onClick={LoginHandler} className='bg-yellow-400 rounded-lg p-2 w-40 '>Login</button>
                <button onClick={handleGoogleSignIn} className='text-white bg-blue-600 p-3'>Login with Google</button>
                <div>
                    <Bottomwarning label={"Already have an account?"} to={'/signup'} buttontext={'signup'}></Bottomwarning>
                </div>

            </div>
            
        </div>
    )
}