'use client'
import { Edit2, SquarePlus } from 'lucide-react'
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { BlogType } from '../../../../ModelTypes/ModelTypes'
import axios from 'axios'
import Image from 'next/image'
import Link from 'next/link'
const blognav = [
  {
    label: "Post",
    icon: <SquarePlus />

  },
  {
    label:"Edit",
    icon:<Edit2/>
  }
]

function Page() {
  const { data: session } = useSession()
  const [blogPosts,setBlogPosts]=useState<BlogType[]>([])
  const [loading,setLoading]=useState(false);
  let isAdmin = session?.user.role === 'admin';
  const isUser = session?.user.role === 'user' ? true : false || session?.user.role === null ? false : true;   // user check 

  useEffect(()=>{
    async function fetchAllBlogs() {
      setLoading(true);
      try{
         const response=await axios.get(`/api/blog/get-blog`) 
         setBlogPosts(response.data.data);
        
      } catch (error:any) {
        console.error('Error fetching Blogs', error.response.data.message);
      
      } finally {
        setLoading(false);
      }
    }

    fetchAllBlogs()
  },[])

  
  return (
    <>
      <div className='absolute flex  justify-center right-5 mt-5'>
        <div className='flex gap-8 items-center justify-center'>
          <div className='left-container'>
            <ul className='flex gap-6'>
              {isAdmin&&blognav.map((item, index) => {
                return <li key={index} className='flex '>
                  <span className='hover:scale-110 transition-all items-center p-2 flex flex-col hover:bg-yellow-200 '>
                    {item.icon}
                    {item.label}

                  </span>
                  
                  
                </li>
              })}
            </ul>

          </div>

          {isAdmin && `Hi! ${session?.user.name}`}
        </div>

      </div>

      <div className='flex flex-col gap-5 my-20 md:w-[85%] m-auto'>
        <h1 className='text-4xl font-bold'>KNOW MORE THROUGH BLOGS</h1>
        {loading ? (
          <p className="text-center">Loading...</p>
        ) : (
          <div className='grid gap-6'>
            {blogPosts.map((blog) => (
              <>
                <Link href={`/blogs/${encodeURIComponent(blog._id)}`}>
                <BlogCard key={blog._id} blog={blog} />

                </Link>
              </>
            ))}
          </div>
        )}

      </div>
    </>


  )
}


const BlogCard = ({ blog }: { blog: BlogType }) => {
  return (
    <div className='flex gap-6 md:h-[280px] bg-white shadow-lg  overflow-hidden  border border-gray-200 hover:shadow-2xl transition-all duration-300'>
      {/* Thumbnail Image */}
      <div className=' flex-shrink-0'>
        <Image
        width={380}
        height={200}
          src={blog.thumbnail}
          alt={blog.title}
          className='w-full h-full object-cover '
        />
      </div>

      {/* Blog Content */}
      <div className='flex flex-col justify-between p-4'>
        <h2 className='text-2xl font-semibold text-gray-800'>{blog.title}</h2>
        <p className='text-gray-600 text-sm'>{blog.description.slice(0,300)}...</p>
        <div className='flex justify-between items-center mt-4 text-gray-500 text-sm'>
          <div className='flex justify-center items-center '>
          <Image 
          src={'/LOGOFINAL.png'}
          width={40}
          alt='logo'
          height={40}
          className='flex-1 w-full h-full rounded-full'
          ></Image>

          <span>By CarrerWay</span>
          </div>
          <span>{new Date(blog.publishedDate).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  )
}

export default Page


