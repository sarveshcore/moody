"use client";
import { Fugaz_One } from "next/font/google";
import Link from "next/link";
import { useAuth } from "@/context/AuthContext";
import { usePathname } from "next/navigation";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

function Header() {
  const { currentUser, logout } = useAuth();
  const pathname = usePathname();

  const handleLogoClick = (e) => {
    // If user is authenticated and on the home page, prevent navigation
    if (currentUser && pathname === "/") {
      e.preventDefault();
    }
  };

  return (
    <header className="p-4 sm:p-8 flex items-center justify-between gap-4 border-b border-slate-100">
      <Link href={currentUser ? "/dashboard" : "/"} onClick={handleLogoClick}>
        <h1
          className={`${fugaz.className} text-lg sm:text-lg textGradient hover:opacity-80 transition-opacity`}
        >
          Moody
        </h1>
      </Link>
      <div className="flex items-center justify-between gap-4">
        {currentUser && (
          <button
            onClick={logout}
            className="px-4 py-2 rounded-full border-2 border-indigo-600 text-indigo-600 hover:bg-indigo-600 hover:text-white transition-all duration-300 font-medium text-sm sm:text-base flex items-center gap-2 group"
          >
            <span>Logout</span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-4 w-4 transform group-hover:translate-x-1 transition-transform"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
              />
            </svg>
          </button>
        )}
      </div>
    </header>
  );
}

export default Header;
