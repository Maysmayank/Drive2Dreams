import dbConnect from '@/lib/dbConnect';
import { CourseInfoModel } from '@/models/courseInfo';
import React from 'react';

const courseNames = [
  "Introduction to JavaScript",
  "Advanced React",
  "Data Structures and Algorithms",
  "Web Development with HTML and CSS",
  "Machine Learning Basics",
  "Python for Beginners",
  "Blockchain Development",
  "Data Science with Python",
  "Introduction to Cybersecurity",
  "Cloud Computing Essentials"
];

function ResponsiveDropdown({ value }) {
  // Filter the course names based on the input value
  const filteredItems = courseNames.filter(course => 
    course.toLowerCase().includes(value.toLowerCase())
  );

  return (
    <div>
      {value && filteredItems.length > 0 && (
        <div className='relative px-4 bg-white pt-4 md:pt-5 text-black'>
          <div className='flex flex-col items-center gap-3'>
            <ul>
              {filteredItems.map((course, ind) => (
                <li className='mb-2' key={ind}>
                  {course}
                  <hr />
                </li>
              ))}
            </ul>

            <p className='opacity-60'>see more results</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default ResponsiveDropdown;
