'use client';

import DynamicCourseCardinfo from '@/components/DynamicCourseCardinfo';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

type UniversityData = {
  _id: string;
  universityName: string;
  aboutUniversity: string;
  admissionProcess: string;
  cutoffs: string;
  cloudinaryImageUrl?: string;
  cloudinaryImageName?: string;
};

type CourseData = {
  _id: string;
  university: UniversityData; // Full university object
  title: string;
  courseInfo: string;
  courseOverview: string;
  courseContent?: string[];
  duration?: string;
  eligibilityCriteria: string[];
  syllabus?: string;
};

export default function CoursePage({ params }: { params: { courseTitle: string } }) {
  const { courseTitle } = params;
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const [courseData, setCourseData] = useState<CourseData[]>([]); // Initialize state for course data

  const decodedCourseTitle = decodeURIComponent(courseTitle);

  useEffect(() => {
    console.log('Fetching data');

    async function fetchdataCourse() {
      try {
        setLoading(true);
        const response = await axios.get(`/api/get-courseinfo?title=${decodedCourseTitle}`);
        
        setCourseData(response.data.courseData); // Assuming response.data.course contains the course array
        console.log(courseData);
        
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchdataCourse(); // Call the function to fetch data
  }, [decodedCourseTitle]); // Add decodedCourseTitle to the dependency array

  return (
    <div className="min-h-[100vh]">
      {loading ? (
        <div className="flex items-center min-h-[100vh] justify-center">
          <Loader2 height={50} width={50} className="mr-2 animate-spin" />
        </div>
      ) : (
        courseData.map((course, index) => (
          <DynamicCourseCardinfo
            key={index}
            title={course.title}
            courseInfo={course.courseInfo}
            courseContent={course.courseContent} // Changed from course.courseInfo to courseContent
            eligibilityCriteria={course.eligibilityCriteria}
            image={course.university.cloudinaryImageUrl}
            aboutUniversity={course.university.aboutUniversity}
            syllabus={course.syllabus}
          />
        ))
      )}
    </div>
  );
}
