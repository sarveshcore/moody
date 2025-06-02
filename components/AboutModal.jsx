"use client";
import React from "react";
import { Fugaz_One } from "next/font/google";
import Link from "next/link";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

function AboutModal({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white/95 backdrop-blur-sm rounded-2xl max-w-2xl w-full p-6 sm:p-8 relative shadow-2xl">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 transition-colors"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Content */}
        <div className="space-y-6">
          <h2
            className={`text-3xl font-bold text-slate-800 ${fugaz.className}`}
          >
            About Me!
          </h2>

          <div className="space-y-4 text-slate-600">
            {/* Add your introduction and details here */}
            <p className="text-lg">
              [Hi, I'm Sarvesh Srinath — a passionate Computer Science and
              Artificial Intelligence undergraduate at Newton School of
              Technology. I enjoy building projects that blend creativity with
              technology, from mobile apps to web platforms. With experience in
              Python, Swift, and web development, I'm always exploring new ways
              to solve real-world problems through code.]
            </p>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-slate-800">
                Let's get in touch!
              </h3>
              <p>[sarveshsrinath23@gmail.com]</p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-slate-800">Ping Me</h3>
              <Link
                href="https://www.linkedin.com/in/sarvesh-srinath-5821b3316/"
                className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="hover:scale-110 transition-transform"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span>LinkedIn</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutModal;
