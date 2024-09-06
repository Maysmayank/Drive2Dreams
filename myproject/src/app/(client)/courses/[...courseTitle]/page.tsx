
import DynamicCourseCardinfo from '@/components/DynamicCourseCardinfo';
import dbConnect  from '@/lib/dbConnect'; // Adjust the path as needed
import { CourseInfoModel } from '@/models/courseInfo'; // Adjust the path as needed

type CourseData = {
  university: string;
  title: string;
  courseInfo: string;
  courseOverview: string;
  courseContent?: string[];
  duration?: string;
  syllabus?: string;
};

// Fetch course data static side 
async function fetchCourseData(courseTitle: string): Promise<CourseData[]> {
  try {    
    await dbConnect(); // Connect to the database
    const courseData = await CourseInfoModel.find({ title: courseTitle }).exec();
    return courseData;
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
        "No course here"
      ) : (
        courseData.map((course, index) => (
          <DynamicCourseCardinfo
            key={index}
            title={course.title}
            courseOverview={course.courseOverview}
            courseContent={course.courseInfo}
          />
        ))
      )}
    </div>
  );
}
