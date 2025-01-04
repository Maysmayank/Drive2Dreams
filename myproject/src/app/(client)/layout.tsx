import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/context/Authprovider";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drive2Dreams",
  description: "Drive2Dreams",
  icons: {
    icon: "/LOGOFINAL.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>

        <AuthProvider>
          <Navbar></Navbar>
        

          
        </AuthProvider>
        
        {children}
        
        <Toaster></Toaster>

        <Footer />

      </body>
    </html>
  );
}
