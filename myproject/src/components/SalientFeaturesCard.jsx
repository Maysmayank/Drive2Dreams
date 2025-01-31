import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function SalientFeaturesCard({ features, universityName, courseTitle, courseInfo }) {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-6 md:w-[90%] m-auto overflow-hidden rounded-lg  md:shadow-lg">
      {/* Left Section (Salient Features) */}
      <div className="md:w-[40%] p-6 bg-[#ffd665]  md:py-0 shadow-lg border-r border-gray-300">
        <h3 className="text-2xl font-bold mb-4 md:mt-5 text-gray-900">Salient Features</h3>

        <ul className=" flex gap-4 flex-col mb-4 text-md text-gray-800">
          {features.map((feature, index) => (
            <li key={index} className="bg-white  p-4 rounded-lg shadow-md">
              <h2 className="text-lg font-semibold text-gray-900">{feature.Heading}</h2>
              <ul className="list-disc list-inside text-gray-700 mt-2 space-y-1">
                {feature.subHeadings.map((sub, i) => (
                  <li key={i} className="text-sm">{sub}</li>
                ))}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section (Course Info) */}
      <div className="p-6 w-full flex flex-col gap-4 bg-white">
        <div>
          <h3 className="font-bold mb-4 text-3xl text-gray-900">{`${courseTitle} @ ${universityName}`}</h3>
          <p className="text-gray-700 leading-relaxed text-justify">{courseInfo}</p>
        </div>

        <Link href={"/contact"}>
          <Button className="w-full md:w-[40%] mt-5 py-3 text-lg bg-blue-600 hover:bg-blue-800 hover:scale-105 transition-all">
            Apply Now
          </Button>
        </Link>
      </div>
    </div>
  );
}

export default SalientFeaturesCard;
