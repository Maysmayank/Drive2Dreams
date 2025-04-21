import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "../../app/globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/context/Authprovider";
import { Toaster } from "@/components/ui/toaster";
import WhatsappIcon from "@/components/WhatsappIcon";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Drive2Dreams - Empowering Your Career Journey",
  description: "Drive2Dreams provides career guidance, admission assistance, and resources to help students achieve their academic and professional goals.",
  icons: {
    icon: "/CareerWayLogo.png",
  },
  openGraph: {
    title: "Drive2Dreams - Empowering Your Career Journey",
    description: "Explore career guidance, admission assistance, and resources to achieve your dreams with Drive2Dreams.",
    url: "https://www.drive2dreams.com",
    siteName: "Drive2Dreams",
    images: [
      {
        url: "/CareerWayLogo.png",
        width: 800,
        height: 600,
        alt: "Drive2Dreams Logo",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  metadataBase: new URL("https://www.drive2dreams.com"), // Add this line
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="ltr">
      <head>
        {/* Canonical URL */}
        <link rel="canonical" href="https://www.drive2dreams.com" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Drive2Dreams",
              url: "https://www.drive2dreams.com",
              sameAs: [
                "https://www.linkedin.com/company/drive2dreams/",
                "https://www.instagram.com/careerway.official",
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <AuthProvider>
          <Navbar />
          <WhatsappIcon />
          {children}
        </AuthProvider>
        <Toaster />
        <Footer />
      </body>
    </html>
  );
}