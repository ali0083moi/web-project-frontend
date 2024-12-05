"use client";
import Link from "next/link";
import { useState } from "react";
import { ThemeToggle } from "../theme-toggle";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav
      className="bg-neutral-200/80 dark:bg-neutral-800/80 backdrop-blur-sm text-white shadow-lg fixed top-0 w-full z-50"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between h-16">
          {/* Logo and Brand */}
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold">
              کوییز گیم
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-4 space-x-reverse">
            <Link
              href="/leaderboard"
              className="px-3 py-2 rounded-md hover:bg-gray-700 transition"
            >
              جدول امتیازات
            </Link>
            <Link
              href="/about"
              className="px-3 py-2 rounded-md hover:bg-gray-700 transition"
            >
              درباره ما
            </Link>
            <Link
              href="/login"
              className="px-4 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition mr-2"
            >
              ورود
            </Link>
            <Link
              href="/register"
              className="px-4 py-2 bg-green-600 rounded-md hover:bg-green-700 transition"
            >
              ثبت نام
            </Link>
            <ThemeToggle />
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md hover:bg-gray-700 focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${
            isMenuOpen ? "max-h-[300px] opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-2 text-right flex flex-col items-center w-full">
            <Link
              href="/leaderboard"
              className="block px-3 py-2 rounded-md hover:bg-gray-700 transition"
            >
              جدول امتیازات
            </Link>
            <Link
              href="/about"
              className="block px-3 py-2 rounded-md hover:bg-gray-700 transition"
            >
              درباره ما
            </Link>
            <div className="flex flex-row items-center justify-center gap-4 w-full">
              <Link
                href="/login"
                className="block px-3 py-2 bg-blue-600 rounded-md hover:bg-blue-700 transition"
              >
                ورود
              </Link>
              <Link
                href="/register"
                className="block px-3 py-2 bg-green-600 rounded-md hover:bg-blue-700 transition"
              >
                ثبت نام
              </Link>
            </div>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </nav>
  );
}
