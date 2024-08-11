'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
const Navbar = () => {
  const pathname = usePathname()
  return (
    <div className="mb-10 flex max-w-screen bg-black h-20 text-white px-10 items-center justify-between">
      <div className="">
        Logo
      </div>

      <div>
        <ul className="flex gap-10 ">
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
        </ul>
      
      </div>

      <div className="flex">
      <Link href='/signup'>Signup</Link>
      </div>
    </div>
  )
}

export default Navbar