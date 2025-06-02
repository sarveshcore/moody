"use client";
import React, { useState, useEffect } from "react";

const months = {
  January: "Jan",
  February: "Feb",
  March: "Mar",
  April: "Apr",
  May: "May",
  June: "Jun",
  July: "Jul",
  August: "Aug",
  September: "Sep",
  October: "Oct",
  November: "Nov",
  December: "Dec",
};

const dayList = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function Calender({ selectedDate, setSelectedDate, moodData = {}, moods }) {
  // State for current displayed month
  const [displayDate, setDisplayDate] = useState(new Date());
  const [now, setNow] = useState(null);

  useEffect(() => {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);
    setNow(currentDate);
  }, []);

  const handlePrevMonth = () => {
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() - 1);
    setDisplayDate(newDate);
  };

  const handleNextMonth = () => {
    const newDate = new Date(displayDate);
    newDate.setMonth(newDate.getMonth() + 1);
    setDisplayDate(newDate);
  };

  // Don't render anything until we have the current date
  if (!now) return null;

  const year = displayDate.getFullYear();
  const month = Object.keys(months)[displayDate.getMonth()];
  const monthIndex = Object.keys(months).indexOf(month);
  const today = now.getDate();

  const monthNow = new Date(year, monthIndex, 1);
  const firstDayOfMonth = monthNow.getDay();
  const lastDayOfMonth = new Date(year, monthIndex + 1, 0).getDate();

  const daysToDisplay = firstDayOfMonth + lastDayOfMonth;
  const numRows = Math.ceil(daysToDisplay / 7);

  const handleDateClick = (dayNumber) => {
    if (dayNumber > 0 && dayNumber <= lastDayOfMonth) {
      const clickedDate = new Date(year, monthIndex, dayNumber);
      clickedDate.setHours(0, 0, 0, 0);

      // Only allow selection if date is today or in the past
      if (clickedDate <= now) {
        setSelectedDate(clickedDate);
      }
    }
  };

  const isToday = (dayNumber) => {
    return (
      dayNumber === today &&
      monthIndex === now.getMonth() &&
      year === now.getFullYear()
    );
  };

  const isSelected = (dayNumber) => {
    return (
      selectedDate &&
      dayNumber === selectedDate.getDate() &&
      monthIndex === selectedDate.getMonth() &&
      year === selectedDate.getFullYear()
    );
  };

  const isFutureDate = (dayNumber) => {
    const date = new Date(year, monthIndex, dayNumber);
    date.setHours(0, 0, 0, 0);
    return date > now;
  };

  const getMoodForDate = (dayNumber) => {
    const date = new Date(year, monthIndex, dayNumber);
    date.setHours(0, 0, 0, 0);
    // Only return mood if date is not in the future
    if (date <= now) {
      const dateKey = date.toISOString().split("T")[0];
      return moodData?.[dateKey] || null;
    }
    return null;
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-white rounded-xl shadow-lg mt-5">
      <div className="flex justify-between items-center border-b pb-4">
        <button
          onClick={handlePrevMonth}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Previous month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>
        <h2 className="text-3xl font-bold text-slate-800">
          {month} {year}
        </h2>
        <button
          onClick={handleNextMonth}
          className="p-2 hover:bg-slate-100 rounded-lg transition-colors"
          aria-label="Next month"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-slate-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </div>

      <div className="grid grid-cols-7 gap-2">
        {dayList.map((day) => (
          <div
            key={day}
            className="text-center text-sm font-semibold text-slate-600 py-3"
          >
            {day.slice(0, 3)}
          </div>
        ))}
      </div>

      <div className="grid grid-cols-7 gap-2">
        {[...Array(numRows * 7)].map((_, index) => {
          const dayNumber = index - firstDayOfMonth + 1;
          const isCurrentMonth = dayNumber > 0 && dayNumber <= lastDayOfMonth;
          const isPastDate = isCurrentMonth && !isFutureDate(dayNumber);
          const moodForDate = isCurrentMonth ? getMoodForDate(dayNumber) : null;

          return (
            <div
              key={index}
              onClick={() => handleDateClick(dayNumber)}
              className={`aspect-square p-3 text-center rounded-lg transition-all duration-200 ${
                isCurrentMonth
                  ? isFutureDate(dayNumber)
                    ? "text-slate-300 cursor-not-allowed"
                    : "hover:bg-indigo-50 cursor-pointer hover:scale-105"
                  : "text-slate-300"
              } ${
                isSelected(dayNumber)
                  ? "bg-indigo-500 text-white hover:bg-indigo-600 shadow-md"
                  : isToday(dayNumber) && !selectedDate
                  ? "bg-indigo-500 text-white hover:bg-indigo-600 shadow-md"
                  : isPastDate
                  ? "hover:bg-indigo-100"
                  : ""
              }`}
            >
              {isCurrentMonth && (
                <div className="flex flex-col items-center justify-center h-full gap-1">
                  <span
                    className={`text-lg font-medium ${
                      isFutureDate(dayNumber) ? "text-slate-300" : ""
                    }`}
                  >
                    {dayNumber}
                  </span>
                  {moodForDate && !isFutureDate(dayNumber) && (
                    <span className="text-3xl mt-1">{moods[moodForDate]}</span>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Calender;
