'use client';
import React, { useState, Dispatch, SetStateAction } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from 'zod'
import { formSchema } from '@/schema/formSchema'
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
import clsx from 'clsx';
import { usePathname } from 'next/navigation';
interface FormComponentProps {
    classname?: string;
    onClose?: () => void; // Accept the function as a prop
    setBlackoutScreen?:(blackoutScreen:boolean)=>void;
    completeForm?:boolean;
    setCompleteForm?:Dispatch<SetStateAction<boolean>>;
  }
export default function FormComponent({ classname,onClose,setBlackoutScreen,completeForm,setCompleteForm}:FormComponentProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSubmitted, setIsSubmitted] = useState(false);
    const { toast } = useToast()
    const pathname = usePathname()
    // console.log(formSchema.shape.program.options);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            username: "",
            email: "",
            phone_number: "",
            program: "",
        },
    })

    async function onSubmit(data: z.infer<typeof formSchema>) {
        setIsSubmitting(true)

        if(setBlackoutScreen){
            setBlackoutScreen(true)
        }
        try {
            // console.log(data);
          
            
            
            const response = await axios.post('/api/form', {
                username: data.username,
                email: data.email,
                phone_number: data.phone_number,
                program: data.program,
                timeStamp: new Date().toISOString().split('T')[0], // YYYY-MM-DD format

            })

            if (response.data.success) {
                setIsSubmitted(true);
                if(completeForm){
                    setCompleteForm?.(true);
                    // Only set form_submitted when submit button is clicked and form is successful
                    if (isSubmitting) {
                        localStorage.setItem("form_submitted", "true");
                    }
                }

                await axios.post('/api/post/update-submitcount') // update the submission count by 1 and is showed to admin in dashboard
                toast({
                    title: "Response Submitted",
                    description: "Your response has been successfully submited!",
                });
                
                if(onClose){

                    onClose()
                }
            }
            else {
                toast({

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
            if(setBlackoutScreen) setBlackoutScreen(false)

        }

    }

    return (

        <div className={clsx("form-container p-4 flex flex-grow flex-col h-full w-full", classname)}>
            <p className="mb-4">
              This Privacy Policy explains how Drive2Dreams collects, uses, stores, and protects your personal data when you visit or use our website: www.drive2dreams.com.
            </p>
            <p className="mb-4">
              www.drive2dreams.com is operated by Drive2Dreams, based in India. We are responsible for handling your personal data securely and act as the &quot;Data Fiduciary&quot; under India’s Digital Personal Data Protection (DPDP) Act, 2023.
            </p>
            <p className="mb-4">
              By accessing and using www.drive2dreams.com (referred to as &quot;the Website&quot;), you agree to the following terms and conditions. If you do not agree to these terms, you must not use the Website or its services.
            </p>
            <p className="mb-4">
              Drive2Dreams provides career guidance, admission assistance, and other services related to students&apos; academic and professional goals. By using our services, you agree to comply with these Terms and Conditions.
            </p>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Full Name </FormLabel>
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
                                <FormLabel>Email </FormLabel>
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
                                <FormLabel>Phone Number </FormLabel>
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
                                <FormLabel>Program to be enrolled</FormLabel>
                                <FormControl>
                                <Input placeholder="Enter the name of the program " {...field} />
                                </FormControl>
                                <FormDescription>
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" disabled={isSubmitting} className='min-w-full bg-[#4e4feb] flex items-center m-auto'>
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
    )

}