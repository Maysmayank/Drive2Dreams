"use client";
import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { courseInfoSchema } from "@/schema/CourseinfoSchema";
import { useCourseForm } from "@/hooks/useCourseForm";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import CourseBasicInfo from "../../components/admin/CourseBasicInfo";
import CourseAdditionalInfo from "../../components/admin/CourseAdditionalInfo";

import CourseMediaUploads from "../../components/admin/CourseMediaUploads";
import CourseFeatures from "../../components/admin/CourseFeatures";

interface AdminCourseinfoFormProps {
  id?: string;
}

export default function AdminCourseinfoFormComponent({ id }: AdminCourseinfoFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const form = useForm<z.infer<typeof courseInfoSchema>>({
    resolver: zodResolver(courseInfoSchema),
  });

  const {
    courseData,
    isLoading,
    tags,
    setTags,
    specialization,
    setSpecialization,
    videoUrl,
    setVideoUrl,
    brochureUrl,
    setBrochureUrl,
    ebookUrl,
    setEbookUrl,
    setCategory,category,
    formValues,
    setFormValues,
    onSubmit
  } = useCourseForm(id, form, toast, router);

  return (
    <div className="form h-full">
      <p className={courseData ? "text-black" : "text-white"}>
        Status: {courseData ? "Updating Course" : "Adding Course"}
      </p>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <CourseBasicInfo form={form} isEditMode={!!id} />
          <div className="flex gap-4">
          <h2>Category</h2>

          <select name="category" id="category" className="text-black px-4 " value={category} onChange={(e:any)=>setCategory(e.target.value)} >
            <option value="graduation">Graduation</option>
            <option value="masters">Masters</option>
          </select>

<span>the courses will show in {category} section</span>          </div>
          <CourseAdditionalInfo 
            form={form}
            tags={tags}
            setTags={setTags}
            specialization={specialization}
            setSpecialization={setSpecialization}
          />

          <CourseFeatures 
            formValues={formValues}
            setFormValues={setFormValues}
          />

          <CourseMediaUploads
            videoUrl={videoUrl}
            setVideoUrl={setVideoUrl}
            brochureUrl={brochureUrl}
            setBrochureUrl={setBrochureUrl}
            ebookUrl={ebookUrl}
            setEbookUrl={setEbookUrl}
          />

          {isLoading ? (
            <Loader2 className="m-auto animate-spin" />
          ) : (
            <Button
              className="bg-white text-black w-[70%] m-auto flex hover:bg-slate-300"
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

