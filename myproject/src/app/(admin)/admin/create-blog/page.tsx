"use client"
import CreateBlog from '@/components/Blogs/CreateBlog'
import { useSession } from 'next-auth/react'
import React from 'react'

function Page() {
    const { data: session } = useSession()
  
  return (
    <div className='p-8'>
      <div className='flex flex-col'>
        <span>
        Hi {session?.user.name}

        </span>
        <span>
        Status is {session?.user.role}

        </span>
      </div>
      <CreateBlog/>
    </div>
  )
}

export default Page
