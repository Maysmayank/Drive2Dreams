'use client'
import React, { useState } from 'react'
import { Button } from "@/components/ui/button";
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { revalidateCourseData } from '@/lib/action';
import { toast } from '../ui/use-toast';
import ConfirmationModal from '@/components/ConfirmationModal'
import { Trash2 } from 'lucide-react';
import { Pencil } from 'lucide-react';
import EditCourseinfoModal from '../EditCourseinfoModal';


function AdminCourseCard({ title, id,overview }) {
  const[isHovered,setIsHovered]=useState(false);
  const[isModalVisible,setIsModalVisible]=useState(false);
  const[isEditModalVisible,setIsEditModalVisible]=useState(false);
  const router=useRouter();
 
  
  function HandleDeleteOnCancel(){
    setIsModalVisible(false);
  }
  function HandleEditOnCancel(){
    setIsEditModalVisible(false)
  }
  
  function HandleOnConfirm(id){
    HandleDelete(id)
  }

  async function HandleDelete(id){
    try{
   
      const response= await axios.delete(`/api/delete-coursebyid?id=${id}`)
      console.log(response);
      
      if(response.data){
       await revalidateCourseData();
       router.refresh();
       toast({
         title:"Course Deleted Successfully",
         description:response.data.message
       })
       }else{
         toast({
           description:response.data.message,
           variant:"destructive"
         })
       }
     
       }catch(error){
         toast({
           title:"Error Occured Try Again",
           description:response.data.message,
           variant:"destructive"
         })
       }finally{
        setIsModalVisible(false)
       }
   
  }
  async function HandleNavigation(title){
    router.push(`/courses/${encodeURIComponent(title)}`)   
  }


  return (
      <div onClick={()=>setIsHovered(!isHovered)} onMouseLeave={()=>setIsHovered(false)} className='relative bg-white h-[150px] overflow-hidden text-black font-sans w-full p-2 rounded-md'>
          
          <div className='flex flex-col gap-3'>
            <p className='text-2xl text-center break-words'>{title}</p>
            <p className='line-clamp-3'>
              {overview}
            </p>
          </div>



          {isHovered&&(
            <div className='absolute inset-0 animate-flip-up  gap-4 bg-gray-300 w-full h-full px-5 grid items-center grid-cols-3 md:grid-cols-3 '>
            <Button className='flex gap-2 bg-red-600' onClick={()=>setIsModalVisible(true)}><Trash2/>Delete</Button>
            <Button onClick={()=>HandleNavigation(title)}>View</Button>
            <Button className='flex gap-2 bg-green-600' onClick={()=>setIsEditModalVisible(true)}><Pencil/> Edit</Button>
          </div>
          )}
          
          <ConfirmationModal isVisible={isModalVisible} onCancel={HandleDeleteOnCancel} onConfirm={()=>HandleOnConfirm(id)}/>

          <EditCourseinfoModal isVisible={isEditModalVisible} onCancel={HandleEditOnCancel} sendidtoEditModal={id}  />  
      </div>
  )
}

export default AdminCourseCard
