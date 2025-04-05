import React from "react";
import { UseFormReturn } from "react-hook-form";
import {
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as z from "zod";
import { courseInfoSchema } from "@/schema/CourseinfoSchema";

interface CourseBasicInfoProps {
  form: UseFormReturn<z.infer<typeof courseInfoSchema>>;
  isEditMode: boolean;
}

export default function CourseBasicInfo({ form, isEditMode }: CourseBasicInfoProps) {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control}
        name="title"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Title*</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter the course name or title"
                {...field}
              />
            </FormControl>
            <FormDescription>
              For example: BBA, BCA, or undergraduate program in BCA
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="universityName"
        render={({ field }) => (
          <FormItem>
            <FormLabel>University*</FormLabel>
            <FormControl>
              <Input
                disabled={isEditMode}
                placeholder="Enter the university/college name"
                {...field}
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="courseInfo"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Information*</FormLabel>
            <FormControl>
              <Textarea
                placeholder="Enter all the information regarding the course"
                {...field}
                rows={10}
                className="w-full resize-vertical"
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
            <FormLabel>Admission Process*</FormLabel>
            <FormControl>
              <Input
                placeholder="Enter the admission process"
                {...field}
              />
            </FormControl>
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
              <Input 
                placeholder="Enter the course duration" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="affilitatedWith"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Affiliation</FormLabel>
            <FormControl>
              <Input 
                placeholder="Enter the affiliation" 
                {...field} 
              />
            </FormControl>
            <FormDescription>For example: AKTU, IPU, etc.</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="courseRating"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course Rating*</FormLabel>
            <FormControl>
              <Input 
                type="number"
                step="0.1"
                min={0}
                max={5}
                placeholder="Enter the course rating (e.g., 4.5)" 
                {...field} 
              />
            </FormControl>
            <FormDescription>Maximum rating should be 5 (supports decimal values like 4.5)</FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
} 