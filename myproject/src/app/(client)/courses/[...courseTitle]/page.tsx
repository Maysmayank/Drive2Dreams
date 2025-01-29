'use client';

import DynamicCourseCardinfo from '@/components/DynamicCourseCardinfo';
import { PlacedStudent } from '@/models/PlacedStudents';
import axios from 'axios';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { UniversityInfoType } from '../../../../../ModelTypes/ModelTypes';

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
  university: UniversityInfoType; // Full university object
  title: string;
  specializationOffered:string[];
  courseInfo: string;
  courseOverview: string;
  courseContent?: string[];
  duration?: string;
  eligibilityCriteria: string[];
  Brochure?: string;
  videoUrl:string;
};

export default function CoursePage({ params }: { params: { courseTitle: string } }) {
  const { courseTitle } = params;
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const [courseData, setCourseData] = useState<CourseData[]>([]); // Initialize state for course data
  const [placedStudents,setPlacedStudentsData]=useState<PlacedStudent[]>([]);
  const decodedCourseTitle = decodeURIComponent(courseTitle);

  useEffect(() => {
    
    async function fetchdataCourse() {
      try {
        setLoading(true);
        let response = await axios.post(`/api/get-courseinfo?`,{title:decodedCourseTitle});
        
        setCourseData(response.data.courseData); 
        
        if (response.data.courseData.length > 0) {
          const universityName = response.data.courseData[0].university.universityName;

          // Fetch placed students based on universityName
          console.log(universityName);
          
          const placedStudentsResponse = await axios.get(`/api/get-placedStudents?universityName=${universityName}`);
          setPlacedStudentsData(placedStudentsResponse.data.placedStudentsData);

        }
      } catch (error) {
        console.error('Error fetching course data:', error);
      } finally {
        setLoading(false);
      }
    }

  

    fetchdataCourse(); // Call the function to fetch data
  }, [decodedCourseTitle]); // Add decodedCourseTitle to the dependency array


  
  return (
    <div className=" min-h-[100vh]">
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
            eligibilityCriteria={course.eligibilityCriteria}
            image={course.university.cloudinaryImageUrl}

            aboutUniversity={course.university.aboutUniversity}
            industryConnections={course.university.industryConnections}
            highestPackageOffered={course.university.highestPackageOffered}
            placementRatio={course.university.placementRatio}
            ageOfUniversity={course.university.ageOfUniversity}
            universityName={course.university.universityName}
            Brochure={course.Brochure}
            videoUrl={course.videoUrl}
            specializationOffered={course.specializationOffered}
            placedStudentData={placedStudents}
          />
        ))
      )}
      
    </div>
  );
}
