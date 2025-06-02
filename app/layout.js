"use client";
import { Fugaz_One, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/context/AuthContext";
import Header from "@/components/Header";
import AboutModal from "@/components/AboutModal";
import { useState } from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

// export const metadata = {
//   title: "moody",
//   description: "A mood tracker and logging website.  ",
// };

export default function RootLayout({ children }) {
  const [isAboutModalOpen, setIsAboutModalOpen] = useState(false);

  const footer = (
    <footer className="p-4 sm:p-8 mt-auto border-t border-slate-100 flex justify-center items-center">
      <button
        onClick={() => setIsAboutModalOpen(true)}
        className={`text-center text-lg text-indigo-500 ${fugaz.className} hover:text-indigo-600 transition-colors duration-200 cursor-pointer flex items-center justify-center gap-2`}
      >
        Created with <span className="text-pink-500">💕</span>
      </button>
    </footer>
  );

  return (
    <html lang="en">
      <AuthProvider>
        <body
          className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-700 ${geistSans.variable} ${geistMono.variable}`}
        >
          <Header />
          {children}
          {footer}
          <AboutModal
            isOpen={isAboutModalOpen}
            onClose={() => setIsAboutModalOpen(false)}
          />
        </body>
      </AuthProvider>
    </html>
  );
}
