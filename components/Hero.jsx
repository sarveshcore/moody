"use client";
import React, { useState, useEffect } from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import Calender from "./Calender";
import Link from "next/link";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

function Hero() {
  const [selectedDate, setSelectedDate] = useState(null);
  const [moodData, setMoodData] = useState({});
  const moods = {
    happy: "😊",
    sad: "😢",
    angry: "😠",
    neutral: "😐",
    excited: "🤩",
  };

  // Set today's date as the initial selected date
  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Normalize the time to midnight
    setSelectedDate(today);
  }, []);

  const handleMoodSelect = (mood) => {
    if (selectedDate) {
      const dateKey = selectedDate.toISOString().split("T")[0];
      setMoodData((prev) => ({
        ...prev,
        [dateKey]: mood,
      }));
    }
  };

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
          <Link href={"/dashboard"}>
            <Button text="Sign Up" />
          </Link>
          <Link href={"/dashboard"}>
            <Button text="Login" dark />
          </Link>
        </div>
      </div>
      <div className="w-full max-w-[1000px]">
        <Calender
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          moodData={moodData}
          moods={moods}
        />
      </div>
      {selectedDate && (
        <div className="flex gap-4 mt-4">
          {Object.entries(moods).map(([mood, emoji]) => (
            <button
              key={mood}
              onClick={() => handleMoodSelect(mood)}
              className="text-4xl hover:scale-110 transition-transform"
              title={mood}
            ></button>
          ))}
        </div>
      )}
    </div>
  );
}

export default Hero;
