"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Trophy, Dices, Users, Brain, X, FileEdit } from "lucide-react";
import DesignerQuestionsTable from "@/components/DesignerQuestionTable";
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
  created_at: string;
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
      const response = await axios.get("/api/questions/random", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
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
          fetch("/api/dashboard", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }),
          fetch("/api/questions/my", {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
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
            <FileEdit className="w-80 h-80 text-white" />
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
                <FileEdit className="w-5 h-5 text-white" />
              </div>
            </div>
            <div className="text-center md:text-right flex-grow">
              <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                <h1 className="text-3xl font-bold text-white">
                  {user.username}
                </h1>
                <span className="px-2 py-1 text-xs font-medium bg-indigo-500/20 text-indigo-200 rounded-full border border-indigo-500/30">
                  طراح سوال
                </span>
              </div>
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

        {/* Questions Table */}
        <DesignerQuestionsTable questions={questions} />
      </div>
    </div>
  );
}
