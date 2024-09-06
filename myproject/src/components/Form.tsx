'use client';
import React, { useState } from 'react'
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

export default function FormComponent() {
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
                await axios.post('/api/post/update-submitcount') // update the submission count by 1 and is showed to admin in dashboard
                toast({
                    title: "Response Submitted",
                    description: "Your response has been successfully submitted!",
                });
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

        }

    }

    return (

        <div className='form-container p-4 bg-bla min-w-full md:min-w-[500px] min-h-[500px]'>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>FullName </FormLabel>
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

                    <Button type="submit" disabled={isSubmitting} className='min-w-full flex items-center m-auto'>
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