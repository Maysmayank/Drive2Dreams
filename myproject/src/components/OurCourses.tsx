import React from 'react';
import CourseCard from '@/components/CourseCard';

type CourseData = {
  university: string;
  title: string;
  courseInfo: string;
  courseOverview: string;
  courseContent?: string[];
  duration?: string;
  syllabus?: string;
};

type CourseDataProps = {
  courseData: CourseData[];
};

export default function OurCourses({ courseData }: CourseDataProps) {
  return (
    <div className='relative'>
      <div className='mt-10 flex flex-col items-center pb-10 px-3'>
        <h1 className='font-bold text-4xl mb-8'>Our Courses</h1>

        {/* Grid for courses */}
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
          
          {courseData.length === 0 ? (
            <p className='text-center text-lg col-span-full'>No courses available at the moment.</p>
          ) : (
            courseData.map((course) => (
              <CourseCard
                key={course.title}
                title={course.title}
                text={course.courseOverview}
                duration={course.duration}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
