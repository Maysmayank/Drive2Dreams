'use client'
import Image from 'next/image';
import React from 'react';
import { motion } from "motion/react"

const imageArray = [
  '/recruiters/Amazon.png',
  '/recruiters/dell.png',
  '/recruiters/flipkart.png',
  '/recruiters/hcl.png',
  '/recruiters/Huawei.avif',
  '/recruiters/infosys.png',
  '/recruiters/LG.png',
  '/recruiters/loreal.png',
  '/recruiters/Microsoft.png',
  '/recruiters/NCS.jpg',
  '/recruiters/pepsi.png',
  '/recruiters/policybazar.avif',
  '/recruiters/reliancel.png',
  '/recruiters/samsung.png',
  '/recruiters/SBI.jpg',
  '/recruiters/TATA.png',
  '/recruiters/tatasteel.png',
  '/recruiters/techmahindra.png',
  '/recruiters/vedantu.jpg',
  '/recruiters/wipro.png',
  '/recruiters/zomato.png',
];

const RecruiterPanel = () => {
  const topImageArray=imageArray.slice(0,Math.ceil(imageArray.length/2));
  const bottomImageArray=imageArray.slice(topImageArray.length,imageArray.length);

  const topImages = [...topImageArray, ...topImageArray]; // Clone array

  const bottomImages=[...bottomImageArray,...bottomImageArray]

  return (
    <div className="flex flex-col gap-16 items-center bg-[#f9f9f8] py-10 md:p-6 md:py-14">
      <h1 className="text-3xl text-center font-bold">Recruiters Panel</h1>
      <div className="w-[90%] flex flex-col gap-10 overflow-hidden relative">
        
        {/* Top Scroller */}
        <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-100%"] }} // Scrolls to the left
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
        >
          {topImages.map((src, index) => (
            <div
              key={index}
              className="rounded-lg bg-white p-2 shadow-md w-[150px] h-[100px] flex flex-shrink-0"
            >
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                height={100}
                width={200}
                className="object-contain"
              />
            </div>
          ))}
        </motion.div>


        <div className="bottom-container-scroller flex gap-4 ">
          {bottomImages.map((src, index) => (
            <motion.div
              key={index}
              initial={{ x: "-900%" }} // Start with the last element
              animate={{ x: "100%" }} // Scroll forward to show the first element
              transition={{ duration: 35, ease: "linear", repeat: Infinity }}
              className="rounded-lg p-2 bg-white shadow-md w-[150px] h-[100px] flex flex-shrink-0"
            >
              <Image
                src={src}
                alt={`Image ${index + 1}`}
                height={100}
                width={200}
                className="object-contain"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default RecruiterPanel;
