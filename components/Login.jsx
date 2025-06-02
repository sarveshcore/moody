"use client";
import React, { useState } from "react";
import { Fugaz_One } from "next/font/google";
import Button from "./Button";
import { useAuth } from "@/context/AuthContext";
import { useRouter } from "next/navigation";

const fugaz = Fugaz_One({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  weight: ["400"],
});

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { signUp, login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      // Try to sign up first
      await signUp(email, password);
      router.push("/dashboard");
    } catch (error) {
      // If sign up fails, try to login
      try {
        await login(email, password);
        router.push("/dashboard");
      } catch (loginError) {
        setError("Failed to sign up or login. Please check your credentials.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col flex-1 justify-center items-center gap-8 py-12 px-4">
      <div className="flex flex-col items-center gap-6">
        <h3
          className={`text-center text-6xl sm:text-7xl md:text-8xl ${fugaz.className} textGradient`}
        >
          Login / Register
        </h3>
        <p className="text-xl text-slate-600">This is your first step!</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-6 w-full max-w-[400px]"
      >
        {error && (
          <div
            className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
            role="alert"
          >
            <span className="block sm:inline">{error}</span>
          </div>
        )}

        <div className="relative">
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="relative">
          <input
            className="w-full px-4 py-3 rounded-lg border-2 border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all duration-200 bg-white/50 backdrop-blur-sm"
            placeholder="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <Button
          text={isLoading ? "Loading..." : "Submit"}
          full
          disabled={isLoading}
        />
      </form>
      <p>
        Don't have an Account? <span className="text-indigo-600">Sign up</span>
      </p>
    </div>
  );
}

export default Login;
