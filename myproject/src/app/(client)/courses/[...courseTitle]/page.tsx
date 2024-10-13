
import DynamicCourseCardinfo from '@/components/DynamicCourseCardinfo';
import dbConnect  from '@/lib/dbConnect'; // Adjust the path as needed
import { CourseInfoModel } from '@/models/courseInfo'; // Adjust the path as needed

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
  syllabus?: string;
}

 async function fetchCourseData(courseTitle: string): Promise<CourseData[]> {
  try {    
    await dbConnect(); // Connect to the database
    const courseData = await CourseInfoModel.find({ title: courseTitle }).populate('university').lean().exec();
    console.log('Fetched Course Data:', courseData);

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
    <div className="pt-[100px]">
      {courseData.length === 0 ? (
        "No course inforamation available"
      ) : (
        courseData.map((course, index) => (
          <DynamicCourseCardinfo
            key={index}
            title={course.title}
            courseOverview={course.courseOverview}
            courseContent={course.courseInfo}
            image={course.university.cloudinaryImageUrl}
          />
        ))
      )}
    </div>
  );
}
