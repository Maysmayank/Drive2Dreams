import dbConnect from '@/lib/dbConnect';
import React from 'react'
import { BlogType } from '../../../../ModelTypes/ModelTypes';
import BlogModel from '@/models/Blog';
import ShowBlogs from '@/components/admin/ShowBlogs';

/**
 * 
 * we are using this serversideprop to get the inital 3 courses to prevent loading the contents at first on client side
 * so first three data will be loaded on the server and then the rest will be dynamically handled based on see more button
 */
const LIMIT=6
async function serverSideFetchAllBlogs(): Promise<{blogs:BlogType[]}> {
  try {
   
    await dbConnect(); // Connect to the database
    
    const allblogs = await BlogModel.find({})
    let blogs = JSON.parse(JSON.stringify(allblogs))
    
    return {blogs};
  } catch (error) {
    console.error('Error fetching Blogs', error);
    return {blogs:[]}
  }
}


export default async function Home() {

  const {blogs}=await serverSideFetchAllBlogs();
  
  
  return (
  
      <div className="w-full flex flex-col md:gap-5">
        <ShowBlogs blogs={blogs}/>
      </div>
    
  );
}
