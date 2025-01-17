import { Star } from 'lucide-react';
import React from 'react';

const reviewData = [
  {
    image: '/defaultuser.svg', // Placeholder image, replace with the actual image URL

    feedback: 'The program is approved by AICTE and is tailored to meet the evolving need.',
    name:'-Shashwat Singh',
    rating:'4'
  },
  {
    image: '/LOGOFINAL.png', // Add more reviews as needed
    feedback: 'This program exceeded my expectations and helped me grow professionally.',
    name:'-Manas Taneja',
    rating:'5'

  },

  {
    image: '/LOGOFINAL.png', // Add more reviews as needed
    feedback: 'This program exceeded my expectations and helped me grow professionally.',
    name:'-Arnav Deli',
    rating:'4'
  },
];

function ReviewCard() {
  return (

    <>
    <h1 className='m-auto text-4xl font-bold md:mt-10 '>Testimonials</h1>

    <div className="grid mb-10 md:w-[88%] m-auto bg-[#dcded] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
      {reviewData &&
        reviewData.map((review, index) => (
          <div
            key={index}
            className="flex flex-col  gap-4 items-center bg-white  shadow-lg rounded-lg mt-5 p-2 md:p-4"
          >

            <p className="relative font-semibold review-feedback text-center text-gray-600 pl-3">{review.feedback}</p>

            <div className='flex '>
            {
                Array.from({length:5},(_,index)=>{
                    return<Star 
                    key={index}
                    color='yellow' 
                    style={{ fill: parseInt(review.rating)>index ?'#FFE227':'', stroke:'#FFE227' }} // Fill and stroke for full yellow
                    />
                })
            }
            </div>

            <span className='font-normal mt-5'>{review.name}</span>
          </div>
        ))}
    </div>
    </>

  );
}

export default ReviewCard;
