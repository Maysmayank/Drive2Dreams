'use client'
import AuthProvider from '@/context/Authprovider'
import '../globals.css'

import AdminNavbar from '@/components/admin/AdminNavBar'
import { Toaster } from '@/components/ui/toaster'
import { useState } from 'react'
import Image from 'next/image'
import { X } from 'lucide-react'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <html lang="en">
      <body className="flex">
        <AuthProvider>
          <div className="flex h-full w-full">
            {/* Admin Navbar for larger screens */}
            <div className="hidden  md:block md:bg-black w-[240px]">
              <AdminNavbar />
            </div>

            {/* Admin Navbar for smaller screens */}
            {isMenuOpen && (
              <div className="absolute bg-black top-0 right-0 min-w-[250px] h-full z-50">
                <AdminNavbar />
                <button
                  onClick={() => setIsMenuOpen(false)}
                  className="absolute top-4 right-4 text-white text-xl"
                  aria-label="Close Menu"
                > 
                  <X className="bg-white text-black rounded-sm p-1" size={30} />
                </button>
              </div>
            )}

            {/* Main Content Area */}
            <div className="flex-1 h-full overflow-auto relative">
              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="absolute right-10 top-6 md:hidden"
                aria-label="Open Menu"
              >
                <Image className="h-10 w-10 bg-white" height={40} width={40} src="../menu.svg" alt="Menu" />
              </button>

              {/* Render the main content */}
              {children}

              {/* Toast notifications */}
              <Toaster />
            </div>
          </div>
        </AuthProvider>
      </body>
    </html>
  )
}
