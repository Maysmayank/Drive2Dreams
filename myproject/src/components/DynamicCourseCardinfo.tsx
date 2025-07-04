"use client";
import React, { useEffect, useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import FormComponent from "./Form";
import {
  Briefcase,
  Package,
  Users,
  Award,
  Plus,
  PercentIcon,
  GraduationCap,
  X,
} from "lucide-react";
import CountUp from "react-countup";
import { PlacedStudents } from "@/components/PlacedStudents";
import SalientFeaturesCard from "@/components/SalientFeaturesCard";
import { Button } from "./ui/button";
import { PlacedStudent } from "@/models/PlacedStudents";

import { toast } from "./ui/use-toast";
import { useSession } from "next-auth/react";

type DynamicCourseCardinfoProps = {
  title: string;
  courseInfo: string;
  videoUrl: string;
  specializationOffered: string[];
  eligibilityCriteria: string[];
  image: string | undefined;
  Ebook?: string;
  aboutUniversity: string;
  universityName: string;
  Brochure?: string;
  admissionProcess: string;
  ageOfUniversity?: number;
  industryConnections: number;
  highestPackageOffered: number;
  placementRatio: number;
  placedStudentData: PlacedStudent[];
  features: {
    heading: string;
    subheadings: string[];
  }[];
};

export default function DynamicCourseCardinfo({
  courseInfo,
  eligibilityCriteria,
  Ebook,
  admissionProcess,
  aboutUniversity,
  title,
  specializationOffered,
  Brochure,
  videoUrl,
  universityName,
  image,
  ageOfUniversity,
  highestPackageOffered,
  industryConnections,
  placementRatio,
  features,
  placedStudentData,
}: DynamicCourseCardinfoProps) {
  const [showPopUpForm, setShowPopUpForm] = useState(false);
  const [completeForm, setCompleteForm] = useState(false);
  const [downloadedUrl, setDownloadedUrl] = useState("");



  function downlaodBrochureAction(downloadUrl: string) {
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.setAttribute("download", "brochure.pdf");
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    return true;
  }

  useEffect(() => {
    if (completeForm && Brochure) {
      try {
        const isDownloaded = downlaodBrochureAction(Brochure);

        if (isDownloaded) {
          localStorage.setItem("form_submitted", "true");
          setShowPopUpForm(false);
          setCompleteForm(false);

          toast({
            title: "Download successful",
            description: "Please check your downloads",
            variant: "constructive",
          });
        } else {
          toast({
            title: "Download failed",
            description: "Please try again",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Download failed:", error);
      }
    }
  }, [completeForm, Brochure]);

  const handleBrochureDownload = () => {
    const formSubmitted = localStorage.getItem("form_submitted");
    console.log(formSubmitted);

    if (!formSubmitted) {
      setShowPopUpForm(true);
      return;
    }

    if (Brochure) {
      downlaodBrochureAction(Brochure);
    }
  };

  return (
    <div className="md:pt-[85px] min-h-[100vh] relative">
      {showPopUpForm && (
        <PopUpForm
          setCompleteForm={setCompleteForm}
          setShowPopUpForm={setShowPopUpForm}
        />
      )}
      <ProofWidget
        ageOfUniversity={ageOfUniversity ?? 0}
        highestPackageOffered={highestPackageOffered}
        placementRatio={placementRatio}
        industryConnections={industryConnections}
      />

      <div
        className="flex my-4 md:my-0 flex-col-reverse gap-10 md:flex-row md:max-w-[85%] m-auto md:mt-10 justify-between"
        style={{
          boxShadow:
            " rgba(0, 0, 0, 0.15) 10px 5px 30px, rgba(0, 0, 0, 0.23) 0px 6px 6px",
        }}
      >
        <div className="left-container ml-8 pb-5 flex flex-col gap-5">
          <div className="flex items-center md:pt-8 gap-3">
            <GraduationCap size={35} />
            <h2 className="font-semibold text-2xl">Specialization Offered</h2>
          </div>

          <ul className="list-disc list-inside flex flex-col gap-1 md:px-4">
            {specializationOffered.map((item, index) => (
              <li key={index} className="text-left break-words">
                {item}
              </li>
            ))}
          </ul>

          {
            Brochure && (
              <Button
                className="bg-blue-500 w-[40%] text-center hover:bg-blue-700 ml-4 md:ml-8 mt-7 md:mb-5 mb-10"
                onClick={handleBrochureDownload}
              >
                Get Brochure
              </Button>
            )
          }
        </div>

        <div className="right-container md:mr-20 flex flex-col justify-center m-auto max-h-[240px] md:max-h-[420px]">
          <video controls width={550} height={500} muted autoPlay loop>
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      </div>

      <section className="my-12 md:my-20 md:py-10">
        <SalientFeaturesCard
          features={features}
          courseInfo={courseInfo}
          universityName={universityName}
          courseTitle={title}
        />
      </section>

      <div className="m-auto w-[90%] flex flex-col gap-4 md:gap-8">
        <div className="w-full m-auto md:my-5 flex flex-col md:flex-row justify-between items-center gap-5">
          <div className="md:w-[80%] p-2">
            <h1 className="mb-5 text-3xl font-semibold">
              {`Why ${universityName}?`}
            </h1>
            <p className="text-justify">{aboutUniversity}</p>
          </div>

          <div
            className="right-container hidden md:block h-[200px] md:h-[280px] hover:scale-105 transition-all"
            style={{
              boxShadow:
                "rgba(0, 0, 0, 0.1) 0px 20px 25px -5px, rgba(0, 0, 0, 0.04) 0px 10px 10px -5px",
            }}
          >
            <Image
              src={image || ""}
              alt="image"
              layout="contain"
              height={500}
              width={700}
              className="object-fill h-full rounded-md"
            />
          </div>
        </div>

        <div className="w-full structure-container my-10">
          <div className="flex flex-col gap-3 mb-5">
            <h1 className="mb-2 md:mb-5 text-3xl font-semibold">
              Admission Process
            </h1>
            <p className="text-justify">{admissionProcess}</p>
          </div>
        </div>

        <div className="w-full">
          <h1 className="mb-5 font-semibold text-3xl">Eligibility Criteria</h1>
          <div className="eligibility-info">
            {eligibilityCriteria.length === 0 ? (
              "No eligibility criteria"
            ) : (
              <ul className="pl-4 md:pl-5 flex flex-col gap-2 list-disc">
                {eligibilityCriteria.map((item, i) => (
                  <li key={i} className="break-words">
                    {item}
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>

        {placedStudentData.length !== 0 && (
          <PlacedStudents placedStudentData={placedStudentData} />
        )}

        <h1 className="text-3xl mt-10 m-auto font-semibold md:text-5xl">
          Talk To Our Expert
        </h1>

        <div className="mt-8 md:mt-5 mb-10 rounded-md grid grid-cols-1 md:grid-cols-2 gap-10">
          <div className="flex relative items-center md:flex-col justify-center">
            <Image
              src={"/expert.gif"}
              unoptimized
              className="w-full h-full"
              width={200}
              height={200}
              alt="expert"
            />
          </div>
          <strong className="md:hidden text-xl text-slate-600 m-auto">
            Fill Out the Form
          </strong>
          <FormComponent />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  value,
  label,
  color,
}: {
  icon: any;
  value: number;
  label: string;
  color: string;
}) {
  return (
    <div className="flex flex-col gap-2 items-center p-4 bg-white rounded-xl hover:scale-105 transition-all shadow-md">
      <Icon className={`w-8 h-8 ${color}`} />
      <div className="flex items-center justify-center">
        <CountUp
          delay={0.1}
          className="text-3xl inline font-semibold"
          duration={5}
          start={0}
          end={value}
        />
        {label === "Years in Industry" || label === "Industry Connections" ? (
          <Plus />
        ) : (
          ""
        )}
        {label === "Placement Ratio" ? <PercentIcon /> : ""}
        {label === "Highest Package" ? (
          <span className="font-semibold text-xl ml-2">LPA</span>
        ) : (
          ""
        )}
      </div>
      <span className="text-gray-600 text-md font-medium">{label}</span>
    </div>
  );
}

export function ProofWidget({
  ageOfUniversity,
  highestPackageOffered,
  industryConnections,
  placementRatio,
}: {
  ageOfUniversity: number;
  highestPackageOffered: number;
  industryConnections: number;
  placementRatio: number;
}) {
  return (
    <div className="md:w-[85%] mx-auto p-6 rounded-2xl">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
        <StatCard
          icon={Briefcase}
          value={ageOfUniversity}
          label="Years in Industry"
          color="text-blue-500"
        />
        <StatCard
          icon={Package}
          value={highestPackageOffered}
          label="Highest Package"
          color="text-green-500"
        />
        <StatCard
          icon={Users}
          value={industryConnections}
          label="Industry Connections"
          color="text-purple-500"
        />
        <StatCard
          icon={Award}
          value={placementRatio}
          label="Placement Ratio"
          color="text-orange-500"
        />
      </div>
    </div>
  );
}

export function PopUpForm({
  setCompleteForm,
  setShowPopUpForm,
}: {
  setCompleteForm: Dispatch<SetStateAction<boolean>>;
  setShowPopUpForm: Dispatch<SetStateAction<boolean>>;
}) {
  return (
    <div className="fixed top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white rounded-md relative flex w-[90%] md:w-[60%]">
        <X className="absolute top-5 right-4" onClick={() => setShowPopUpForm(false)}   />
        
        <div className="w-full md:w-1/2 p-4 items-center justify-center flex flex-col  bg-[#1c1c39] text-white">
          <h1 className="font-bold mt-4 text-2xl">Let&apos;s Talk</h1>
          <span className="text-sm">Explore Colleges with us</span>
          <FormComponent completeForm={true} setCompleteForm={setCompleteForm} />
        </div>
        <div className="hidden md:block w-1/2">
          <Image
            src={'/contactform.jpg'}
            className="object-cover w-full h-full rounded-r-md"
            height={600}
            width={400}
            alt="Contact Form"
          />
        </div>
      </div>
    </div>
  );
}

export function EbookDownload({ Ebook }: { Ebook: string }) {
  const [showPopUpForm, setShowPopUpForm] = useState(false);
  const [completeForm, setCompleteForm] = useState(false);

  const downloadEbookAction = (downloadUrl: string) => {
    const anchor = document.createElement("a");
    anchor.href = downloadUrl;
    anchor.setAttribute("download", "ebook.pdf");
    document.body.appendChild(anchor);
    anchor.click();
    document.body.removeChild(anchor);
    return true;
  };

  useEffect(() => {
    if (completeForm && Ebook) {
      try {
        const isDownloaded = downloadEbookAction(Ebook);

        if (isDownloaded) {
          localStorage.setItem("form_submitted", "true");
          setShowPopUpForm(false);
          setCompleteForm(false);

          toast({
            title: "Download successful",
            description: "Please check your downloads",
            variant: "constructive",
          });
        } else {
          toast({
            title: "Download failed",
            description: "Please try again",
            variant: "destructive",
          });
        }
      } catch (error) {
        console.error("Download failed:", error);
      }
    }
  }, [completeForm, Ebook]);

  const handleEbookDownload = () => {
    const formSubmitted = localStorage.getItem("form_submitted");

    if (!formSubmitted) {
      setShowPopUpForm(true);
      return;
    }

    if (Ebook) {
      downloadEbookAction(Ebook);
    }
  };

  return (
    <>
      {showPopUpForm && (
        <div className=" top-0 left-0 z-50 w-full h-full bg-black bg-opacity-50 flex justify-center items-center">
          <PopUpForm
            setCompleteForm={setCompleteForm}
            setShowPopUpForm={setShowPopUpForm}
          />
        </div>
      )}
      <button
        onClick={handleEbookDownload}
        className="px-8 absolute translate-y-[620%] text-sm translate-x-[10%] md:translate-y-[720%] md:translate-x-[18%] py-1 md:py-2 rounded-md mt-5 md:mt-10  bg-purple-600 md:bg-purple-700 text-center text-white font-bold transition duration-200 border-2 border-transparent hover:scale-105"
      >
        Download Ebook
      </button>
    </>
  );
}
