import React from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

function Login() {
  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-8 py-12 px-4">
      <div className="flex flex-col items-center gap-6">
        <h3
          className={` text-center text-6xl sm:text-7xl md:text-8xl ${fugaz.className} textGradient`}
        >
          Login / Register
        </h3>
        <p className="text-xl text-slate-600">This is your first step!</p>
      </div>

      <div className="flex flex-col gap-6 w-full max-w-[400px]">
        <div className="relative">
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Email"
            type="email"
          />
        </div>

        <div className="relative">
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Password"
            type="password"
          />
        </div>

        <Button text="Submit" full />
      </div>
      <p>
        Don't have an Account? <span className="text-indigo-600">Sign up</span>
      </p>
    </div>
  );
}

export default Login;
