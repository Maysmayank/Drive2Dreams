"use client";
import React, { Suspense, useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";
import CloudinaryUploader from '@/components/CloudinaryUploader'
import { Button } from "@/components/ui/button";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import axios from "axios";
import { courseInfoSchema } from "@/schema/CourseinfoSchema";
import { revalidateCourseData } from "@/lib/action";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import TagInputComponent from "@/utils/TagInputComponent";
import { useFormState } from "react-dom";

type CourseData = {
  university: string;
  title: string;
  courseInfo: string;
  admissionProcess?: string;
  duration?: string;
  Brochure?: string;
};

interface Payload {
  [key: string]: any; // Other properties in 'data'
  specializationOffered: string[];
  eligibilityCriteria: string[]; // Specify eligibilityCriteria as an array of strings
  videoUrl: string;
}

function AdminCourseinfoFormComponent({ id }: any) {
  // got id  from EDitCourseInfoModal
  // this form create and update course info
  const [courseData, setCourseData] = useState<CourseData | null>(null); // the state will be in object
  // if there is courseData then we fetch it using useffect then conditionally handle the sent requests


  const [tags, settags] = useState<string[]>([]);
  const [specialization, setSpecialization] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>('')
  const { toast } = useToast();
  const router = useRouter();
  const [Loading, setIsLoading] = useState(false);


  const form = useForm<z.infer<typeof courseInfoSchema>>({
    resolver: zodResolver(courseInfoSchema),
  });

  useEffect(() => {
    async function FetchCourseData() {
      try {
        const response = await axios.get(`/api/update-coursebyid?id=${id}`);
        const parsedData = JSON.parse(response.data.message); // Parse the JSON string to a JS object
        setCourseData(parsedData); // Set the parsed object in state
        // console.log(parsedData);

        form.reset(parsedData);  // setting the form field with its info (prefilling) 

        settags(parsedData.eligibilityCriteria || []); // Set tags to eligibilityCriteria
        setSpecialization(parsedData.specializationOffered || []) // set the specialization 
        setVideoUrl(parsedData.videoUrl)

      } catch (error) {
        console.error("Error fetching course data:", error);
      }
    }
    if (id) {    //if edit id is present then fetch data from api
      FetchCourseData();
    }
  }, [id, form]);


  function createPayload(data: z.infer<typeof courseInfoSchema>) {
    let payload: Payload = {
      ...data,
      specializationOffered: [],
      eligibilityCriteria: [],
      videoUrl, // Include videoUrl here
    };


    if (tags.length !== 0) {
      tags.forEach((tag: string) => {
        payload.eligibilityCriteria.push(tag); // Push each tag into the array
      });
    }

    if (specialization.length !== 0) {
      specialization.forEach((item: string) => {
        payload.specializationOffered.push(item);
      })
    }

    return payload;

  }



  async function onSubmit(data: z.infer<typeof courseInfoSchema>) {

    try {

      let payloadedData = createPayload(data);
      console.log(payloadedData);

      setIsLoading(true);

      let response;

      if (id) {

        response = await axios.patch(`/api/update-coursebyid?id=${id}`, payloadedData); // updating
      } else {

        response = await axios.post("/api/post/courseinfo", payloadedData)
      }

      if (response?.data?.success) {
        await revalidateCourseData();
        router.refresh();
        toast({
          title: courseData
            ? "Updated Course Information Successfully!!"
            : "Added Course Successfully",
          variant: "constructive",
        });
      } else {
        toast({
          description: response?.data.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error While saving Course Info try again later",
        description: error.response.data.message,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="form h-full">
      {/* {id} */}

      {courseData ? (
        <p className="text-black">Updating....</p>
      ) : (
        <p className="text-white">Status : Adding Course</p>
      )}

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the course name or title "
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  for Ex: BBA or BCA or undergrad programmme in BCA..
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="universityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University*</FormLabel>
                <FormControl>
                  <Input
                    disabled={!!id}
                    placeholder="Enter the university/ college name"
                    {...field}
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="courseInfo"
            render={({ field }) => (
              <FormItem>
                <FormLabel>courseInfo*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter all the information regarding course"
                    {...field}
                    rows={10} // Adjust the number of rows to display initially
                    style={{ width: "100%", resize: "vertical" }} // Full width and allow vertical resizing
                  />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="admissionProcess"
            render={({ field }) => (
              <FormItem>
                <FormLabel>AdmissionProcess*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the admission process  "
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="Brochure"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Brochure</FormLabel>
                <FormControl>
                  <Input
                    disabled
                    placeholder="Enter the Brochure in pdf (optional)"
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-red-600">
                  It is is not supported yet
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Duration</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Course Duration" {...field} />
                </FormControl>
                <FormDescription></FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          
<FormField
            control={form.control}
            name="affilitatedWith"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Affiliation</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Affilation" {...field} />
                </FormControl>
                <FormDescription>Ex: AKTU,IPU etc</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="courseRating"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Course Rating*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Course rating" max={5}  {...field} />
                </FormControl>
                <FormDescription>Maximum Rating should be 5</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <TagInputComponent
            label={"EligibilityCriteria"}
            state={tags}
            setState={settags}
          />

          <TagInputComponent
            label={"Specialization Offered*"}
            state={specialization}
            setState={setSpecialization}
          />


          <CloudinaryUploader setVideoUrl={setVideoUrl} videoUrl={videoUrl} />
          {Loading ? (
            <Loader2 className=" m-auto  animate-spin"></Loader2>
          ) : (
            <Button
              className="bg-white text-black w-[70%] m-auto flex hover:bg-slate-300 "
              type="submit"
            >
              Submit
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
}


export default AdminCourseinfoFormComponent;

