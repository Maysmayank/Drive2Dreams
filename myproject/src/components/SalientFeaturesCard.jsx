import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { TimelineDemo } from "./TimelineDemo";

function SalientFeaturesCard({ features, universityName, courseTitle, courseInfo }) {
  console.log(features);

  return (
    <>
      <div className="flex flex-col-reverse md:flex-row md:gap-0 md:w-[90%] md:items-center m-auto overflow-hidden rounded-lg  bg-white">
        
        <TimelineDemo features={features} />

        <div className="p-6 w-full flex flex-col gap-6 bg-white" style={{boxShadow: "rgba(17, 17, 26, 0.05) 0px 4px 16px, rgba(17, 17, 26, 0.05) 0px 8px 32px"}}>
          <div>
            <h3 className="font-bold text-3xl pb-4 text-gray-900">{`${courseTitle} @ ${universityName}`}</h3>
            <pre className="mt-4 text-gray-700 text-justify leading-relaxed text-wrap font-serif ">{courseInfo}</pre>
          </div>

          <Link href="/contact">
          <button className="p-[3px] relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-blue-700 rounded-lg" />
              <div className="px-8 py-2 bg-blue-400 rounded-[6px] relative group transition duration-200 text-white hover:bg-transparent">
                Apply Now
              </div>
            </button>
          </Link>
        </div>
      </div>


    </>

  );
}

export default SalientFeaturesCard;
