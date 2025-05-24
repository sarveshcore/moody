import React from "react";
import { Fugaz_One } from "next/font/google";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

function Button({ text, dark, full }) {
  return (
    <button
      className={
        "border-solid rounded-full overflow-hidden border-2 duration-200 hover:opacity-60 " +
        (dark
          ? "text-white border-white bg-indigo-600"
          : "text-indigo-600 border-indigo-600 bg-white") +
        (full ? "grid place-items-center w-full" : "")
      }
    >
      <p
        className={
          "px-6 sm:px-10 whitespace-nowrap py-2 sm:py-3 " + fugaz.className
        }
      >
        {text}
      </p>
    </button>
  );
}

export default Button;
