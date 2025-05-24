import { Fugaz_One, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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

export const metadata = {
  title: "moody",
  description: "A mood tracker and logging website.  ",
};

export default function RootLayout({ children }) {
  const header = (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4 border-b border-slate-100">
      <h1 className={fugaz.className + " text-lg sm:text-lg textGradient"}>
        Moody
      </h1>
      <div className="flex items-center justify-between gap-4">
        <span className="text-slate-600">PLACEHOLDER</span>
      </div>
    </header>
  );

  const footer = (
    <footer className="p-4 sm:p-8 mt-auto border-t border-slate-100">
      <p
        className={`text-center text-lg text-indigo-500 ${fugaz.className} hover:text-slate-700 transition-colors duration-200 cursor-pointer`}
      >
        Created with <span className="text-pink-500">💕</span>
      </p>
    </footer>
  );

  return (
    <html lang="en">
      <body
        className={`w-full max-w-[1000px] mx-auto text-sm sm:text-base min-h-screen flex flex-col text-slate-700 ${geistSans.variable} ${geistMono.variable}`}
      >
        {header}
        {children}
        {footer}
      </body>
    </html>
  );
}
