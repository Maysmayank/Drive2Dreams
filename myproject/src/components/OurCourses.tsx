'use client';
import React, { useEffect, useState } from 'react';
import CourseCard from '@/components/CourseCard';
import { CourseInfoType } from '../../ModelTypes/ModelTypes';
import Image from 'next/image';
import axios from 'axios';
import { Loader2 } from 'lucide-react';

interface OurCoursesProps {
  initialCourseData: CourseInfoType[];
}

export default function OurCourses({ initialCourseData }: OurCoursesProps) {
  const [courses, setCourses] = useState<CourseInfoType[]>(initialCourseData);
  const [category, setCategory] = useState<'masters' | 'graduation'>('masters');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = async (selectedCategory: 'masters' | 'graduation') => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await axios.get(`/api/get-courses`, {
        params: { category: selectedCategory },
      });

      if (response.data.success) {
        setCourses(response.data.courses);
      } else {
        setCourses([]); // Clear courses if no data is found
        setError(response.data.message || 'No courses found');
      }
    } catch (error) {
      console.error('Error fetching courses:', error);
      setError('An error occurred while fetching courses.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleCategory = (e: React.MouseEvent<HTMLButtonElement>) => {
    const newCategory = e.currentTarget.value as 'masters' | 'graduation';

    if (newCategory !== category) {
      setCategory(newCategory);

      if (newCategory === 'masters') {
        // Use the initialCourseData for masters
        setCourses(initialCourseData);
        setError(null); // Clear any previous error
      } else {
        // Fetch data from the API for other categories
        fetchCourses(newCategory);
      }
    }
  };

  return (
    <div className="mt-10 md:mt-20">
      <div className="mt-2 flex flex-col items-center pb-0 px-3">
        <h1 className="font-bold mb-8 text-2xl md:rubik-homepage-title md:text-4xl">
          Courses Offered
        </h1>

        {/* Category Buttons */}
        <div className="flex mt-0 gap-4 mb-14 md:flex-row flex-col items-center justify-center">
          <button
            value="masters"
            onClick={handleCategory}
            className={`px-6 md:text-md text-sm  py-2 rounded-full border-2 transition-all duration-300 font-medium ${
              category === 'masters'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'
            }`}
          >
            Top Master Programs
          </button>

          <button
            value="graduation"
            onClick={handleCategory}
            className={`px-6 py-2 rounded-full md:text-md text-sm border-2 transition-all duration-300 font-medium ${
              category === 'graduation'
                ? 'bg-blue-600 text-white border-blue-600'
                : 'bg-white text-blue-600 border-blue-600 hover:bg-blue-600 hover:text-white'
            }`}
          >
            Top Graduate Programs
          </button>
        </div>

        {/* Courses Grid */}
        <div className="flex flex-col md:flex-row flex-wrap justify-center gap-10 space-x-1 md:ml-28 md:mr-28">
          {isLoading ? (
            <Loader2 className="animate-spin" size={40} />
          ) : error ? (
            <p className="text-center text-lg text-red-600">{error}</p>
          ) : courses.length === 0 ? (
            <p className="text-center items-center flex flex-col text-lg col-span-full">
              <Image
                src="/ComingSoon.webp"
                width={300}
                height={100}
                alt="No courses available"
                className="object-contain"
              />
              <span>No courses found for the selected category.</span>
            </p>
          ) : (
            courses.map((course) => (
              <CourseCard
                key={course.title}
                image={course.university.cloudinaryImageUrl}
                title={course.title}
                text={course.courseInfo}
                duration={course.duration}
                universityName={course.university.universityName}
                rating={course.courseRating}
                affilitatedWith={course.affilitatedWith}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}