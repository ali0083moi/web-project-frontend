"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Dices, Users, Brain, X } from "lucide-react";
import QuestionsTable from "@/components/QuestionsTable";
import QuestionBox from "@/components/QuestionBox";
import Link from "next/link";
import axios from "axios";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogClose,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface DashboardUser {
  id: string;
  username: string;
  email: string;
  role: string;
  points: number;
  followings: number;
  followers: number;
  avatar_url: string;
}

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: string;
  selected_option: string;
  is_correct: boolean;
}

interface RandomQuestion {
  id: string;
  text: string;
  category: string;
  difficulty: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

export default function PlayerDashboard() {
  const [user, setUser] = useState<DashboardUser | null>(null);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [randomQuestion, setRandomQuestion] = useState<RandomQuestion | null>(
    null
  );
  const [showRandomQuestion, setShowRandomQuestion] = useState(false);

  const handleRandomQuestion = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8080/api/questions/random",
        {
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("auth-token="))
                ?.split("=")[1] || ""
            }`,
          },
        }
      );
      setRandomQuestion(response.data);
      setShowRandomQuestion(true);
    } catch (error) {
      console.error("Error fetching random question:", error);
    }
  };

  const handleQuestionClose = () => {
    setShowRandomQuestion(false);
    setRandomQuestion(null);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [dashboardResponse, questionsResponse] = await Promise.all([
          fetch("http://localhost:8080/api/dashboard", {
            headers: {
              Authorization: `Bearer ${
                document.cookie
                  .split("; ")
                  .find((row) => row.startsWith("auth-token="))
                  ?.split("=")[1] || ""
              }`,
            },
          }),
          fetch("http://localhost:8080/api/questions/answered", {
            headers: {
              Authorization: `Bearer ${
                document.cookie
                  .split("; ")
                  .find((row) => row.startsWith("auth-token="))
                  ?.split("=")[1] || ""
              }`,
            },
          }),
        ]);

        const dashboardData = await dashboardResponse.json();
        const questionsData = await questionsResponse.json();

        setUser(dashboardData.user);
        setQuestions(questionsData.questions);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-950">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-950">
        <div className="text-white text-xl">خطا در بارگذاری اطلاعات</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-950 py-28 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Profile Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8 relative overflow-hidden"
        >
          {/* Decorative Background Icon */}
          <div className="absolute -left-20 top-1/2 -translate-y-1/2 transform rotate-12 opacity-5 hidden md:block">
            <Trophy className="w-80 h-80 text-white" />
          </div>

          <div className="flex flex-col md:flex-row items-center gap-8 relative z-10">
            <div className="relative">
              <img
                src={user.avatar_url}
                alt={user.username}
                width={120}
                height={120}
                className="rounded-full border-4 border-white/20"
              />
              <div className="absolute -bottom-2 right-0 bg-purple-500 rounded-full p-2">
                <Trophy className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-center md:text-right flex-grow">
              <h1 className="text-3xl font-bold text-white mb-2">
                {user.username}
              </h1>
              <p className="text-white/80 mb-4">{user.email}</p>
              <div className="flex justify-center md:justify-start gap-6">
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {user.points.toLocaleString("fa-IR")}
                  </p>
                  <p className="text-sm text-white/80">امتیاز</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {user.followers.toLocaleString("fa-IR")}
                  </p>
                  <p className="text-sm text-white/80">دنبال‌کننده</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-white">
                    {user.followings.toLocaleString("fa-IR")}
                  </p>
                  <p className="text-sm text-white/80">دنبال‌شونده</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8 w-full"
        >
          <Link href="/player/questions" className="w-full">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white px-6 py-4 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Brain className="w-6 h-6" />
              <span>انتخاب سوال جدید</span>
            </motion.button>
          </Link>

          <Dialog
            open={showRandomQuestion}
            onOpenChange={setShowRandomQuestion}
          >
            <DialogTrigger asChild>
              <motion.button
                onClick={handleRandomQuestion}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white px-6 py-4 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
              >
                <Dices className="w-6 h-6" />
                <span>سوال تصادفی</span>
              </motion.button>
            </DialogTrigger>

            <DialogContent className="bg-transparent border-none p-0 fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[95vw] md:w-auto">
              <DialogHeader>
                <DialogTitle className="sr-only">سوال تصادفی</DialogTitle>
                <div className="absolute left-1/2 -translate-x-1/2 top-[100%] z-50 flex gap-2">
                  <motion.button
                    onClick={handleRandomQuestion}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
                  >
                    <Dices className="w-5 h-5 text-white" />
                  </motion.button>
                  <DialogClose asChild>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors"
                    >
                      <X className="w-5 h-5 text-white" />
                    </motion.button>
                  </DialogClose>
                </div>
              </DialogHeader>
              {randomQuestion && (
                <QuestionBox
                  question={{
                    id: randomQuestion.id,
                    text: randomQuestion.text,
                    category: randomQuestion.category,
                    difficulty: randomQuestion.difficulty,
                  }}
                  index={0}
                  onQuestionClose={handleQuestionClose}
                />
              )}
            </DialogContent>
          </Dialog>

          <Link className="w-full" href="/users">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600 text-white px-6 py-4 rounded-2xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              <Users className="w-6 h-6" />
              <span>یافتن کاربران جدید</span>
            </motion.button>
          </Link>
        </motion.div>

        {/* Questions Table */}
        <QuestionsTable questions={questions} />
      </div>
    </div>
  );
}
