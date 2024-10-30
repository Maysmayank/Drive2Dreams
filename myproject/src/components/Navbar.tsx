'use client'
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { PopoverDemo } from '@/components/PopoverDemo'
import Image from "next/image";
import { Headset, House, LayoutDashboard, Menu, MessageSquareText, Search, SearchIcon, Shield, User, UsersRound, X } from "lucide-react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import ResponsiveDropDown from '@/components/ResponsiveDropdown'
import axios from "axios";
const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const[isDropDownOpen,setIsDropDownOpen]=useState(false);
  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const { data: session } = useSession()
  // console.log(session);
  const [value, setValue] = useState('');
  console.log(value);

  const  HandleSearchClick= () => {
    setIsDropDownOpen((prev) => !prev);
  };

  return (
    <div className=" fixed z-50 flex min-w-full bg-black h-[75px] md:h-[85px] text-white px-2 md:px-10 items-center justify-between">

      <div className="flex items-center gap-3 " >
        <div className="rounded-full h-18 w-[50px] flex gap-4 items-center justify-center">
          <Image src="/LOGOFINAL.png" height={100} width={80} alt="" />
        </div>
        <div className="flex flex-col opacity-80 w-[58%] md:w-[80%]">
          <p className="font-bold  text-md md:text-2xl">Drive2Dreams</p>
          <span className="text-xs md:text-md  text-left opacity-80">Connecting ambitions with opportunities</span>
        </div>
      </div>

      <div className="hidden md:flex">
        <ul className=" flex gap-10 text-sm items-center">
          <li className=" flex ">
            <Link className={pathname === '/' ? 'active rounded p-2  bg-white text-black' : 'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/'>

              <House size={20} className="inline mr-1 mb-1" />Home</Link>
          </li>

          <li>
            <Link className={pathname === '/about' ? 'active rounded p-2 bg-white text-black' : 'hover:bg-white hover:text-black rounded p-2 transition duration-200 delay-75 ease-in'} href='/about'>
              <MessageSquareText size={20} className="mr-1 mb-1 inline" />About
            </Link>
          </li>

          <li>
            <Link className={pathname === '/collaborations' ? 'active rounded p-2 bg-white text-black' : 'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/collaborations'>
              <UsersRound size={20} className="mr-1 mb-1 inline" />Collaborations
            </Link>
          </li>

          <li>
            <Link className={pathname === '/contact' ? 'active rounded p-2 bg-white text-black' : 'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/contact'>
              <Headset className="inline mr-1 mb-1" />
              Contact us</Link>
          </li>
        </ul>

      </div>

      <div className="hidden md:flex">
        <div className="relative md:w-[320px]">

          <Input placeholder="Search Courses" onChange={(e) => (setValue(e.target.value))} className="pr-[35px] hidden md:block" />

          <button className="absolute rounded-sm p-1.5 outline-none border-none top-0 right-0.5 hover:bg-white hover:text-black" onClick={HandleSearchClick}>
            <SearchIcon />
          </button>
          
          <div className="absolute hidden md:block md:mt-6 w-full bg-red-400 ">
          {
            isDropDownOpen&&<ResponsiveDropDown value={value}/>
          }
          </div>
          
        </div>
      </div>

      <button className="relative md:hidden rounded-sm p-1.5 outline-none border-none  right-2 hover:bg-white hover:text-black" onClick={HandleSearchClick}>
        <SearchIcon size={25} />
        
      
      </button>

      <div className="md:hidden absolute w-[90%] top-20 left-5">
  {isDropDownOpen && (
    <>
      <Input
        placeholder="Search Courses"
        onChange={(e) => setValue(e.target.value)}
        className="pr-[35px] py-2 bg-white text-black"
      />
      <ResponsiveDropDown value={value}/>
    </>
  )}
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
          <Menu size={42} />

        </button>
      </div>

      {isMenuOpen && (
        //mobile responsive  navbar 
        <div className="fixed right-0 top-0 bg-black w-60 h-screen items-center pt-[100px] justify-around flex flex-col md:hidden">
          <button className="text-white absolute top-10 right-10" onClick={toggleMenu}><X size={30} /></button>

          <ul className=" flex flex-col gap-10 ">
            <li >
              <Link className={pathname === '/' ? 'active rounded p-2  bg-white text-black' : 'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/' onClick={toggleMenu}><House className="inline mr-4 mb-1" />Home</Link>
            </li>

            {session?.user.role === 'admin' && (
              <li>
                <Link className={pathname === '/admin/dashboard' ? 'active rounded p-2 bg-white text-black' : 'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/admin/dashboard' onClick={toggleMenu}> <LayoutDashboard className="inline mr-3 mb-1" />DashBoard</Link>
              </li>
            )}


            <li>
              <Link className={pathname === '/about' ? 'active rounded p-2 bg-white text-black' : 'hover:bg-white hover:text-black rounded p-2 transition duration-200 delay-75 ease-in'} href='/about' onClick={toggleMenu}><MessageSquareText className="mb-1 mr-3 inline" />About</Link>
            </li>

            <li>
              <Link className={pathname === '/collaborations' ? 'active rounded p-2 bg-white text-black' : 'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/collaborations' onClick={toggleMenu}><Shield className="mb-1 mr-3 inline" /> Collaborations</Link>
            </li>

            <li>
              <Link className={pathname === '/contact' ? 'active rounded p-2 bg-white text-black' : 'hover:bg-white hover:text-black  rounded p-2 transition duration-200 delay-75 ease-in'} href='/contact' onClick={toggleMenu}><Headset className="mr-3 mb-1 inline" />Contact us</Link>
            </li>




          </ul>

          {session?.user?.image ? (
            <div className=" flex flex-col gap-3 items-center">
              <Image
                src={session.user.image}
                alt={session.user.name || "Profile"}
                width={40} height={40}
                className="w-10 h-10 bg-white rounded-full"
              />
              <button onClick={() => { signOut({ callbackUrl: '/login' }) }} className=" hover:bg-red-600 rounded-sm p-2 text-white transition duration-200 delay-75 ease-in">Logout</button>
            </div>

          ) : (

            <div className="flex flex-col items-center gap-2">

              <span className="bg-white text-gray-700 p-2 rounded-full w-10 h-10 flex items-center justify-center">

                {session?.user?.email?.charAt(0).toUpperCase() || <User />}
              </span>
              {
                session?.user.role === "admin" ? (
                  <button onClick={() => { signOut({ callbackUrl: '/login' }) }} className=" hover:bg-red-600 rounded-sm p-2 text-white transition duration-200 delay-75 ease-in ">Logout</button>

                ) : (
                  <button onClick={() => { signOut({ callbackUrl: '/login' }) }} className=" text-xl hover:bg-green-600 rounded-sm p-2 text-white transition duration-200 delay-75 ease-in ">LogIn</button>

                )
              }
            </div>
          )}

          <h2 className="opacity-70">Drive2Dreams</h2>

        </div>

      )}

    </div>

  )
}

export default Navbar