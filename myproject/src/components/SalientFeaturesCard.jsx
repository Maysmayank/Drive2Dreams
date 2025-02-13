import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";
import { TimelineDemo } from "./TimelineDemo";

function SalientFeaturesCard({ features, universityName, courseTitle, courseInfo }) {
  console.log(features);
  
  return (
    <>
    <div className="flex flex-col-reverse md:flex-row gap-6 md:w-[90%] md:items-center m-auto overflow-hidden rounded-lg  bg-white">
      {/* Left Section (Salient Features) */}
      {/* <div className="md:w-[40%]  p-6 bg-gradient-to-b from-yellow-400 to-yellow-500 md:pb-5 border-r border-gray-300">
        <h3 className="text-2xl font-bold mb-4 md:mt-5 text-gray-900">Salient Features</h3>

        <ul className="flex flex-col gap-5 text-md text-gray-800">
          {features.map((feature, index) => (
            <li 
              key={index} 
              className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-transform transform hover:scale-[1.03]"
            >
              <h2 className="text-lg font-semibold text-gray-900">{feature.Heading}</h2>
              <ul className="mt-3 list-disc pl-5 space-y-2 text-gray-700">
                {feature.subHeadings.map((sub, i) => (
                  <li key={i} className="text-sm">{sub}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div> */}
    <TimelineDemo features={features} />

      {/* Right Section (Course Info) */}
      <div className="p-6 w-full flex flex-col gap-6 bg-white">
        <div>
          <h3 className="font-bold text-3xl text-gray-900">{`${courseTitle} @ ${universityName}`}</h3>
          <pre className="mt-4 text-gray-700 text-justify leading-relaxed text-wrap font-serif ">{courseInfo}</pre>
        </div>

        <Link href="/contact">
          <Button className="w-full md:w-[40%] mt-5 py-3 text-lg bg-blue-600 hover:bg-blue-800 hover:scale-105 transition-all shadow-md">
            Apply Now
          </Button>
        </Link>
      </div>
    </div>


    </>
    
  );
}

export default SalientFeaturesCard;
