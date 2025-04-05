import React from "react";
import { UseFormReturn } from "react-hook-form";
import TagInputComponent from "@/utils/TagInputComponent";
import * as z from "zod";
import { courseInfoSchema } from "@/schema/CourseinfoSchema";

interface CourseAdditionalInfoProps {
  form: UseFormReturn<z.infer<typeof courseInfoSchema>>;
  tags: string[];
  setTags: (tags: string[]) => void;
  specialization: string[];
  setSpecialization: (specialization: string[]) => void;
}

export default function CourseAdditionalInfo({
  tags,
  setTags,
  specialization,
  setSpecialization,
}: CourseAdditionalInfoProps) {
  return (
    <div className="space-y-4">
      <TagInputComponent
        label="Eligibility Criteria"
        state={tags}
        setState={setTags}
      />

      <TagInputComponent
        label="Specialization Offered*"
        state={specialization}
        setState={setSpecialization}
      />
    </div>
  );
} 