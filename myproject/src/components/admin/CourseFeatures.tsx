import React from "react";
import AddFeatureForm from "./AddFeatureForm";
import { Dispatch, SetStateAction } from "react";

interface FormField {
  Heading: string;
  subHeadings: string[];
}

interface CourseFeaturesProps {
  formValues: FormField[];
  setFormValues: Dispatch<SetStateAction<FormField[]>>;
}

export default function CourseFeatures({
  formValues,
  setFormValues,
}: CourseFeaturesProps) {
  return (
    <div className="space-y-4">
      <AddFeatureForm 
        formValues={formValues} 
        setFormValues={setFormValues}
      />
    </div>
  );
} 