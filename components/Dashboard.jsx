"use client";
import React, { useState, useEffect, useMemo } from "react";

import { Fugaz_One } from "next/font/google";
import Calender from "./Calender";
import { useAuth } from "@/context/AuthContext";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

function Dashboard() {
  const [moodData, setMoodData] = useState({});
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentTime, setCurrentTime] = useState(new Date());
  const { currentUser, userDataObj } = useAuth();

  // Update time every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    // Cleanup interval on component unmount
    return () => clearInterval(timer);
  }, []);
  useEffect(async () => {
    if (!currentUser && !userDataObj) {
      return;
    }
  }, [currentUser, userDataObj]);

  // Calculate time remaining until midnight
  const timeRemaining = useMemo(() => {
    const now = new Date();
    const midnight = new Date(now);
    midnight.setHours(24, 0, 0, 0);

    const diff = midnight - now;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  }, [currentTime]);

  // Format current date
  const formattedDate = useMemo(() => {
    return currentTime.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  }, [currentTime]);

  const statuses = useMemo(
    () => ({
      nums_days: 14, // Can be made dynamic if needed
      time_remaining: timeRemaining,
      date: formattedDate,
    }),
    [timeRemaining, formattedDate]
  );

  const moods = {
    "$*%#@!": "😭",
    Sad: "😢",
    Mid: "😐",
    Good: "😁",
    Insane: "😍",
  };

  const handleMoodSelect = (mood) => {
    const dateKey = selectedDate.toISOString().split("T")[0];
    setMoodData((prev) => ({
      ...prev,
      [dateKey]: mood,
    }));
  };

  return (
    <div className="flex flex-col flex-1 p-4 sm:p-6 mt-10">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
        {Object.keys(statuses).map((status, statusIndex) => {
          return (
            <div
              key={statusIndex}
              className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 cursor-pointer hover:border-indigo-200"
            >
              <p className="font-medium uppercase text-xs sm:text-sm text-slate-500 tracking-wider mb-2">
                {status.replaceAll("_", " ")}
              </p>
              <p
                className={`text-2xl sm:text-3xl font-bold text-indigo-600 ${fugaz.className}`}
              >
                {statuses[status]}
              </p>
            </div>
          );
        })}
      </div>
      <h4
        className={
          "text-5xl sm:text-6xl md:text-7xl mt-20 text-center " +
          fugaz.className
        }
      >
        How do you <span className="textGradient">feel</span> today?
      </h4>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-12">
        {Object.keys(moods).map((mood, moodIndex) => {
          return (
            <button
              key={moodIndex}
              onClick={() => handleMoodSelect(mood)}
              className={`group bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col items-center justify-center gap-3 hover:scale-[1.02] hover:border-indigo-400 ${
                moodIndex === 4 ? "col-span-2 md:col-span-1" : ""
              }`}
            >
              <span className="text-5xl transform group-hover:scale-110 transition-transform duration-300">
                {moods[mood]}
              </span>
              <p className="text-lg font-medium text-slate-700 capitalize group-hover:text-indigo-600 transition-colors duration-300">
                {mood}
              </p>
            </button>
          );
        })}
      </div>
      <Calender
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        moodData={moodData}
        moods={moods}
      />
    </div>
  );
}

export default Dashboard;
