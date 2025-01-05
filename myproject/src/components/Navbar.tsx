'use client'
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { PopoverDemo } from '@/components/PopoverDemo'
import Image from "next/image";
import { Headset, House, LayoutDashboard, Loader2, Loader2Icon, Menu, MessageSquareText, Search, SearchIcon, Shield, User, UsersRound, X } from "lucide-react";
import { Input } from "./ui/input";
import ResponsiveDropDown from '@/components/ResponsiveDropdown'
import axios from "axios";
import { useDebounceCallback } from "usehooks-ts";


interface CourseInfoSearchBarType{
  title:string;
  UniversityName:string;
}
const Navbar = () => {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  /**
   * this states below responsible to handle search bar value and their functionality including dropdown
   */
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [courseInfo, setCourseInfo] = useState<CourseInfoSearchBarType[]>([]);
  const [value, setValue] = useState("");
  const [showinputBoxInMobile, setShowinputBoxInMobile] = useState("none");
  const [isLoading, setIsLoading] = useState(false);


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };


  const { data: session } = useSession()
  // console.log(session);
  
  useEffect(() => {
    if (value) {
      const delay = setTimeout(() => {
        setIsLoading(true)    // loading start from here 

        debouncedFetchCourseInfo(value);
      }, 1000)

      return () => clearTimeout(delay)

    }

  }, [value])

  async function fetchDropDownData(value: string) {
    try {

      let response = await axios.post("/api/dropDownData", { value })
      if (response.data.success) {

        setCourseInfo(response.data.data);

        setIsDropDownOpen((prev) => !prev);

      } else {
        setCourseInfo([]);
      }
    } catch (error: any) {
      console.log(error.response.data.message);

    } finally {
      setIsLoading(false)  // loading ends here
    }
  }

 

  const debouncedFetchCourseInfo = useDebounceCallback((value) => {
    fetchDropDownData(value);
  });

  function HandleSearchChange(e: React.ChangeEvent<HTMLInputElement>) {
    setValue(e.target.value);
  }


  const CloseOnCLickRef = useRef<HTMLDivElement>(null);
  const searchIconRef = useRef<HTMLButtonElement>(null);


  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        CloseOnCLickRef.current &&
        searchIconRef.current &&
        !CloseOnCLickRef.current.contains(e.target as Node) &&
        !searchIconRef.current.contains(e.target as Node)
      ) {

        setShowinputBoxInMobile("none"); // Close the input box if clicked outside
        setIsDropDownOpen(false)
      }
    };

    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);


  return (
    <div className="relative z-50 flex text-black pt-5 md:pt-10  md:px-5 items-center justify-between">
      <div className="flex bg-red items-center md:gap-3 " >
        <div className="flex flex-col opacity-80 w-[58%] md:w-[80%]">
          <p className="font-extrabold ml-4 text-2xl  md:text-4xl md:ml-8 text-black">CareerWay</p>
          <span className="text-sm ml-4 text-black font-bold md:text-md md:ml-8 text-left opacity-80">Drive2Dreams</span>
        </div>
      </div>

      <div className="hidden md:flex">
        <ul className=" flex gap-10  text-[15px] items-center">
          <li className="flex">
            <Link className={pathname === '/' ? 'active rounded p-2 scale-125 text-black' : 'hover:scale-125  rounded p-2 transition duration-200 delay-75 ease-in'} href='/'>

              <House size={20} className="inline mr-1 mb-1" />Home</Link>
          </li>

          <li className="flex">
            <Link className={pathname === '/about' ? 'active rounded p-2 scale-125 text-black' : 'hover:scale-125  rounded p-2 transition duration-200 delay-75 ease-in'} href='/about'>
              <MessageSquareText size={20} className="mr-1 mb-1 inline" />About
            </Link>
          </li>

          <li className="flex">
            <Link className={pathname === '/collaborations' ? 'active rounded p-2 scale-125 text-black' : 'hover:scale-125  rounded p-2 transition duration-200 delay-75 ease-in'} href='/collaborations'>
              <UsersRound size={20} className="mr-1 mb-1 inline" />Collaborations
            </Link>
          </li>

          <li className="flex">
            <Link className={pathname === '/contact' ? 'active rounded p-2  scale-125 text-black' : 'hover:scale-125  rounded p-2 transition duration-200 delay-75 ease-in'} href='/contact'>
              <Headset className="inline mr-1 mb-1" />
              Contact us</Link>
          </li>
        </ul>

      </div>

      <div className="hidden md:flex ">
        <div className="relative md:w-[300px]">

          <Input value={value} placeholder="Search Courses" onChange={HandleSearchChange} className="pr-[35px] md:block" />

          <button className="absolute rounded-sm p-1.5 outline-none border-none top-0 right-0.5 hover:bg-white hover:text-black">
            {isLoading ? <Loader2Icon className="animate-spin" /> : <SearchIcon />}
          </button>

          <div className="absolute hidden md:block md:mt-6 w-full">
            {
              isDropDownOpen && <ResponsiveDropDown setValue={setValue} courseInfo={courseInfo} value={value} />
            }
          </div>

        </div>
      </div>

      <button ref={searchIconRef} className="relative md:hidden rounded-sm p-1.5 outline-none border-none -right-[50px] hover:bg-white hover:text-black" onClick={() => {
        setShowinputBoxInMobile((prev) => (prev === "none" ? "block" : "none"));
      }}  >
        {isLoading ? <Loader2Icon className="animate-spin" /> : <SearchIcon size={30}/>}
      </button>

      {/* for mobile */}
      <div ref={CloseOnCLickRef} className=" md:hidden absolute w-[90%] z-50 top-[80px] left-5" > 
        <Input
          placeholder="Search Courses"

          value={value}
          onChange={HandleSearchChange}
          className="pr-[35px] py-6ww bg-white text-black "
          style={{ display: showinputBoxInMobile }}
        />

        {isDropDownOpen && (

          <>
            <ResponsiveDropDown  setValue={setValue} courseInfo={courseInfo} value={value} />
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