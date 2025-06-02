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

  useEffect(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
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
    <div className="min-h-[calc(100vh-200px)] flex flex-col items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto w-full">
        {/* Hero Section */}
        <div className="text-center space-y-8 mb-16">
          <h1
            className={`text-5xl sm:text-6xl md:text-7xl font-bold ${fugaz.className} bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600`}
          >
            Track your moods.
            <br />
            <span className="textGradient">Daily.</span>
          </h1>
          <p className="text-xl sm:text-2xl text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Because <span className="font-semibold text-indigo-600">Every</span>{" "}
            Feeling Matters.
            <br />
            <span className="text-lg text-slate-500">
              Your personal mood journal, simplified.
            </span>
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8">
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button text="Get Started" dark />
            </Link>
            <Link href="/dashboard" className="w-full sm:w-auto">
              <Button text="Login" />
            </Link>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
            <div className="text-4xl mb-4">📅</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Daily Tracking
            </h3>
            <p className="text-slate-600">
              Record your mood every day with our simple interface.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Visual Insights
            </h3>
            <p className="text-slate-600">
              View your mood patterns over time with our calendar view.
            </p>
          </div>
          <div className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100">
            <div className="text-4xl mb-4">🔒</div>
            <h3 className="text-xl font-semibold text-slate-800 mb-2">
              Private & Secure
            </h3>
            <p className="text-slate-600">
              Your mood data is private and securely stored.
            </p>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-white rounded-3xl shadow-lg p-6 sm:p-8">
          <h2
            className={`text-3xl font-bold text-center mb-8 ${fugaz.className} text-slate-800`}
          >
            See it in Action
          </h2>
          <Calender
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            moodData={moodData}
            moods={moods}
          />
          {selectedDate && (
            <div className="flex justify-center gap-4 mt-6">
              {Object.entries(moods).map(([mood, emoji]) => (
                <button
                  key={mood}
                  onClick={() => handleMoodSelect(mood)}
                  className="text-4xl hover:scale-110 transition-transform bg-white rounded-full p-2 hover:shadow-md"
                  title={mood}
                >
                  {emoji}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Hero;
