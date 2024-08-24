'use client';
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'
import {InputBox} from '@/components/InputBox'
import { useRouter } from 'next/navigation';
import Bottomwarning from '@/components/Bottomwarning'
import { signIn } from 'next-auth/react';
export default function Signup(){
  const [username,setUsername]=useState("");
  const [email,SetEmail]=useState("");
  const [password,SetPassword]=useState("");
  const router=useRouter();
  const navigate=(name:string)=>{
    router.push(name)
  }

    return(
        <div className='flex items-center justify-center'>
            <div className='  rounded-xl p-5 flex flex-col items-center gap-5 px-10' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
                <div className='text-center mb-2 '>SignUp</div>
                <div className='flex flex-col gap-1'>
                    <InputBox onChange={(e:any)=>{setUsername(e.target.value)}} label={"Name"} placeholder={"enter your name" }></InputBox>
                    <InputBox onChange={(e:any)=>{SetEmail(e.target.value)}} label={"Email"} placeholder={"enter your name" }></InputBox>
                    <InputBox onChange={(e:any)=>{SetPassword(e.target.value)}} label={"Password"} placeholder={"enter your name" }></InputBox>
                </div>
                <button onClick={()=>navigate("/about")} className='bg-yellow-400 rounded-lg p-2 w-40 '>SignUp</button>
                <button onClick={()=>signIn("google")} className='text-white bg-blue-600 p-3'>Sign Up with Google</button>
                <div>
                    <Bottomwarning label={"Already have an account?"} to={'/home'} buttontext={'Home'}></Bottomwarning>
                </div>

            </div>
            
        </div>
    )
}