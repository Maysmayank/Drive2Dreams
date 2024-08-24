import React from 'react'
import { useRouter } from 'next/navigation'
export default function Introduction() {
  const router = useRouter();
  return (
    <div className='pt-20 pb-2 bg-[rgb(250,208,91)] w-full flex flex-col md:flex-row px-6 m-auto min-h-[500px] gap-2 items-center  justify-around'>
      
      <div className=" flex flex-col gap-2 justify-between rounded-lg w-full md:w-[80%] p-8">

        <h1 className='text-2xl font-semibold'>Hi,Welcome to Drive2Dreams</h1>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quam dignissimos aperiam facere quos! Enim ea ab, magni delectus ex dolores suscipit debitis accusamus quisquam saepe, tenetur minus tempore ipsa accusantium?</p>
        <button onClick={() => { router.push('/contact') }} className='mt-10 bg-blue-500 p-2 rounded-xl text-white w-[120px]'>contactus</button>

      </div>

      <div className='h-[300px] max-w-[600px] md:h-[300px] md:w-[800px]  ' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
        <img className='object-cover w-full h-full rounded-md' src="/home.jpg"  alt="homeimage" />
      </div>
    
    </div>

  )
}