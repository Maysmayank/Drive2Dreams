import React, { useState } from "react";
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
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { cloudinary } from "@/utils/cloudinary";
import axios from "axios";
import { revalidateCourseData } from "@/lib/action";
import handleUpload from "@/utils/uploadFormData";

function AdminUniversityinfoFormComponent() {
  const { toast } = useToast();

  const router = useRouter();
  const [Loading, setIsLoading] = useState(false);
  const form = useForm<z.infer<typeof UniversityInfoSchema>>({
    resolver: zodResolver(UniversityInfoSchema),
  });

  async function onSubmit(data: z.infer<typeof UniversityInfoSchema>) {
    try {
      setIsLoading(true);
      const formData = new FormData();

      formData.append("universityName", data.universityName);
      formData.append("aboutUniversity", data.aboutUniversity);
      formData.append("admissionProcess", data.admissionProcess);
      formData.append("cutoffs", data.cutoffs);
      formData.append("image", data.image);

      // const formDataObj = Object.fromEntries(formData.entries());
      // console.log("obj",formDataObj);
      // let response = await axios.post("/api/post/universityinfo", formData);


      let response =await handleUpload(formData);
      console.log(response);
      
      if (response.success) {

        revalidateCourseData();

        toast({
          title: "Success",
          variant: "constructive",
          description: response.message,
        });

      } else {

        toast({
          title: "Form Error",
          variant: "destructive",
          description: response.message,
        });
      }
    } catch (error: any) {
      toast({
        title: "error Occure",
        variant: "destructive",
        description: error.response.message,
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
            name="aboutUniversity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About university*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="About the university"
                    {...field}
                    rows={10} // Adjust the number of rows to display initially
                    style={{ width: "100%", resize: "vertical" }} // Full width and allow vertical resizing
                  />
                </FormControl>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="admissionProcess"
            render={({ field }) => (
              <FormItem>
                <FormLabel>admissionProcess*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Admission process of the university"
                    {...field}
                    rows={10} // Adjust the number of rows to display initially
                    style={{ width: "100%", resize: "vertical" }} // Full width and allow vertical resizing
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="cutoffs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>cutoff*</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Cutoffs"
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
            name="image"
            render={({ field: { value, onChange, ...fieldProps } }) => (
              <FormItem>
                <FormLabel>Image*</FormLabel>
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
                <FormDescription></FormDescription>
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

export default AdminUniversityinfoFormComponent;
