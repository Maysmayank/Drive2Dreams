import { useState, useEffect } from "react";
import { UseFormReturn } from "react-hook-form";
import { useToast } from "@/components/ui/use-toast";
import { useRouter } from "next/navigation";
import axios from "axios";
import { revalidateCourseData } from "@/lib/action";
import * as z from "zod";
import { courseInfoSchema } from "@/schema/CourseinfoSchema";

interface FormField {
  Heading: string;
  subHeadings: string[];
}

interface CourseData {
  university: string;
  title: string;
  courseInfo: string;
  admissionProcess?: string;
  duration?: string;
  Brochure?: string;
}

interface Payload {
  [key: string]: any;
  specializationOffered: string[];
  eligibilityCriteria: string[];
  videoUrl: string;
  brochureUrl: string;
  Ebook: string;
  feature: FormField[];
}

export const useCourseForm = (
  id: string | undefined,
  form: UseFormReturn<z.infer<typeof courseInfoSchema>>,
  toast: ReturnType<typeof useToast>['toast'],
  router: ReturnType<typeof useRouter>
) => {
  const [courseData, setCourseData] = useState<CourseData | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [specialization, setSpecialization] = useState<string[]>([]);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [brochureUrl, setBrochureUrl] = useState<string>("");
  const [ebookUrl, setEbookUrl] = useState<string>("");
  const [formValues, setFormValues] = useState<FormField[]>([{ Heading: "", subHeadings: [""] }]);

  useEffect(() => {
    async function fetchCourseData() {
      if (!id) return;

      try {
        const response = await axios.get(`/api/update-coursebyid?id=${id}`);
        const parsedData = JSON.parse(response.data.message);
        
        setCourseData(parsedData);
        form.reset(parsedData);
        setTags(parsedData.eligibilityCriteria || []);
        setSpecialization(parsedData.specializationOffered || []);
        setVideoUrl(parsedData.videoUrl || "");
        setEbookUrl(parsedData.Ebook || "");
        setBrochureUrl(parsedData.Brochure || "");
        setFormValues(parsedData.features || [{ Heading: "", subHeadings: [""] }]);
      } catch (error) {
        console.error("Error fetching course data:", error);
        toast({
          title: "Error",
          description: "Failed to fetch course data",
          variant: "destructive",
        });
      }
    }

    fetchCourseData();
  }, [id, form, toast]);

  const createPayload = (data: z.infer<typeof courseInfoSchema>): Payload => {
    const payload: Payload = {
      ...data,
      specializationOffered: [],
      eligibilityCriteria: [],
      videoUrl,
      brochureUrl,
      Ebook: ebookUrl,
      feature: [],
    };

    if (tags.length > 0) {
      payload.eligibilityCriteria = [...tags];
    }

    if (specialization.length > 0) {
      payload.specializationOffered = [...specialization];
    }

    if (formValues.length > 0) {
      payload.feature = formValues.map(item => ({
        Heading: item.Heading,
        subHeadings: item.subHeadings,
      }));
    }

    return payload;
  };

  const onSubmit = async (data: z.infer<typeof courseInfoSchema>) => {
    try {
      setIsLoading(true);
      const payload = createPayload(data);
      
      const response = id
        ? await axios.patch(`/api/update-coursebyid?id=${id}`, payload)
        : await axios.post("/api/post/courseinfo", payload);

      if (response?.data?.success) {
        await revalidateCourseData();
        router.refresh();
        toast({
          title: courseData ? "Updated Course Information Successfully!" : "Added Course Successfully",
          variant: "constructive",
        });
      } else {
        toast({
          description: response?.data.message,
          variant: "destructive",
        });
      }
    } catch (error: any) {
      toast({
        title: "Error While saving Course Info",
        description: error.response?.data?.message || "Please try again later",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
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
    formValues,
    setFormValues,
    onSubmit,
  };
}; 