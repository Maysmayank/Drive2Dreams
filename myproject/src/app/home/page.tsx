'use client';
import React from 'react'
import { useRouter } from 'next/navigation'
export default function Home(){
  const router=useRouter();
  return(
        <div className='flex px-6 h-[400px] justify-between '>
          <div className="flex flex-col justify-between bg-[rgb(250,208,91)] rounded-lg max-w-[50%] p-8" style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
            <h1 className='text-2xl font-semibold'>Hi,Welcome to Drive2Dreams</h1>
            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos aperiam facere quos! Enim ea ab, magni delectus ex dolores suscipit debitis accusamus quisquam saepe, tenetur minus tempore ipsa accusantium?</p> 
            <button onClick={()=>{router.push('/contact')}} className='bg-blue-500 p-2 rounded-xl text-white w-[120px]'>contactus</button>
          </div>

          <div className='bg-yellow-50 '>
             
          </div>
        </div>
  )
}