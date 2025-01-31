import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AuthProvider from "@/context/Authprovider";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster"

const inter = Inter({ subsets: ["latin"] });
export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">      
      <body className="">
      <AuthProvider>
      {children}
      <Toaster/>
      </AuthProvider>
      </body>

    </html>
  );
}
