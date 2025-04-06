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
            program: "PGDM",
        },
    })
    const programOptions = formSchema.shape.program.options;

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
                                <FormLabel>Program </FormLabel>
                                <FormControl>
                                    <select {...field}
                                        className={`w-full border p-2 rounded ${pathname === '/' ? 'changeColor-popup' : ''}`}>
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