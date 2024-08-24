'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useSession } from "next-auth/react";

const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isAdmin,setIsAdmin]=useState(false);  
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };
  const { data: session } = useSession()
  if(session){
    console.log(session);
    
  }
  
  return (
    <div className="fixed z-50 flex min-w-full bg-black h-[100px] text-white px-10 items-center justify-between">
      
      <div className="h-[130px] w-[100px] ">
        <img src="/originalLogo.png" className=" object-cover h-full w-full" alt="" />
      </div>
      
      <div className="hidden md:flex">
        <ul className=" flex gap-10 ">
          <li>
          <Link className={pathname==='/home'?'active rounded p-2  bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/home'>Home</Link>
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
          {isAdmin?(
            <ul>
            <li>
              <Link className={pathname==='/contact' ?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/contact'>Add University</Link>           
            </li>
            
            <li>
              <Link className={pathname==='/contact' ?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/contact'>Get all users</Link>
            </li>
            </ul>
          ):('')}
        </ul>
      
      </div>

      <div className="hidden md:flex items-center gap-4">
        {session ? (
          <img src={session.user?.image || "/default-profile.png"} alt={session.user?.name || "Profile"} className="w-10 h-10 rounded-full" />
        ) : (
          <Link href='/signup'>Signup</Link>
        )}
      </div>


      
      <div className="md:hidden">
        <button onClick={toggleMenu}>
          <img src="/menu.svg" alt="menu" width={38} className="bg-slate-100"/>
        </button>
      </div>
      
      {isMenuOpen && (
        //mobile responsive  navbar 
        <div className="fixed right-0 top-0 bg-black w-60 h-screen items-center pt-[100px] justify-around flex flex-col md:hidden">
          <button className="text-white absolute top-5 right-5" onClick={toggleMenu}>X</button>
        
            <ul className=" flex flex-col gap-10 ">
              <li >
              <Link className={pathname==='/home'?'active rounded p-2  bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/home' onClick={toggleMenu}>Home</Link>
              </li>
          
              <li>
              <Link className={pathname==='/about'?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black rounded p-2 transition duration-200 delay-75 ease-in'} href='/about' onClick={toggleMenu}>About</Link>
              </li>

              <li>
              <Link className={pathname==='/collaborations' ?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/collaborations' onClick={toggleMenu}>Collaborations</Link>          
              </li>

              <li>
              <Link className={pathname==='/contact' ?'active rounded p-2 bg-white text-black':'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/contact' onClick={toggleMenu}>Contact us</Link>          
              </li>
            </ul>
          
          <Link href='/signup'>Signup</Link>

        </div>
      )}
    
    </div>


  )
}

export default Navbar