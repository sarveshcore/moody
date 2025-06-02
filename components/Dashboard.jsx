"use client";
import React, { useState, useEffect, useMemo } from "react";

import { Fugaz_One } from "next/font/google";
import Calender from "./Calender";
import { useAuth } from "@/context/AuthContext";
import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";

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
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    const loadUserData = async () => {
      if (!currentUser || !userDataObj) {
        return;
      }
      if (userDataObj?.moods) {
        setMoodData(userDataObj.moods);
      }
    };
    loadUserData();
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

  const handleMoodSelect = async (mood) => {
    if (!currentUser) return;
    const dateKey = selectedDate.toISOString().split("T")[0];
    setMoodData((prev) => ({
      ...prev,
      [dateKey]: mood,
    }));
    try {
      const userRef = doc(db, "users", currentUser.uid);
      await updateDoc(userRef, {
        [`moods.${dateKey}`]: mood,
      });
    } catch (error) {
      console.error("Error saving mood:", error);
      setMoodData((prev) => {
        const newData = { ...prev };
        delete newData[dateKey];
        return newData;
      });
    }
  };

  const statuses = useMemo(
    () => ({
      nums_days: 14,
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-white p-4 sm:p-6 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="text-center space-y-4">
          <h1
            className={`text-4xl sm:text-5xl md:text-6xl font-bold ${fugaz.className} bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600`}
          >
            Welcome Back!
          </h1>
          <p className="text-slate-600 text-lg">{formattedDate}</p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
          {Object.keys(statuses).map((status, statusIndex) => (
            <div
              key={statusIndex}
              className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 hover:border-indigo-200 transform hover:-translate-y-1"
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
          ))}
        </div>

        {/* Mood Selection Section */}
        <div className="text-center space-y-8">
          <h2
            className={`text-4xl sm:text-5xl md:text-6xl ${fugaz.className} bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600`}
          >
            How do you <span className="textGradient">feel</span> today?
          </h2>

          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mt-8">
            {Object.keys(moods).map((mood, moodIndex) => (
              <button
                key={moodIndex}
                onClick={() => handleMoodSelect(mood)}
                className={`group bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col items-center justify-center gap-3 hover:scale-[1.02] hover:border-indigo-400 transform hover:-translate-y-1 ${
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
            ))}
          </div>
        </div>

        {/* Calendar Section */}
        <div className="mt-12">
          <Calender
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            moodData={moodData}
            moods={moods}
          />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
