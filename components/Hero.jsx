import React from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import Calender from "./Calender";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

function Hero() {
  return (
    <div className="flex flex-col items-center gap-12 py-14 sm:py-20">
      <div className="flex flex-col items-center gap-8">
        <h1
          className={"text-8xl md:text-[5rem] text-center " + fugaz.className}
        >
          Track your moods. <span className="textGradient">Daily.</span>
        </h1>
        <p className="text-lg text-center sm:text-xl md:text-2xl text-slate-700 w-full max-w-[1000px] mx-auto mt-4">
          Because <span className="textGradient font-bold">Every</span> Feeling
          Matters.
        </p>
        <div className="grid grid-cols-2 mt-8 gap-4">
          <Button text="Sign Up" />
          <Button text="Login" dark />
        </div>
      </div>
      <div className="w-full max-w-[1000px]">
        <Calender />
      </div>
    </div>
  );
}

export default Hero;
