"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface BackgroundBubble {
  width: number;
  height: number;
  left: number;
  top: number;
  duration: number;
  background: string;
}

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [bubbles, setBubbles] = useState<BackgroundBubble[]>([]);

  useEffect(() => {
    // Generate background bubbles only on client side
    const newBubbles = Array(6)
      .fill(null)
      .map(() => ({
        width: Math.random() * 400 + 200,
        height: Math.random() * 400 + 200,
        left: Math.random() * 100,
        top: Math.random() * 100,
        duration: Math.random() * 4 + 2,
        background: `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        }, 0.15)`,
      }));
    setBubbles(newBubbles);
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // or a loading state
  }

  return (
    <main className="mt-8 flex flex-col items-center justify-center min-h-screen relative overflow-hidden bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500 dark:from-indigo-900 dark:via-purple-900 dark:to-pink-900">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        {bubbles.map((bubble, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-float"
            animate={{
              x: [0, 30, 0],
              y: [0, 40, 0],
            }}
            transition={{
              duration: bubble.duration,
              repeat: Infinity,
              ease: "easeInOut",
            }}
            style={{
              width: `${bubble.width}px`,
              height: `${bubble.height}px`,
              left: `${bubble.left}%`,
              top: `${bubble.top}%`,
              background: bubble.background,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 py-16 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1 }}
          className="text-center text-white mb-20"
        >
          <motion.h1
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-5xl md:text-7xl font-bold mb-8 bg-clip-text text-transparent bg-gradient-to-r from-white to-purple-100 leading-tight"
          >
            به دنیای سوال و جواب خوش آمدید!
          </motion.h1>
          <p className="text-xl md:text-2xl mb-12 text-purple-50 max-w-3xl mx-auto leading-relaxed">
            دانش خود را به چالش بکشید، با دوستان رقابت کنید و جوایز هیجان‌انگیز
            ببرید.
          </p>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="inline-block"
          >
            <Link
              href="/register"
              className="bg-white text-purple-600 dark:bg-gray-900 dark:text-purple-300 px-10 py-5 rounded-full font-bold transition-all duration-300 shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)] hover:bg-purple-50"
            >
              شروع بازی
            </Link>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="grid md:grid-cols-3 gap-8 text-white text-center max-w-6xl mx-auto mb-24"
        >
          {[
            {
              title: "موضوعات متنوع",
              description:
                "از تاریخ و علوم گرفته تا ورزش و سرگرمی، موضوعات متنوعی را کاوش کنید و دانش خود را گسترش دهید.",
              icon: "🎯",
            },
            {
              title: "رقابت آنلاین",
              description:
                "با بازیکنان از سراسر ایران و جهان رقابت کنید، دوستان جدید پیدا کنید و مهارت‌های خود را محک بزنید.",
              icon: "🏆",
            },
            {
              title: "جوایز هفتگی",
              description:
                "با کسب امتیاز و رتبه‌بندی بالا، شانس خود را برای بردن جوایز هفتگی هیجان‌انگیز افزایش دهید.",
              icon: "🎁",
            },
          ].map((feature, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.03, y: -5 }}
              className="bg-white/10 dark:bg-gray-800/30 p-8 rounded-2xl backdrop-blur-lg border border-white/10 hover:border-white/20 transition-all duration-300 shadow-lg group"
            >
              <div className="text-4xl mb-6 transform group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 text-purple-50">
                {feature.title}
              </h3>
              <p className="text-purple-100">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>

        {/* How to Start Section */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-white text-center max-w-4xl mx-auto"
        >
          <h2 className="text-4xl font-bold mb-16 text-purple-50">
            چگونه شروع کنیم؟
          </h2>
          <ul className="text-right list-none space-y-6 mb-20">
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
                transition={{ delay: index * 0.1 + 0.8 }}
                className="flex items-center gap-6 bg-white/5 hover:bg-white/10 p-6 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
              >
                <span className="flex-shrink-0 w-10 h-10 bg-white/20 rounded-full flex items-center justify-center text-xl font-bold">
                  {index + 1}
                </span>
                <span className="text-lg text-purple-50">{step}</span>
              </motion.li>
            ))}
          </ul>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 }}
            className="text-center"
          >
            <h3 className="text-3xl mb-10 text-purple-50">
              آماده‌اید تا دانش خود را به چالش بکشید؟
            </h3>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block"
            >
              <Link
                href="/register"
                className="bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white px-14 py-5 rounded-full font-bold transition-all duration-300 shadow-lg hover:shadow-2xl border border-white/20"
              >
                همین حالا شروع کنید
              </Link>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </main>
  );
}
