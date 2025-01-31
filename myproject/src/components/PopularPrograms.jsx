"use client";
import { ArrowBigLeft, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import { motion } from "motion/react"
import React, { useEffect, useRef } from "react";
const imageArray = [
  "/colleges/AccurateCollege.jpg",
  "/colleges/Gn Group.jpeg.jpg",
  "/colleges/Amity University.png",
  "/colleges/Amry Institute.webp",
  "/colleges/GNIOT.jpg",
  "/colleges/JIIMSGNjpg.jpg",
  "/colleges/llyod.jpg",
  "/colleges/GIMS.avif",

];


function PopularPrograms() {
  

  let scrollerRef = useRef(null);
  // const scrollAmount = (amount) => {
  //   if (scrollerRef.current) {
  //     scrollerRef.current.scrollBy({
  //       left: amount,
  //       behavior: "smooth",
  //     });
  //   }
  // };

  return (
    <>
      <h1 className="font-bold text-xl px-4 md:px-0 md:text-3xl text-center  md:mt-16">
        Explore Popular Degree Programs by Top Universities
      </h1>
      <div className="scroller-conatiner relative  m-auto   mt-4 md:mt-10 w-full md:w-[92%]">
        <div ref={scrollerRef} className="scroller gap-10 md:gap-[45px]">
          <motion.div
          className="flex gap-4"
          animate={{ x: ["0%", "-100%"] }} // Scrolls to the left
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
        >
          {[...imageArray,...imageArray].map((src, index) => (
              <Image
                className={` ${index===5?'':'object-contain px-2'}`}
                key={index}
                src={src}
                alt={`Image ${index + 1}`}
                height={100}
                width={150}
              />
          ))}
          </motion.div>
          

         
        </div>
      </div>
    </>
  );
}

export default PopularPrograms;
