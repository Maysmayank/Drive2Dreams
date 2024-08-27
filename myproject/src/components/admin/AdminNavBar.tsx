'use client';
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
    <div className='flex flex-col justify-between py-10 items-center bg-black p-5 h-screen fixed'>
      <div className="flex flex-col justify-between gap-2 text-white h-[48%]">

        <div className='logo mt-2'>
          <h1 className='text-white font-bold text-3xl'>Drive2Dreams</h1>
        </div>

        <ul className=" flex flex-col gap-10  text-white ">
          
          <li >
            <Link className={pathname==='/admin/dashboard'?'active rounded p-2  bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/admin/dashboard'>Dashboard</Link>
          </li>
          
          <li>
            <Link className={pathname==='/admin/manage-admins'?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black rounded p-2 transition duration-200 delay-75 ease-in'} href='/admin/manage-admins'>Manage Admins</Link>
          </li>

          <li>
            <Link className={pathname==='/contact' ?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/contact'>Contact us</Link>          
          </li>
        </ul>
      </div>
 
      <div>
      {session?.user?.image ? (
            <div className='flex gap-2'>
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
              {session?.user?.email?.charAt(0).toUpperCase() || "You"}
              </span>
              
              <button onClick={()=>{signOut({callbackUrl:'/login'})}} className=" hover:bg-red-600 rounded-sm p-2 text-white transition duration-200 delay-75 ease-in ">Logout</button>
            </div>     
          )}       
      </div>
         
    </div>
  )
}

export default AdminNavBar
