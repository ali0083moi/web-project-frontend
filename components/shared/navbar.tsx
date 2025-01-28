"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ThemeToggle } from "../theme-toggle";
import {
  Bars3Icon as MenuIcon,
  XMarkIcon as XIcon,
} from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";

interface User {
  role: "player" | "designer" | null;
  name: string;
}

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8080/api/dashboard", {
          credentials: "include",
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("auth-token="))
                ?.split("=")[1] || ""
            }`,
          },
        });
        if (response.ok) {
          const data = await response.json();
          if (data.user) {
            setUser(data.user);
          }
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();

    // Add event listener for auth changes
    window.addEventListener("auth-change", checkAuth);

    // Cleanup
    return () => {
      window.removeEventListener("auth-change", checkAuth);
    };
  }, []);

  if (isLoading) {
    return (
      <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md">
        <div className="container mx-auto px-4 py-3">
          <div className="h-12 animate-pulse bg-gray-200 dark:bg-gray-800 rounded-lg" />
        </div>
      </nav>
    );
  }

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-md shadow-sm"
    >
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <Link
            href="/"
            className="text-2xl font-bold text-purple-600 dark:text-purple-400"
          >
            کوئیزلند
          </Link>

          {/* Mobile Menu Toggle Button */}
          <button
            className="md:hidden text-gray-600 dark:text-gray-300"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <XIcon className="h-6 w-6" />
            ) : (
              <MenuIcon className="h-6 w-6" />
            )}
          </button>

          {/* Desktop Menu (Hidden on Mobile) */}
          <div className="hidden md:flex items-center space-x-4 rtl:space-x-reverse">
            {user ? (
              <div className="flex items-center space-x-4 rtl:space-x-reverse">
                {user.role === "player" && (
                  <>
                    <Link href="/player/dashboard" className="nav-link">
                      داشبورد
                    </Link>
                    <Link href="/leaderboard" className="nav-link">
                      لیدربورد
                    </Link>
                    <Link href="/player/questions" className="nav-link">
                      چالش‌ها
                    </Link>
                  </>
                )}
                {user.role === "designer" && (
                  <>
                    <Link href="/designer/dashboard" className="nav-link">
                      داشبورد
                    </Link>
                    <Link href="/designer/questions" className="nav-link">
                      مدیریت سوالات
                    </Link>
                    <Link href="/designer/categories" className="nav-link">
                      مدیریت دسته‌بندی‌ها
                    </Link>
                  </>
                )}
                <button
                  onClick={async () => {
                    const response = await fetch("/api/auth/logout", {
                      method: "POST",
                      credentials: "include",
                    });

                    if (response.ok) {
                      setUser(null);
                      router.push("/");
                    }
                  }}
                  className="btn-secondary"
                >
                  خروج
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-2 rtl:space-x-reverse">
                <Link href="/about" className="nav-link">
                  درباره ما
                </Link>
                <Link href="/login" className="btn-secondary">
                  ورود
                </Link>
                <Link href="/register" className="btn-primary">
                  ثبت نام
                </Link>
              </div>
            )}
            <ThemeToggle />
          </div>
        </div>

        {/* Mobile Menu */}
        <div
          className={`${
            isMobileMenuOpen ? "max-h-screen" : "max-h-0"
          } overflow-hidden transition-all duration-500 ease-in-out md:hidden`}
        >
          <div className="flex flex-col space-y-2 mt-2">
            {user ? (
              <>
                <button
                  onClick={async () => {
                    const response = await fetch("/api/auth/logout", {
                      method: "POST",
                      credentials: "include",
                    });

                    if (response.ok) {
                      setUser(null);
                      setIsMobileMenuOpen(false);
                      router.push("/");
                    }
                  }}
                  className="btn-secondary"
                >
                  خروج
                </button>
                {user.role === "player" && (
                  <>
                    <Link
                      href="/dashboard"
                      className="nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      داشبورد
                    </Link>
                    <Link
                      href="/leaderboard"
                      className="nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      لیدربورد
                    </Link>
                    <Link
                      href="/player/questions"
                      className="nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      چالش‌ها
                    </Link>
                  </>
                )}
                {user.role === "designer" && (
                  <>
                    <Link
                      href="/designer/dashboard"
                      className="nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      داشبورد
                    </Link>
                    <Link
                      href="/designer/questions"
                      className="nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      مدیریت سوالات
                    </Link>
                    <Link
                      href="/designer/categories"
                      className="nav-link"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      مدیریت دسته‌بندی‌ها
                    </Link>
                  </>
                )}
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="btn-secondary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ورود
                </Link>
                <Link
                  href="/register"
                  className="btn-primary"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  ثبت نام
                </Link>
                <Link
                  href="/about"
                  className="nav-link"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  درباره ما
                </Link>
              </>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.nav>
  );
}
