'use client';
import { Book, GraduationCap, House, LayoutDashboard, Plus, University, User, UserRoundCog } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

function AdminNavBar() {
  let [isMenuOpen,setIsMenuOpen]=useState(false);
  let  pathname =usePathname();
  const {data:session}=useSession()
  
  function toggleMenu(){
    setIsMenuOpen(!isMenuOpen);
  }
 
  return (
    <div className='flex flex-col justify-between py-10 items-center  p-6 min-h-screen fixed'>
      
      <div className="flex flex-col  justify-between gap-4 text-white h-[70%]">

        <div className='logo mt-10 mb-20'>
          <h1 className='text-white font-bold text-3xl opacity-80'>Drive2Dreams</h1>
        </div>

        <ul className=" flex flex-col gap-10  text-white ">
          <li>
          <Link className={pathname==='/'?'active rounded p-2  bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/' onClick={toggleMenu}><House className="inline mr-4 mb-1" />Home</Link>
          </li>

          <li >
            <Link className={pathname==='/admin/dashboard'?'active rounded p-2  bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/admin/dashboard'><LayoutDashboard className="inline mr-4 mb-1" />Dashboard</Link>
          </li>
          
          <li >
            <Link className={pathname==='/admin/manage-admins'?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black rounded p-2 transition duration-200 delay-75 ease-in'}  href='/admin/manage-admins' ><UserRoundCog className="inline mr-4 mb-1" />Manage Admins</Link>
          </li>

          <li>
            <Link className={pathname==='/admin/post-courseinfo' ?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/admin/post-courseinfo'><GraduationCap className="inline mr-4 mb-1"/> Add Courses</Link>          
          </li>
          
          <li>
            <Link className={pathname==='/admin/post-unoversityinfo' ?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/admin/post-universityinfo'><University className="inline mr-4 mb-1"/> Add University</Link>          
          </li>
          
          <li>
            <Link className={pathname==='/admin/addPlacedStudents' ?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/admin/addPlacedStudents'><University className="inline mr-4 mb-1"/> Add PlacedStudents</Link>          
          </li>

        </ul>
      </div>
       
      <div>
      {session?.user?.image ? (
            <div className='  flex gap-2'>
            <Image
              src={session.user.image}
              alt={session.user.name || "Profile"}
              height={50} width={50}
              className="w-10 h-10 bg-white rounded-full"
            />
            <button onClick={()=>{signOut({callbackUrl:'/login'})}} className=" hover:bg-red-600 rounded-sm p-2 text-white transition duration-200 delay-75 ease-in">Logout</button>
            </div>

          ) : (

            <div className="flex flex-col items-center gap-2">
              
              <span className="bg-white text-gray-700 p-2 rounded-full w-10 h-10 flex items-center justify-center">
              {session?.user?.email?.charAt(0).toUpperCase() ||session?.user.image}
              </span>
              
              <button onClick={()=>{signOut({callbackUrl:'/login'})}} className=" hover:bg-red-600 rounded-sm p-2 text-white transition duration-200 delay-75 ease-in text-xl ">Logout</button>
            </div>     
          )}    
          <h1 className='mt-5 text-white'>Status: {session?.user.role}</h1>   
      </div>
        
    </div>
  )
}

export default AdminNavBar
