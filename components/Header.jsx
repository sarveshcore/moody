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

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="p-4 sm:p-8 border-b border-slate-100">
      <div className="flex justify-between items-center">
        <Link
          href={currentUser ? "/dashboard" : "/"}
          onClick={handleLogoClick}
          className={`text-2xl sm:text-3xl text-indigo-500 ${fugaz.className} hover:text-indigo-600 transition-colors duration-200`}
        >
          MOODY
        </Link>
        {currentUser && pathname !== "/" && (
          <button
            onClick={handleLogout}
            className="text-slate-600 hover:text-slate-800 transition-colors duration-200 flex items-center gap-2 px-4 py-2 rounded-full border border-slate-200 hover:border-slate-300 hover:bg-slate-50"
          >
            <span className="hidden sm:inline cursor-pointer hover:text-indigo-600 transition-colors duration-300">
              Logout
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
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
