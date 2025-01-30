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

type universityInfo = {
  universityName: string;
  aboutUniversity: string;
  cutoffs: string,
  cloudinaryImageUrl?: string,
  cloudinaryImageName?: string
}
function AdminUniversityinfoFormComponent({ id }: any) {
  const { toast } = useToast();

  const [Loading, setIsLoading] = useState(false);
  const [universityData, setUniversityData] = useState<universityInfo | null>(null)
  const [imagename, setimagename] = useState("")
  const form = useForm<z.infer<typeof UniversityInfoSchema>>({
    resolver: zodResolver(UniversityInfoSchema),
  });

  useEffect(() => {
    async function fetchUniversityData() {
      const response = await axios.get(`/api/update-universitybyid?id=${id}`)
      if (response.data.success) {
        const parsedData = JSON.parse(response.data.message); // Parse the JSON string to a JS object
        
        setUniversityData(parsedData); // Set the parsed object in state
        setimagename(parsedData.cloudinaryImageName);
        form.reset(parsedData);  // setting the form field with its info (prefilling) 

      }
    }
    if (id) {
      fetchUniversityData();
    }
  }, []);

  async function onSubmit(data: z.infer<typeof UniversityInfoSchema>) {
    try {
      setIsLoading(true);
      const formData = new FormData();     // using formdata to send the files  like image in object format

      formData.append("universityName", data.universityName);
      formData.append("aboutUniversity", data.aboutUniversity);
      formData.append("cutoffs", data.cutoffs);
      formData.append("ageOfUniversity", data.ageOfUniversity.toString());
      formData.append("placementRatio", data.placementRatio.toString());
      formData.append("highestPackageOffered", data.highestPackageOffered.toString());
      formData.append("industryConnections", data.industryConnections.toString());
      if(data.image){
        formData.append("image", data.image);
      }

      // const formDataObj = Object.fromEntries(formData.entries());
      // console.log("obj",formDataObj);

      let response;
      if (id) {
        response = await axios.patch(`/api/update-universitybyid?id=${id}`, formData);  //updating

      } else {
        response = await axios.post("/api/post/universityinfo", formData);

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
        title: "error Occure",
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
            name="cutoffs"
            render={({ field }) => (
              <FormItem>
                <FormLabel>cutoff</FormLabel>
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
            name="ageOfUniversity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>University Age*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the University Age " type="number" 
                  
                  {...field} />
                </FormControl>
                <FormDescription>Age is the period of establishment of university till now in years </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="highestPackageOffered"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Highest Package*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Highest Package Offered " type="number" {...field} />
                </FormControl>
                <FormDescription> Package will be considered in LPA </FormDescription>

                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="industryConnections"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Industry Connections*</FormLabel>
                <FormControl>
                  <Input placeholder="Enter the Connections "  type="number" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />


          <FormField
            control={form.control}
            name="placementRatio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Placement Ratio Number*</FormLabel>
                <FormControl>
                <Input placeholder="Enter the Placement Ratio Age " type="number" {...field} />
                </FormControl>
                <FormDescription>Enter the max number It will be displayed as percentage </FormDescription>

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
                <FormDescription> {id ? `in use image :   ${imagename}` : ""}</FormDescription>
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
