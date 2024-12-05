"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BackgroundBubble {
  width: number;
  height: number;
  left: number;
  top: number;
  delay: number;
  duration: number;
}

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4 py-32 md:p-24 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-purple-900 dark:via-pink-900 dark:to-red-900 min-h-screen relative overflow-hidden">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center text-white mb-16 relative z-10"
      >
        <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-white to-gray-100">
          به دنیای سوال و جواب خوش آمدید!
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-100">
          دانش خود را به چالش بکشید، با دوستان رقابت کنید و جوایز هیجان‌انگیز
          ببرید.
        </p>
        <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
          <Link
            href="/register"
            className="bg-white text-purple-600 dark:bg-gray-800 dark:text-purple-400 px-8 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl"
          >
            شروع بازی
          </Link>
        </motion.div>
      </motion.div>

      {/* Features Grid */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="grid md:grid-cols-3 gap-8 text-white text-center max-w-6xl mb-16 relative z-10"
      >
        {[
          {
            title: "موضوعات متنوع",
            description:
              "از تاریخ و علوم گرفته تا ورزش و سرگرمی، موضوعات متنوعی را کاوش کنید و دانش خود را گسترش دهید.",
          },
          {
            title: "رقابت آنلاین",
            description:
              "با بازیکنان از سراسر ایران و جهان رقابت کنید، دوستان جدید پیدا کنید و مهارت‌های خود را محک بزنید.",
          },
          {
            title: "جوایز هفتگی",
            description:
              "با کسب امتیاز و رتبه‌بندی بالا، شانس خود را برای بردن جوایز هفتگی هیجان‌انگیز افزایش دهید.",
          },
        ].map((feature, index) => (
          <motion.div
            key={index}
            whileHover={{ scale: 1.05 }}
            className="bg-white/10 dark:bg-gray-800/50 p-8 rounded-xl backdrop-blur-sm hover:bg-white/20 transition-all duration-300 shadow-lg"
          >
            <h3 className="text-2xl font-bold mb-4">{feature.title}</h3>
            <p>{feature.description}</p>
          </motion.div>
        ))}
      </motion.div>

      {/* How to Start Section */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.4 }}
        className="text-white text-center max-w-4xl relative z-10"
      >
        <h2 className="text-4xl font-bold mb-12">چگونه شروع کنیم؟</h2>
        <ul className="text-right list-none space-y-6 mb-16">
          {[
            "ثبت نام کنید و یک حساب کاربری بسازید.",
            "موضوع مورد علاقه خود را انتخاب کنید.",
            "به سوالات پاسخ دهید و امتیاز جمع کنید.",
            "با دوستان خود رقابت کنید و در لیدربورد بالا بروید.",
            "جوایز هفتگی را برنده شوید و از بازی لذت ببرید!",
          ].map((step, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 + 0.5 }}
              className="flex items-center gap-4 bg-white/5 p-4 rounded-lg"
            >
              <span className="flex-shrink-0 w-8 h-8 bg-white/20 rounded-full flex items-center justify-center">
                {index + 1}
              </span>
              {step}
            </motion.li>
          ))}
        </ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center"
        >
          <h3 className="text-3xl mb-8">
            آماده‌اید تا دانش خود را به چالش بکشید؟
          </h3>
          <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
            <Link
              href="/register"
              className="bg-white text-purple-600 px-12 py-4 rounded-full font-bold hover:bg-opacity-90 transition-all shadow-lg hover:shadow-xl inline-block"
            >
              همین حالا شروع کنید
            </Link>
          </motion.div>
        </motion.div>
      </motion.div>
    </main>
  );
}
