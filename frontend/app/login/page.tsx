'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [passowrd, setPassword] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.get("http://localhost:8000/api/login",
      {params : {
        email : email,
        password : passowrd
      }}
    )
    console.log(response.data.token);
    // const user1Id = localStorage.getItem("user1");
    // if (!user1Id) localStorage.setItem("user1Id")
    const token = response.data.token;
    localStorage.setItem("token", token);

    console.log("Jwt token stored")
  }

  return (
    <>
      {/* We inject the keyframes for the background blob animation here 
        so we don't need to touch global.css or tailwind.config.ts
      */}
      <style jsx global>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
      `}</style>

      <div className="font-['Inter',sans-serif] antialiased bg-[#f6f7f8] dark:bg-[#101822] text-slate-800 dark:text-slate-200 min-h-screen flex items-center justify-center p-4 overflow-hidden relative">
        
        {/* Main Container */}
        <main className="w-full max-w-md relative z-10">
          
          {/* Decorative Background Elements */}
          <div className="absolute -top-20 -left-20 w-64 h-64 bg-[#136dec]/10 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob"></div>
          <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-[#136dec]/20 rounded-full blur-3xl mix-blend-multiply dark:mix-blend-screen animate-blob animation-delay-2000"></div>

          {/* Login Card */}
          <div className="relative bg-[#ffffff] dark:bg-[#1a2432] p-8 md:p-10 rounded-xl shadow-[0_4px_6px_-1px_rgba(19,109,236,0.05),0_2px_4px_-1px_rgba(19,109,236,0.03)] border border-slate-200 dark:border-slate-700/50 backdrop-blur-sm">
            
            {/* Logo Section */}
            <div className="flex flex-col items-center mb-8">
              <div className="w-12 h-12 bg-[#136dec] rounded-lg flex items-center justify-center mb-4 shadow-[0_0_15px_rgba(19,109,236,0.15)]">
                {/* Chat Bubble Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="text-white w-6 h-6">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
                </svg>
              </div>
              <h1 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">Welcome back</h1>
              <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm text-center">Please enter your details to sign in.</p>
            </div>

            {/* Login Form */}
            <form onSubmit={onSubmit} method="POST" className="space-y-5">
              
              {/* Email Field */}
              <div className="space-y-1.5">
                <label htmlFor="email" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                  Email
                </label>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    {/* Mail Icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-slate-400 group-focus-within:text-[#136dec] w-5 h-5 transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                    </svg>
                  </div>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@company.com"
                    className="block w-full pl-10 pr-3 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#136dec]/20 focus:border-[#136dec] sm:text-sm bg-slate-50 dark:bg-slate-900/50 transition-all duration-200"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label htmlFor="password" className="block text-sm font-medium text-slate-700 dark:text-slate-300">
                    Password
                  </label>
                </div>
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                     {/* Lock Icon */}
                     <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-slate-400 group-focus-within:text-[#136dec] w-5 h-5 transition-colors">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
                    </svg>
                  </div>
                  <input
                    id="password"
                    name="password"
                    type={showPassword ? "text" : "password"}
                    autoComplete="current-password"
                    required
                    value={passowrd}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="block w-full pl-10 pr-10 py-2.5 border border-slate-200 dark:border-slate-700 rounded-lg text-slate-900 dark:text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-[#136dec]/20 focus:border-[#136dec] sm:text-sm bg-slate-50 dark:bg-slate-900/50 transition-all duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer focus:outline-none"
                  >
                    {showPassword ? (
                      /* Eye Off Icon */
                       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                      </svg>
                    ) : (
                      /* Eye Icon */
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 w-5 h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Forgot Password & Remember Me */}
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="remember-me"
                    type="checkbox"
                    className="h-4 w-4 text-[#136dec] focus:ring-[#136dec] border-slate-300 rounded cursor-pointer"
                  />
                  <label htmlFor="remember-me" className="ml-2 block text-sm text-slate-500 dark:text-slate-400 cursor-pointer select-none">
                    Remember me
                  </label>
                </div>
                <div className="text-sm">
                  <Link href="#" className="font-medium text-[#136dec] hover:text-[#115dc7] transition-colors">
                    Forgot password?
                  </Link>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 px-4 border border-transparent rounded-lg shadow-sm text-sm font-semibold text-white bg-[#136dec] hover:bg-[#115dc7] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#136dec] transition-all duration-200 transform active:scale-[0.98]"
                >
                  Sign in
                </button>
              </div>

              {/* Social Login Divider */}
              <div className="relative mt-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-[#ffffff] dark:bg-[#1a2432] text-slate-500 dark:text-slate-400">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Social Button */}
              <div className="mt-6 grid grid-cols-1 gap-3">
                <button
                  type="button"
                  className="w-full inline-flex justify-center items-center py-2.5 px-4 border border-slate-200 dark:border-slate-700 rounded-lg shadow-sm bg-white dark:bg-slate-800 text-sm font-medium text-slate-700 dark:text-slate-200 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
                >
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"></path>
                    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"></path>
                    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"></path>
                    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"></path>
                  </svg>
                  Google
                </button>
              </div>
            </form>

            {/* Registration Link */}
            <p className="mt-8 text-center text-sm text-slate-500 dark:text-slate-400">
              Don't have an account?{' '}
              <Link href="#" className="font-semibold text-[#136dec] hover:text-[#115dc7] transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Footer Links */}
          <div className="mt-8 flex justify-center space-x-6 text-xs text-slate-400 dark:text-slate-500">
            <Link href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Terms of Service</Link>
            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mt-1.5"></span>
            <Link href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Privacy Policy</Link>
            <span className="w-1 h-1 bg-slate-300 dark:bg-slate-700 rounded-full mt-1.5"></span>
            <Link href="#" className="hover:text-slate-600 dark:hover:text-slate-300 transition-colors">Help</Link>
          </div>
        </main>

        {/* Side Graphic for desktop balance (Subtle) */}
        <div className="hidden lg:block fixed right-0 bottom-0 pointer-events-none opacity-50 dark:opacity-20">
          <svg width="400" height="400" viewBox="0 0 400 400" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="400" cy="400" r="300" fill="url(#paint0_radial)" />
            <defs>
              <radialGradient id="paint0_radial" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(400 400) rotate(-90) scale(300)">
                <stop stopColor="#136dec" stopOpacity="0.1" />
                <stop offset="1" stopColor="#136dec" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
      </div>
    </>
  );
}