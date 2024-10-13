'use client';
import React, { Suspense, useEffect, useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'

import { Textarea } from "@/components/ui/textarea"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
import { courseInfoSchema } from '@/schema/CourseinfoSchema';
import { revalidateCourseData } from '@/lib/action';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';

type CourseData = {
  university: string;
  title: string;
  courseInfo: string;
  courseContent?: string[];
  duration?: string;
  syllabus?: string;
};
function AdminCourseinfoFormComponent({id}:any) {    // got id  from EDitCourseInfoModal   
    // this form create and update course info  
    const [courseData, setCourseData] = useState<CourseData | null>(null); // the state will be in object
    // if there is courseData then we fetch it using useffect then conditionally handle the sent requests 
  
    const { toast } = useToast();

    const router =useRouter()
    const[Loading,setIsLoading]=useState(false)
    
    const form = useForm<z.infer<typeof courseInfoSchema>>({
      resolver: zodResolver(courseInfoSchema),
      defaultValues: {
        university: "",
        title: "",
        duration: "",
        courseInfo: "",
        courseContent: [],
        syllabus: "",
        courseOverview:""
      },
  
    })

    useEffect(() => {
      async function FetchCourseData() {
        try {
          const response = await axios.get(`/api/update-coursebyid?id=${id}`);        
          const parsedData = JSON.parse(response.data.message);  // Parse the JSON string to a JS object
          setCourseData(parsedData);  // Set the parsed object in state
          form.reset(parsedData); // **Reset the form with fetched data**
          
        } catch (error) {
          console.error('Error fetching course data:', error);
        }
      }
      if(id){
        FetchCourseData();
  
      }
    }, [id,form]);


    async function onSubmit(data: z.infer<typeof courseInfoSchema>) {
        try {
          setIsLoading(true)
          let response;
          if(courseData){
            response= await axios.patch(`/api/update-coursebyid?id=${id}`,data) // updating 
          }else{
            response=await axios.post("/api/post/courseinfo",data)
          }


          if(response?.data?.success){
            await revalidateCourseData();
            router.refresh();
            toast({
              title:courseData?"Updated Course Information Successfully!!":"Added Course Successfully",
              variant:"constructive"
            })
          }else{
            toast({
              title:"Course with this Title Already Exists!!",
              description:response?.data.message,
              variant:'destructive'
            })
          }      
        } catch (error:any) {
          
          toast({
            title:"Error While saving Course Info try again later",
            description:error.response.data.message,
            variant:"destructive"
          })
        
        }finally{
          setIsLoading(false)
        }
      }

  return (
    <div className='form h-full'>
        {/* {id} */}
        
        {courseData?<p className='text-black'>Updating....</p>:<p className='text-white'>Status : Adding Course</p>}
        <Form  {...form}>
          <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the course name or title " {...field} />
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
              name="university"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>University*</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter the university/ college name" {...field} />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="courseOverview"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>CourseOverview</FormLabel>
                  <FormControl>
                    <Input placeholder="Give the Course OverView" {...field} />
                  </FormControl>
                  <FormDescription>
                    provide overview of the course in brief as it helps in seo. Do nott exceed more than 15 lines 
                  </FormDescription>
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
                  style={{ width: '100%', resize: 'vertical' }} // Full width and allow vertical resizing
                  />
                  </FormControl>
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="courseContent"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>courseContent</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="Enter all the course Modules or roadmap just topics(optional) " {...field} />
                  </FormControl>
                  <FormDescription className='text-red-600'>
                  It is is not supported yet
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="syllabus"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Syllabus</FormLabel>
                  <FormControl>
                    <Input disabled placeholder="Enter the syllabus in pdf (optional)" {...field} />
                  </FormControl>
                  <FormDescription className='text-red-600'>
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
                  <FormDescription>
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {
              Loading?(<Loader2 className=' m-auto  animate-spin'></Loader2>):(
                <Button className='bg-white text-black w-[70%] m-auto flex hover:bg-slate-300 ' type="submit">Submit</Button>
              )
            }
          
          </form>
        </Form>

      </div>
  )
}

export default AdminCourseinfoFormComponent
