'use client';
import React, { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { formSchema } from '@/schema/formSchema'
import { Mail } from 'lucide-react';
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
import Loader2 from 'lucide-react'
import { useToast } from '@/components/ui/use-toast';
import axios from 'axios';
const contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast()
  // console.log(formSchema.shape.program.options);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      phone_number: "",
      program: "BBA"
    },
  })
  const programOptions = formSchema.shape.program.options;

  async function onSubmit(data: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // console.log(data);

      const response = await axios.post('/api/form', {
        username: data.username,
        email: data.email,
        phone_number: data.phone_number,
        program: data.program,
      })

      if (response.data.success) {
        setIsSubmitted(true);

        toast({
          title: "Response Submitted",
          description: "Your response has been successfully submitted!",
        });
      }
      else {
        toast({
          title: "Response not Submitted try again",
          variant: "destructive",
          description: response.data.message
        });
      }

    } catch (error: any) {
      toast({
        title: "Error while submitting try again",
        description: error?.response?.data?.message,
      });

    } finally {
      setIsSubmitting(false)

    }

  }

  return (
    <div className=" pt-[120px] ">
      <div className='flex gap-2 items-center flex-col md:flex-row justify-around md:items-center '>
        
        <div className='contact-info-container bg-white p-4 h-full'>
          <div className='pt-4 flex flex-col items-center gap-10 min-h-[250px] max-w-[620px]'>

            <span className='font-semibold text-7xl'>contact us</span> 
            
            <span className='text-center '>
            "Have questions, comments, or need expert advice? We're here to help! Whether you're seeking guidance, looking for more information, or just want to start a conversation, don’t hesitate to reach out. Fill out the form below, and our team will get back to you as soon as possible."
            </span>
          </div>

          <div className="border-t-2 border-gray-300 my-4"></div>

          <div className='socials flex items-center md:gap-2 flex-col ml-5 '>
            <span className='mt-3 flex items-center'>
              <span className='font-medium text-3xl mr-2'>EMAIL</span> 
              <Mail/>
            </span>
            <span>drive2dreams@gmail.com</span>
          </div>  

        </div>

        <div className='form-container p-4 bg-white min-w-[370px] md:min-w-[500px] min-h-[500px]'>
          <Form {...form}>
            <form  onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>FullName *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Fullname" {...field} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your Email" {...field} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="phone_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Phone Number *</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your phone number" {...field} />
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="program"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Program *</FormLabel>
                    <FormControl>
                      <select {...field} className=" w-full border p-2 rounded ">
                        <option value="" disabled>Select program</option>
                        {
                          programOptions.map((choice) => (
                            <option key={choice} value={choice}>{choice}</option>
                          ))
                        }
                      </select>
                    </FormControl>
                    <FormDescription>
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={isSubmitting} className='min-w-[400px] flex items-center m-auto'>
                {
                  isSubmitting ? (
                    <>
                      submitting..
                    </>
                  ) : ('Submit')
                }
              </Button>
            </form>
          </Form>

          {isSubmitted && (
            <div className="mt-4 text-green-500">
              Your response has been submitted!
            </div>
          )}
        </div>

      </div>



    </div>
  )
}

export default contact