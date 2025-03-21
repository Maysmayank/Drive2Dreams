import { Star } from "lucide-react";
import Image from "next/image";
import * as React from 'react';
import Stack from '@mui/material/Stack'; import Rating from '@mui/material/Rating';
const reviewData = [
  {
    image: "/review/review2.jpg", // Add more reviews as needed

    feedback:
      "Thanks to the hard work and support of the CareerWay team, I was able to get into my dream B-schools. They helped me improve my profile and guided me through the entire application process, ensuring everything went smoothly and successfully.",
    name: "-Prakriti Singh",
    rating: "4",
  },
  {
    image: "/review/review1.jpg", // Placeholder image, replace with the actual image URL

    feedback:
      "I was looking for someone to guide me through every step of the admission process and help me achieve my dream of studying at a top college. CareerWay Consultants made the entire process smooth and hassle-free. I truly appreciate their team's effort and support.",
    name: "-Manas Taneja",
    rating: "5",
  },

  {
    image: "/review/review3.jpg", // Add more reviews as needed
    feedback:
      "Before reaching out to CareerWay, I wasn’t sure if my profile was good enough for a top college. But with their help, I was able to enhance my profile, which eventually led to me getting admission to my dream college!",
    name: "-Apurva Jain",
    rating: "4.5",
  },
];

function ReviewCard() {
  return (
    <>
      <h1 className="m-auto text-4xl font-bold  ">Testimonials</h1>

      <div className="grid mb-10 md:w-[88%] m-auto bg-[#dcded] grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 p-4">
        {reviewData &&
          reviewData.map((review, index) => (
            <div
              key={index}
              className="flex flex-col  gap-4 items-center justify-around bg-white  shadow-lg rounded-lg mt-5 p-2 md:p-4"
            >
              <p className=" relative font-semibold review-feedback text-center mt-6  text-gray-600 ">
                {review.feedback}
              </p>


              <Stack spacing={1}>
                <Rating name="half-rating-read" defaultValue={review.rating} precision={0.5} readOnly />             
              </Stack>


              <div className="flex items-center gap-4 mt-8">
                <Image
                  src={review.image}
                  className="rounded-full  h-[55px] w-[55px]"
                  height={100}
                  width={100}
                  alt=""
                />

                <span className="font-normal">{review.name}</span>
              </div>
            </div>
          ))}
      </div>
    </>
  );
}


export {ReviewCard}