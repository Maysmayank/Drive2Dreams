'use client';
import { Book, FileSignature, GraduationCap, House, LayoutDashboard, Plus, University, User, User2Icon, UserRoundCog } from 'lucide-react';
import { signOut, useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useState } from 'react'

function AdminNavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();
  const { data: session } = useSession();

  const navItems = [
    { href: '/', label: 'Home', icon: <House className="inline mr-4" /> },
    { href: '/admin/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="inline mr-4" /> },
    // { href: '/admin/manage-admins', label: 'Manage Admins', icon: <UserRoundCog className="inline mr-4" /> },
    { href: '/admin/post-courseinfo', label: 'Add Courses', icon: <GraduationCap className="inline mr-4" /> },
    { href: '/admin/post-universityinfo', label: 'Add University', icon: <University className="inline mr-4" /> },
    { href: '/admin/addPlacedStudents', label: 'Add Placed Students', icon: <User2Icon className="inline mr-4" /> },
  ];

  function toggleMenu() {
    setIsMenuOpen(!isMenuOpen);
  }

  return (
    <div className="flex flex-col justify-between p-6 min-h-screen bg-black  text-white fixed w-64">
      <div className="logo mt-10 mb-10 text-center">
        <h1 className="text-white font-bold text-3xl opacity-80">Drive2Dreams</h1>
      </div>

       

        {/* Menu */}
        <ul className={`flex flex-col gap-8  h-[60%] lg:block`}>
          {navItems.map((item) => (
            <li key={item.href} className='md:mt-4'>
              <Link
                className={pathname === item.href ? 'active-link' : 'hover-link'}
                href={item.href}
                onClick={toggleMenu}
              >
                {item.icon}
                {item.label}
              </Link>
            </li>
          ))}
        </ul>

      {/* Profile Section */}
      <div className="flex flex-col items-center mt-5">
        {session?.user?.image ? (
          <div className="flex gap-2 items-center">
            <Image
              src={session.user.image}
              alt={session.user.name || "Profile"}
              height={50} width={50}
              className="w-12 h-12 bg-white rounded-full object-cover"
            />
            <button 
              onClick={() => { signOut({ callbackUrl: '/login' }) }} 
              className="bg-red-600 p-2 rounded-md text-white transition ease-in-out duration-300 hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-2">
            <span className="bg-white text-gray-700 p-2 rounded-full w-10 h-10 flex items-center justify-center">
              {session?.user?.email?.charAt(0).toUpperCase() || session?.user.image}
            </span>
            <button 
              onClick={() => { signOut({ callbackUrl: '/login' }) }} 
              className="bg-red-600 p-2 rounded-md text-white transition ease-in-out duration-300 hover:bg-red-700"
            >
              Logout
            </button>
          </div>
        )}
        <h1 className="mt-5 text-white text-sm">Status: {session?.user.role}</h1>
      </div>
    </div>
  );
}

export default AdminNavBar;
