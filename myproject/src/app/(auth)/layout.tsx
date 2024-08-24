import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../globals.css";
import AuthProvider from "@/context/Authprovider";
import Navbar from "@/components/Navbar";

const inter = Inter({ subsets: ["latin"] });
export default function ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">      
      <body className="mt-[120px]">
      <AuthProvider>
      {children}
      </AuthProvider>
      </body>

    </html>
  );
}
