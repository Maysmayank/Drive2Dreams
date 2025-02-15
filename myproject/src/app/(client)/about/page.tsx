'use client';
import FormComponent from '@/components/Form';
import React from 'react'

export default function About() {
  return (
    <div className=" pt-5 ">
      <div className='flex items-center flex-col'>
        <div className='  w-[100%] md:w-[80%] md:mt-10 flex items-center flex-col gap-10 px-2 '>
          <h1 className='text-8xl font-bold mt-5  md:mt-8 md:mx-2 bg-[#F2E5BF]'>WHO WE ARE ?</h1>
          <p className='nunito-para px-2 text-justify md:text-center'>
            At Drive2Dreams, we believe in the power of education to unlock potential and transform lives. Our mission is to guide and support students on their journey to finding the perfect university or college that aligns with their goals and aspirations. Whether you &apos;re dreaming of a career in engineering, medicine, business, or the arts, we&apos;re dedicated to helping you make informed decisions and take confident steps toward a brighter future.

            We partner with leading institutions to provide you with the best options, personalized guidance, and up-to-date information. Our team of experts is passionate about helping you navigate the complex world of higher education, ensuring that you are equipped with the tools and knowledge to succeed.

            Let us help you turn your dreams into reality, one step at a time.
          </p>

        </div>
        <div className='mt-10 md:my-20'>
          <h1 className='text-4xl text-center font-bold md:text-6xl'>Let us Help You to guide</h1>
          <div className='mt-8 flex flex-col items-center justify-center w-[90%] md:w-[50%] m-auto'>
            <FormComponent  classname='md:w-[140%]'/>
          </div>
        </div>

      </div>

    </div>
  )
}

