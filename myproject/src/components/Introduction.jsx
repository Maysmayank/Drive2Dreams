'use client';
import React, { useState } from 'react'
import { Button } from './ui/button';
import { useRouter } from 'next/navigation'
import FormComponent from './Form';
import Image from 'next/image';
export default function Introduction() {
  const [showContact, setShowContact] = useState(true);

  const router = useRouter();
  function HandleClick() {
    setShowContact(false)
  }
  return (
    <>
      <div className='relative'>
        <div className='pt-20 pb-7 bg-[hsl(44,86%,61%)] w-full flex flex-col md:flex-row px-3 m-auto min-h-[500px] gap-2 items-center  justify-around'>

          <div className=" flex flex-col  gap-5 justify-between rounded-lg w-full md:w-[80%] p-8">

            <h1 className='text-4xl md:text-5xl .open-sans-paragraph font-bold'> Welcome to Drive2Dreams</h1>
            <p className="nunito-para">
              We&apos;re here to turn your career ambitions into reality. From helping you choose the right college to offering personalized guidance, we connect your dreams with the best opportunities. Your future&nbsp;starts&nbsp;with&nbsp;us!
            </p>            <button onClick={() => { router.push('/contact') }} className='mt-5 md:mt-10 bg-[#110d3b] p-2  text-white w-[120px]'>contact us</button>

          </div>

          <div className='md:h-[270px] md:w-[700px]' style={{ boxShadow: 'rgba(0, 0, 0, 0.24) 0px 3px 8px' }}>
            <Image height={300} width={800} className='object-cover w-full h-full rounded-md' src="/home.jpg" alt="homeimage" />
          </div>

        </div>
      </div>
      {
        showContact && (
          <div className='absolute bg-black flex items-center justify-center animate-jump-in animate-delay-1000  opacity-96 z-10 p-2 top-[10%] w-full md:top-[16%] md:p-0  '>

            <div className='absolute  pt-10 bg-white  flex flex-col items-center top-[15%] md:w-[40%] md:top-[50%]'>

              <Button className='absolute top-7 right-4' onClick={HandleClick}>X</Button>

              <div className="flex px-2 flex-col items-center">
                <h1>Connect With Us</h1>
                <span>Fill in Your Details to Receive Expert Advice</span>
              </div>

              <div className='w-full flex justify-center'>
                <FormComponent />
              </div>

            </div>


          </div>
        )
      }

    </>

  )
}
