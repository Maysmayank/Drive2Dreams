"use client";
import { ArrowBigLeft, ArrowLeft, ArrowRight } from "lucide-react";
import Image from "next/image";
import React, { useEffect, useRef } from "react";
const imageArray = [
  "/colleges/Accurate College.webp",
  "/colleges/Amity university.png",
  "/colleges/Amry Institute.webp",
  "/colleges/Gn Group.jpeg.jpg",
  "/colleges/GNIOT.jpg",
  "/colleges/JIMS-Greater-Noida.jpg",
  "/colleges/Lloyd Business School.png",
];
function PopularPrograms() {
  // useEffect(() => {
  //   const intervalId = setInterval(() => {
  //     scrollAmount(442);
  //   }, 8000);

  //   // Cleanup the interval when the component unmounts
  //   return () => clearInterval(intervalId);
  // }, []);

  let scrollerRef = useRef(null);
  const scrollAmount = (amount) => {
    if (scrollerRef.current) {
      scrollerRef.current.scrollBy({
        left: amount,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <h1 className="font-bold text-3xl text-center mt-16">
        Explore Popular Degree Programs by Top Universities
      </h1>
      <div className="scroller-conatiner relative m-auto md:w-[92%]">
        <div ref={scrollerRef} className="scroller">
          {imageArray.map((src, index) => (
              <Image
                className={` ${index===5?'bg-red-400 mt-3 h-[80px]':'object-contain px-2'}`}
                key={index}
                src={src}
                alt={`Image ${index + 1}`}
                height={100}
                width={150}
              />
          ))}

          <span
            onClick={() => scrollAmount(-442)}
            className="  bg-slate-100 p-2  -left-3 top-10 rounded-full  absolute "
          >
            <ArrowLeft size={15} />{" "}
          </span>
          <span
            onClick={() => scrollAmount(442)}
            id="forward"
            className="bg-slate-100 p-2 -right-3 top-10 rounded-full absolute "
          >
            <ArrowRight size={15} />
          </span>
        </div>
      </div>
    </>
  );
}

export default PopularPrograms;
