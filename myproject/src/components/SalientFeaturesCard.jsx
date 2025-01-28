import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

function SalientFeaturesCard({ features, universityName, courseTitle, courseInfo }) {
  return (
    <div className="flex flex-col-reverse md:flex-row gap-2  md:w-[90%] m-auto  overflow-hidden">
      {/* Left Section (40%) */}
      <div className="md:w-[40%] p-6 bg-[#fee08b] shadow-xl border-r">
        <h3 className="text-xl font-bold mb-4">Salient Features</h3>

        <ul className="list-inside flex flex-col gap-4 text-md list-disc">
          {Object.keys(features).map((category) => {
            return (
              <li key={category}>
                <strong className="">{category}</strong>
                <ul className="list-none flex flex-col gap-1 ml-4">
                  {features[category].map((item, index) => (
                    <li key={index} className=" text-sm before:content-['-'] before:mr-2">{item}</li>
                  ))}
                </ul>
              </li>
            );
          })}
        </ul>
      </div>

      <div className=" p-6 w-full flex flex-col gap-2 justify-around bg-white">

        <div>
          <h3 className=" font-bold mb-4 text-2xl text-wrap">{`${courseTitle} @ ${universityName}`}</h3>
          <p className="text-wrap text-justify break-words">
            {
              courseInfo
            }
          </p>
        </div>

        <Link href={'/contact'}>
          <Button className="flex w-[50%] mt-7 md:mt-0 md:w-[30%] rounded-none  bg-blue-500 hover:bg-blue-700 hover:scale-110 transition-all">Apply Now</Button>
        </Link>

      </div>

    </div>
  );
}

export default SalientFeaturesCard;
