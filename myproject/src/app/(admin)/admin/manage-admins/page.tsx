'use client'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { LoaderCircle } from 'lucide-react';

import React, { useEffect, useState } from 'react'
import { useDebounceCallback } from 'usehooks-ts'
import { Input } from '@/components/ui/input';
import axios from 'axios';
import { useToast } from '@/components/ui/use-toast';
import { Button } from "@/components/ui/button"

interface User {
  username: string,
  email: string,
  role: string,
}

function ManageAdmins() {
  const [searchName, setSearchName] = useState("");
  const [list, setList] = useState<User[]>([]);
  const [isDropdownOpen, setIsDropDownOpen] = useState(false)
  const [users, setUsers] = useState<User[]>([]);
  const [isLoading,setIsLoading]=useState(false)
  let [role,setRole]=useState("");

  const { toast } = useToast()

  useEffect(() => {
    const savedUsers = localStorage.getItem('users')
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    } else {
      setUsers([]);
    }
  }, [])

  const debouncedFetchUser = useDebounceCallback((value) => {
    FetchUser(value);
  }, 1000);

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    let value = e.target.value;
    setSearchName(value);
    if (value) {
      debouncedFetchUser(value)
    } else {
      setIsDropDownOpen(false)
    }
  }

  async function FetchUser(searchName: string) {
    try {
      // console.log(searchName);
      setIsLoading(true)
      const response = await axios.get(`/api/get-admin?searchName=${searchName}`);

      if (response.data && Array.isArray(response.data.user)) {
        setList(response.data.user)
        setIsDropDownOpen(true)
      }
      else {
        setList([])
      }

    } catch (error) {
      console.log(error);
    }finally{
      setIsLoading(false)
    }
  }

  function HandleClick(user: User) {
    if (users.some(u => u.email === user.email && u.username===user.username)) {
      toast({
        description: "already added"
      })
      return
    }
    const updatedUser = [...users, user];
    setUsers(updatedUser);
    localStorage.setItem('users', JSON.stringify(updatedUser))

    setIsDropDownOpen(false);
    setSearchName("");
    setList([]);

  }

  async function handleChangeRole(user:User){
   try{    
    role=user.role==="admin"?"user":"admin";

    const response=await axios.patch(`/api/change-role?role=${role}&email=${user.email}`)
    console.log(response.data);
    
    if(response.data.success){
      const updatedUser=users.map(u=>u.email===user.email?{...u,role:role}:u)  
      setUsers(updatedUser);
      localStorage.setItem('users',JSON.stringify(updatedUser))
      toast({
        description:response.data.message
      })
    }
    else 
    {
      toast({
        description: 'Failed to update the role.'
      })
    }
  
  }catch(error:any){
    toast({
      description: error.response.data.message||"error while updating role"
    });
   } 
  }

  return (
    <div className='flex flex-col w-full bg-gray-900 h-screen text-white p-10'>
     

      <div className='flex w-full'>
        <h1 className='font-medium text-3xl mb-5'>Manage Admins</h1>
      </div>
      {/**this div is for dropdown when input is taken from user it shows up while fetching data from DB */}
      <div className='flex flex-col  gap-5'>
        <div>
          <Input type='text' onChange={handleChange} value={searchName} placeholder='Enter the username or email'></Input>
          
          <div>
            {list.length > 0 && isDropdownOpen && (
              <ul className='absolute w-[78%] bg-white flex flex-col text-black'>
                {list.map((user, index) => (
                  <div key={index}>
                    <li key={index} onClick={() => HandleClick(user)} className='hover:bg-yellow-200 p-4'>
                      <div className='font-semibold'>{user?.username}</div>
                      <div>{user?.email}</div>
                      <div className='text-sm'>{user?.role}</div>
                    </li>
                    <hr className='bg-grey h-1 w-full' />
                  </div>
                ))}
              </ul>
            )
            }

          </div>
        </div>
    
        
        <div className="relative m-auto w-full min-h-[480px]">
        
        {isLoading && (
        <div className='absolute inset-0 flex w-full h-full items-center justify-center bg-gray-800 bg-opacity-50'>
          <LoaderCircle className="animate-spin h-20 w-20"></LoaderCircle>
        </div>
        )}     
          
          {users.length > 0 ? (
            users.map((user, index) => (
              <ul className='flex gap-2 px-5 w-full flex-col md:flex-row  justify-between md:w-full' key={index}>
                <li className='flex  flex-col items-center md:w-full gap-2 md:flex-row justify-between w  mb-4' key={index}>
                  <p>{index + 1}</p>
                  <div>{user.username}</div>
                  <div>{user.email}</div>
                  <Popover>
                  
                  <PopoverTrigger className="flex">{user.role}</PopoverTrigger>
                  <PopoverContent>
                    <p>Do you want to change the role to {user.role==="admin"?("user"):("admin")} </p>
                    <Button onClick={()=>handleChangeRole(user)}>
                      yes
                    </Button>
                    <Button >No</Button>
                  </PopoverContent>
                  
                  </Popover>
                </li>
              </ul>
            ))
          ) : ('No Admin Added')}
        </div>
      </div>
    </div>
  )
}

export default ManageAdmins
