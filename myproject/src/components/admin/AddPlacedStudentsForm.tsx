import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Textarea } from "@/components/ui/textarea";

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
import { UniversityInfoSchema } from "@/schema/UniversityinfoSchema";
import { Loader2 } from "lucide-react";
import axios from "axios";
import { revalidateCourseData } from "@/lib/action";
import { PlacedStudentsType } from "../../../ModelTypes/ModelTypes"
import { PlacedStudentSchema } from "@/schema/PlacedStudentSchema";


function AddPlacedStudents({ id }: any) {
  const { toast } = useToast();

  const [Loading, setIsLoading] = useState(false);
  const [placedStudents, setPlacedStudents] = useState(null)
  const [studentImage, setStudentImage] = useState("")
  const [companyImage, setCompanyImage] = useState("")

  const form = useForm<z.infer<typeof PlacedStudentSchema>>({
    resolver: zodResolver(PlacedStudentSchema),
  });

  console.log(id);
  
    useEffect(()=>{
      async function fetchPlacedStudentData() {
        const response=await axios.get(`/api/get-placedStudents?id=${id}`)
        console.log(response);
        
        if(response.data.success){
          const data = response.data.placedStudentsData; // Parse the JSON string to a JS object
          
          setPlacedStudents(data[0]); // Set the parsed object in state
          setStudentImage(data[0].cloudinaryStudentImageName);
          setCompanyImage(data[0].cloudinaryCompanyImageName)
          form.reset(data[0]);  // setting the form field with its info (prefilling) 
        }
      }
      if(id){
        fetchPlacedStudentData();
      }
  },[]);

  console.log(placedStudents);
  

  async function onSubmit(data: z.infer<typeof PlacedStudentSchema>) {
    try {
      setIsLoading(true);
      const formData = new FormData();     // using formdata to send the files  like image in object format
          
      formData.append("universityName", data.universityName);
      formData.append("studentName", data.studentName);
      formData.append("companyName", data.companyName);
      formData.append("studentImage", data.studentImage);
      formData.append("companyImage", data.companyImage);
      
      // const formDataObj = Object.fromEntries(formData.entries());
      // console.log("obj", formDataObj);

      let response;
      if (id) {
        console.log(formData);
        
        response = await axios.patch(`/api/update-placedStudent?studentId=${id}`, formData);  //updating

      } else {
        response = await axios.post("/api/post/addPlacedStudents", formData);

      }

      if (response.data.success) {

        revalidateCourseData();  // reflecting changes to the paths

        toast({
          title: "Success",
          variant: "constructive",
          description: response.data.message,
        });

      } else {

        toast({
          title: "Form Error",
          variant: "destructive",
          description: response.data.message,
        });
      }
    } catch (error: any) {
      
      toast({
        title: `error Occured${error}`,
        variant: "destructive",
        description: error.response.data.message,
      });

    } finally {

      setIsLoading(false);

    }
  }

  return (
    <div className="form h-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          
        <FormField
            control={form.control}
            name="universityName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the University Name " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="studentName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Student Name*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Student Name " {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name*</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter the Company Name"
                    {...field}
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />




          <FormField
            control={form.control}
            name="studentImage"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Student Image*</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    name="image"
                    type="file"
                    id="image"
                    accept="image/*, application/pdf"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />

                </FormControl>
                <FormDescription> {id ? `in use Student image :   ${studentImage}` : ""}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="companyImage"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Company Image*</FormLabel>
                <FormControl>
                  <Input
                    {...fieldProps}
                    name="image"
                    type="file"
                    id="image"
                    accept="image/*, application/pdf"
                    onChange={(event) =>
                      onChange(event.target.files && event.target.files[0])
                    }
                  />

                </FormControl>
                <FormDescription> {id ? `in use Company Logo image :   ${companyImage}` : ""}</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

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

export default AddPlacedStudents;
