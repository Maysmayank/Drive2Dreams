'use client';
import React, { useState } from 'react'
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

function AddCourseInfo() {
  const { toast } = useToast();


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

  async function onSubmit(data: z.infer<typeof courseInfoSchema>) {
    try {
      const response=await axios.post("/api/post/courseinfo",data)
      if(response.data?.success){
        await revalidateCourseData();

        toast({
          title:"Course Added SuccessFully",
        })
      }      
    } catch (error:any) {
      toast({
        title:"Error While saving Course Info try again later",
        description:error.response.data.message,
        variant:"destructive"
      })
    }
  }

  return (
    <div className='flex flex-col  w-full bg-gray-900  text-white p-10'>
      <h1 className='font-medium text-3xl mb-5'>Add Course Information</h1>
      <div className='form '>

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

            
            <Button className='bg-white text-black w-[70%] m-auto flex hover:bg-slate-300 ' type="submit">Submit</Button>
          </form>
        </Form>

      </div>
    </div>
  )
}

export default AddCourseInfo
