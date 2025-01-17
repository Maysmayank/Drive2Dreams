'use client';
import React, { useState } from 'react'

import { Mail } from 'lucide-react';
import FormComponent from '@/components/Form';
import clsx from 'clsx';
const Contact = () => {

  return (
    <div className="pt-10 ">
      <div className='flex gap-2 items-center mb-9 flex-col md:flex-row justify-around md:items-center '>
        
        <div className='contact-info-container bg-white p-4 h-full'>
          <div className='pt-4 flex flex-col items-center gap-10 min-h-[250px] max-w-[620px]'>

            <span className='font-semibold text-5xl md:text-7xl'>Contact us</span> 
            
            <span className='text-center open-sans-paragraph'>
            &quot;Have questions, comments, or need expert advice? We&apos;re here to help! Whether you&apos;re seeking guidance, looking for more information, or just want to start a conversation, don’t hesitate to reach out. Fill out the form below, and our team will get back to you as soon as possible.&quot;
            </span>
          </div>

          <div className="border-t-2 border-gray-300 my-4"></div>

          <div className='socials flex items-center md:gap-2 flex-col ml-5 '>
            <span className='mt-3 flex items-center'>
              <span className='font-medium text-3xl mr-2'>EMAIL</span> 
              <Mail/>
            </span>
            <span className='open-sans-paragraph'>drive2dreams@gmail.com</span>
          </div>  

        </div>
        <FormComponent classname='max-w-[40%]'/>
      </div>

      


    </div>
  )
}

export default Contact