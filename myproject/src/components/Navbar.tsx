'use client'
import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { PopoverDemo } from '@/components/PopoverDemo'
import Image from "next/image";
import { Headset, HeadsetIcon, House, HouseIcon, LayoutDashboard, Loader2, Loader2Icon, Menu, MessageSquareText, Paperclip, Search, SearchIcon, Shield, User, UserRound, UsersRound, X } from "lucide-react";
import { Input } from "./ui/input";
import ResponsiveDropDown from '@/components/ResponsiveDropdown'
import axios from "axios";
import { useDebounceCallback } from "usehooks-ts";

const navItems = [
  {
    icon: <House />,
    label: 'Home',
    path: '/',
    role: 'user',
    isUser: true
  },
  {
    icon: <MessageSquareText />,
    label: 'About',
    path: '/about',
    role: 'user',
    isUser: true

  },
  {
    icon: <UserRound />,
    label: 'Collaborations',
    path: '/collaborations',
    role: 'user',
    isUser: true


  },
  {
    icon: <HeadsetIcon />,
    label: 'Get in Touch',
    path: '/contact',
    role: 'user',
    isUser: true,

  },
  {
    icon: <LayoutDashboard />,
    path: '/admin/dashboard',
    label: 'Dashboard',
    role: 'admin',
    isUser: false
  },{
    icon:<Paperclip/>,
    path:'/blogs',
    label:'Blogs',
    role:'both'

  }


]
interface CourseInfoSearchBarType {
  title: string;
  UniversityName: string;
}



const Navbar = () => {
  const pathname = usePathname()
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Sidebar state

  /**
   * this states below responsible to handle search bar value and their functionality including dropdown
   */
  const [isDropDownOpen, setIsDropDownOpen] = useState(false);
  const [courseInfo, setCourseInfo] = useState<CourseInfoSearchBarType[]>([]);
  const [value, setValue] = useState("");
  const [showinputBoxInMobile, setShowinputBoxInMobile] = useState("none");
  const [isLoading, setIsLoading] = useState(false);


  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };


  const { data: session } = useSession()
  // console.log(session);

  const isAdmin = session?.user.role === 'admin'; // admin check

  const isUser = session?.user.role === 'user' ? true : false || session?.user.role === null ? false : true;   // user check 


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
    <div id="navbar" className="relative z-40 flex text-black pt-4 md:pt-1  md:px-5 items-center justify-between">
      <div className="flex items-center md:gap-3 " >
        <div className="flex flex-col opacity-80 w-[58%] md:w-[80%]">
          <p className="font-extrabold ml-4 text-2xl  md:text-4xl md:ml-8 text-black">CareerWay</p>
          <span className="text-sm ml-4 text-black font-bold md:text-md md:ml-8 text-left opacity-80">Drive2Dreams</span>
        </div>
      </div>

      <div className="hidden md:flex ">

        <ul className=" flex gap-2  text-[12px] items-center">
          {
            navItems.slice(0, navItems.length).map((item, index) => {
              return (
                <li key={index} className={` flex  items-center`}>

                  <Link
                    className={pathname === item.path ? 'active rounded p-2 scale-110 text-black' : 'hover:scale-110  rounded p-2 transition duration-100 delay-50 ease-in'}
                    href={item.path}>
                    {React.cloneElement(item.icon as React.ReactElement, { size: 20, className: "inline mr-1 mb-1" })}
                    {item.label}

                  </Link>
                </li>
              )
            })
          }
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



      <div className=" flex gap-3 items-center justify-center">
        <button ref={searchIconRef} className=" md:hidden rounded-sm   hover:bg-white hover:text-black" onClick={() => {
          setShowinputBoxInMobile((prev) => (prev === "none" ? "block" : "none"));
        }}  >
          {isLoading ? <Loader2Icon className="animate-spin" /> : <SearchIcon size={30}  />}
        </button>

        <div className=" md:hidden relative right-1">
          <Menu size={40} onClick={toggleSidebar} />

          {
            isSidebarOpen && <div onClick={toggleSidebar} className="z-50 top-0 -right-1 fixed flex justify-end bg-transparent h-[100vh] w-[100vw]" >
              <div className="bg-[#111111] flex flex-col items-center justify-center  w-60 py-28  " >

                <button className="text-white absolute top-10 right-10 hover:bg-white hover:text-black" onClick={toggleSidebar}><X size={30} /></button>

                <ul className=" flex flex-col gap-10 h-full text-white ">

                  {
                    navItems.map((item, index) => {
                      return (
                        <li key={index}
                          className={`${isAdmin && (item.role === 'admin' || item.role === 'user'||item.role==='both') || isUser && (item.role === 'user'|| item.role==='both') ? 'flex items-center' : 'hidden'
                            }`}>

                          <Link
                            className={pathname === item.path ? 'active rounded p-2 scale-110' : 'hover:scale-110  rounded p-2 transition duration-100 delay-50 ease-in'}
                            href={item.path}>
                            {React.cloneElement(item.icon as React.ReactElement, { size: 20, className: "inline mr-1 mb-1" })}
                            {item.label}

                          </Link>
                        </li>
                      )
                    })
                  }



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




                </ul>
              </div>
            </div>
          }
        </div>

      </div>




      {/* for mobile */}
      <div ref={CloseOnCLickRef} className=" md:hidden absolute w-[70%] z-50 top-[80px] left-5" >
        <Input
          placeholder="Search Courses"

          value={value}
          onChange={HandleSearchChange}
          className="pr-[35px] py-6 bg-white text-black "
          style={{ display: showinputBoxInMobile }}
        />

        {isDropDownOpen && (

          <>
            <ResponsiveDropDown setValue={setValue} courseInfo={courseInfo} value={value} />
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
    </div>

  )
}

export default Navbar