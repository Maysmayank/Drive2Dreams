'use client'
import React, { useState } from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'
import { Pencil, Trash2 } from 'lucide-react'
import ConfirmationModal from '../ConfirmationModal'
import { revalidateCourseData } from '@/lib/action'
import { toast } from '../ui/use-toast'
import axios from 'axios'
import { useRouter } from 'next/navigation';
import EditinfoModal from '../EditinfoModal'

function AdminUniversityCard({ image, universityName,id }) {
    const router=useRouter()
    const [isClicked,setClicked]=useState(false)
    const[isModalVisible,setIsModalVisible]=useState(false);
    const[isEditModalVisible,setIsEditModalVisible]=useState(false)
    function HandleDeleteOnCancel(){
        setIsModalVisible(false);
    }

    
    
    function HandleOnConfirm(id){
        HandleDelete(id)
    }
    async function HandleDelete(id) {
        try {
            
          const response = await axios.delete(`/api/delete-universitybyid?id=${id}`)
            
          if (response.data.success) {
            
            await revalidateCourseData();
            router.refresh();
    
    
            toast({
              title: "University Deleted Successfully",
              description: response.data.message,
              variant:"constructive"
            })

          } else {
            
            toast({
              description: response.data.message,
              variant: "destructive"
            })
          }
    
        } catch (error) {
            console.log(error);
            
          toast({
            title: "Error Occured Try Again",
           
            variant: "destructive"
          })
        } finally {
          setIsModalVisible(false)
        }
    
      }

    async function HandleEditOnCancel(id){
      setIsEditModalVisible(false)
      
    }
    return (
        <div className=' flex flex-col gap-0  items-center  rounded-md w-full'>
            <div className='relative ' onMouseLeave={()=>(setClicked(false))} >
                <Image src={image} height={400} width={500} alt='' className=' rounded-lg object-fill h-[160px] w-[400px]' />
                <div className='absolute bg-black inset-0 opacity-20  flex items-center justify-center text-white'>
                </div>
                <div className='absolute inset-0 flex opacity-0 hover:opacity-100 transition-opacity duration-300 items-center justify-center'>
                    <p className='text-white font-bold text-xl break-words text-center w-[70%] line-clamp-4'>{universityName}</p>
                    <Button className='absolute rounded-full h-8 w-8 top-1 right-2 font-bold bg-white hover:bg-white' onClick={()=>setClicked(true)} style={{color:"black" }}>i</Button>
                </div>
                

                {
                    isClicked&&(
                        <div className='absolute inset-0 flex gap-5 items-center justify-center'>
                            <Button className='bg-red-700' onClick={()=>setIsModalVisible(true)}><Trash2/>Delete</Button>
                            <Button className='bg-blue-700  text-white' onClick={()=>setIsEditModalVisible(true)}><Pencil/>Edit</Button>
                        </div>
                    )
                }
            </div>
            <ConfirmationModal isVisible={isModalVisible} onCancel={HandleDeleteOnCancel} onConfirm={()=>HandleOnConfirm(id)}/>
            <EditinfoModal isVisible={isEditModalVisible} onCancel={HandleEditOnCancel} universityid={id} />
        </div>
    )
}

export default AdminUniversityCard
