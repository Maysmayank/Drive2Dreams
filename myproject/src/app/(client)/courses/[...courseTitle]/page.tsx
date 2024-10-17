
import DynamicCourseCardinfo from '@/components/DynamicCourseCardinfo';
import dbConnect  from '@/lib/dbConnect'; // Adjust the path as needed
import { CourseInfoModel } from '@/models/courseInfo'; // Adjust the path as needed
import { Loader2 } from 'lucide-react';

type UniversityData = {
  _id: string;
  universityName: string;
  aboutUniversity: string;
  admissionProcess: string;
  cutoffs: string;
  cloudinaryImageUrl?: string;
  cloudinaryImageName?: string;
}

// Define the course data interface, where university is now of type UniversityData
type CourseData = {
  _id: string;
  university: UniversityData; // Full university object
  title: string;
  courseInfo: string;
  courseOverview: string;
  courseContent?: string[];
  duration?: string;
  eligibilityCriteria:string[];
  syllabus?: string;
}

 async function fetchCourseData(courseTitle: string): Promise<CourseData[]> {
  try {    
    await dbConnect(); // Connect to the database
    const courseData = await CourseInfoModel.find({ title: courseTitle }).populate('university').lean();
    console.log("coursedaa :: ",courseData);

    return courseData as CourseData[];
    
  } catch (error) {
    console.error('Error fetching course data:', error);
    return [];
  }
}

export default async function CoursePage({ params }: { params: { courseTitle: string } }) {
  const { courseTitle } = params;
  
  const decodedCourseTitle = decodeURIComponent(courseTitle);  
  
  const courseData = await fetchCourseData(decodedCourseTitle);
  return (
    <div className=" min-h-[100vh]">
      {courseData.length === 0 ? (
        <div className='flex items-center min-h-[100vh] justify-center '>
        <Loader2 height={50} width={50} className='mr-2 animate-spin'/>

      </div>
      ) : (
        courseData.map((course, index) => (
          <DynamicCourseCardinfo
            key={index}
            title={course.title}
            courseInfo={course.courseInfo}
            courseContent={course.courseInfo}
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
