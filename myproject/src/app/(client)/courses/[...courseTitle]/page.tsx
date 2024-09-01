import DynamicCourseCardinfo from "@/components/DynamicCourseCardinfo";
import axios from "axios";
import Image from "next/image";
type CourseData={
    university: string; // Name of the university or college
    title: string; // Title of the course
    courseInfo: string; // Detailed information about the course
    courseOverview:string;
    courseContent?: string[]; // Optional array of strings for course content like syllabus
    duration?: string; // Duration of the course
    syllabus?: string; // Optional field for storing file path or URL to PDF
}
type props={
    courseData:CourseData[];
}
async function  getServerSideProps({params}:{params:{courseTitle:string}}){
    console.log(params);
    
    try {
      const res = await axios.get(`${process.env.NEXTAUTH_URL}/api/get-infoByTitle?courseTitle=${params.courseTitle}`);
      const courseData: CourseData[] = res.data.courseData; // Extract courseData from API response
      
      return courseData;
    } catch (error) {
      console.error('Error fetching course data');
      return[]
    }
  };
export default async function Course({params}:{params:{courseTitle:string}}){    
    const courseData=await getServerSideProps({params});
    
    return(
        <div className="pt-[100px]">
            
            {courseData.length===0?("No course here"):(
                courseData.map((course,index)=>(
                    <DynamicCourseCardinfo key={index}
                    title={course.title} 
                    courseOverview={course.courseOverview}
                    courseContent={course.courseInfo}
    
                    />
                ))
            )}
            </div>
    )
}