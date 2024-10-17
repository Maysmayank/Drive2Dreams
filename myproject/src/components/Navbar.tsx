'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import {PopoverDemo} from '@/components/PopoverDemo'
import Image from "next/image";

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  
  const { data: session } = useSession()
  // console.log(session);

  
  return (
    <div className=" fixed z-50 flex min-w-full bg-black h-[85px] text-white px-5 md:px-10 items-center justify-between">
      
      <div className="flex items-center gap-3" >
        <div className="rounded-full h-18 w-[60px] flex gap-4 items-center justify-center">
        <Image src="/LOGOFINAL.png" height={100} width={100} alt="" />

        </div>
        <div className="flex flex-col opacity-80 ">
          <p className="font-bold  text-xl md:text-2xl">Drive2Dreams</p>
          <span>tagline</span>
        </div>
      </div>
      
      <div className="hidden md:flex">
        <ul className=" flex gap-10 ">
          <li>
          <Link className={pathname==='/'?'active rounded p-2  bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/'>Home</Link>
          </li>
          
          <li>
          <Link className={pathname==='/about'?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black rounded p-2 transition duration-200 delay-75 ease-in'} href='/about'>About</Link>
          </li>

          <li>
          <Link className={pathname==='/collaborations' ?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/collaborations'>Collaborations</Link>          
          </li>

          <li>
          <Link className={pathname==='/contact' ?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/contact'>Contact us</Link>          
          </li>
        </ul>
      
      </div>

      <div className="hidden md:flex items-center gap-4">
        {session ? (
           <PopoverDemo
            element={
             <div className="flex items-center">
               {session.user?.image ? (
                 <Image
                   src={session.user.image}
                   alt={session.user.name || "Profile"}
                   height={20} width={20}
                   className="w-10 h-10 bg-white rounded-full"
                 />
               ) : (
                 
                 <span className="bg-white text-gray-700 p-2 rounded-full w-10 h-10 flex items-center justify-center">
                   {session.user?.email?.charAt(0).toUpperCase() || "You"}
                 </span>
                 
               )}

             </div>
           }
         />
        
        ) 
        : 
        
        (
          <Link href='/signup' className="hover:bg-green-600 p-2   rounded-sm  transition duration-200 delay-75 ease-in">Signup</Link>
        )
        
        }
      </div>
      
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <Image src="/menu.svg" alt="menu" width={38} height={40} className="bg-slate-100 w-[40px] h-[40px]"/>
        </button>
      </div>
      
      {isMenuOpen && (
        //mobile responsive  navbar 
        <div className="fixed right-0 top-0 bg-black w-60 h-screen items-center pt-[100px] justify-around flex flex-col md:hidden">
          <button className="text-white absolute top-5 right-5" onClick={toggleMenu}>X</button>
        
          <ul className=" flex flex-col gap-10 ">
            <li >
            <Link className={pathname==='/'?'active rounded p-2  bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/' onClick={toggleMenu}>Home</Link>
            </li>

            {session?.user.role==='admin'&&(
                <li>
                <Link className={pathname==='/admin/dashboard' ?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/admin/dashboard' onClick={toggleMenu}>DashBoard</Link>          
                </li>
            )}
            

            <li>
            <Link className={pathname==='/about'?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black rounded p-2 transition duration-200 delay-75 ease-in'} href='/about' onClick={toggleMenu}>About</Link>
            </li>

            <li>
            <Link className={pathname==='/collaborations' ?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/collaborations' onClick={toggleMenu}>Collaborations</Link>          
            </li>

            <li>
            <Link className={pathname==='/contact' ?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/contact' onClick={toggleMenu}>Contact us</Link>          
            </li>

            <li>
            <Link className={pathname==='/contact' ?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/contact' onClick={toggleMenu}>Contact us</Link>          
            </li>

            
          </ul>

          {session?.user?.image ? (
            <div>
            <Image
              src={session.user.image}
              alt={session.user.name || "Profile"}
              width={40} height={40}
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
      )}
    
    </div>

  )
}

export default Navbar