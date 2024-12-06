"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Check, Filter, Loader2, Signal } from "lucide-react";
import axios from "axios";

interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: string;
}

const categories = [
  "همه",
  "تاریخ",
  "جغرافیا",
  "کامپیوتر",
  "نجوم",
  "فیزیک",
  "شیمی",
  "زیست‌شناسی",
  "پزشکی",
];

const difficulties = ["همه", "easy", "medium", "hard"];

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [selectedDifficulty, setSelectedDifficulty] = useState("همه");
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  useEffect(() => {
    fetchQuestions();
  }, [selectedCategory, selectedDifficulty]);

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      let url = "/api/questions";
      const params = new URLSearchParams();

      if (selectedCategory !== "همه") {
        params.append("category", selectedCategory);
      }
      if (selectedDifficulty !== "همه") {
        params.append("difficulty", selectedDifficulty);
      }

      if (params.toString()) {
        url += `?${params.toString()}`;
      }

      const response = await axios.get(url, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "hard":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-10 px-4 bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8 relative overflow-hidden"
        >
          <motion.div
            initial={{ rotate: -10, scale: 0.9, opacity: 0 }}
            animate={{ rotate: 0, scale: 1, opacity: 0.05 }}
            transition={{ duration: 0.8 }}
            className="absolute -right-20 top-1/2 transform -translate-y-1/2 pointer-events-none"
          >
            <Filter className="w-96 h-96 text-white transform -rotate-12" />
          </motion.div>

          <div className="relative z-10">
            <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.2 }}
                className="w-full md:w-auto"
              >
                <h1 className="text-3xl font-bold text-white mb-2 text-right">
                  سوالات موجود
                </h1>
                <p className="text-white/80 text-right text-lg">
                  دسته‌بندی و سطح مورد نظر خود را انتخاب کنید
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
                className="w-full md:w-auto"
              >
                <div className="flex flex-col sm:flex-row gap-4 justify-end">
                  <div className="relative group">
                    <select
                      value={selectedCategory}
                      onChange={(e) => setSelectedCategory(e.target.value)}
                      className="w-full sm:w-48 bg-white/10 text-white rounded-xl px-4 py-3 outline-none 
                                focus:ring-2 focus:ring-white/20 transition-all duration-300
                                backdrop-blur-md hover:bg-white/20"
                    >
                      {categories.map((category) => (
                        <option
                          key={category}
                          value={category}
                          className="text-gray-900 bg-purple-900"
                        >
                          {category}
                        </option>
                      ))}
                    </select>
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Filter className="w-5 h-5 text-white/70" />
                    </div>
                  </div>

                  <div className="relative group">
                    <select
                      value={selectedDifficulty}
                      onChange={(e) => setSelectedDifficulty(e.target.value)}
                      className="w-full sm:w-48 bg-white/10 text-white rounded-xl px-4 py-3 outline-none 
                                focus:ring-2 focus:ring-white/20 transition-all duration-300
                                backdrop-blur-md hover:bg-white/20"
                    >
                      {difficulties.map((difficulty) => (
                        <option
                          key={difficulty}
                          value={difficulty}
                          className="text-gray-900 bg-purple-900"
                        >
                          {difficulty === "همه"
                            ? "همه سطح‌ها"
                            : difficulty === "easy"
                            ? "آسان"
                            : difficulty === "medium"
                            ? "متوسط"
                            : "سخت"}
                        </option>
                      ))}
                    </select>
                    <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                      <Signal className="w-5 h-5 text-white/70" />
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
            <div className="absolute top-0 left-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/10 rounded-full blur-3xl"></div>
          </div>
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questions.map((question, index) => (
              <motion.div
                key={question.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex justify-between items-start mb-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                      question.difficulty
                    )}`}
                  >
                    {question.difficulty === "easy"
                      ? "آسان"
                      : question.difficulty === "medium"
                      ? "متوسط"
                      : "سخت"}
                  </span>
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                    {question.category}
                  </span>
                </div>
                <h3 className="text-white text-lg font-medium mb-4 text-right">
                  {question.text}
                </h3>
                <Dialog>
                  <DialogTrigger asChild>
                    <button
                      onClick={() => setSelectedQuestion(question)}
                      className="w-full bg-white/10 hover:bg-white/20 text-white py-2 px-4 rounded-lg transition-all duration-300"
                    >
                      پاسخ به سوال
                    </button>
                  </DialogTrigger>
                  <DialogContent className="bg-purple-900 text-white">
                    <DialogHeader>
                      <DialogTitle className="text-right">
                        {selectedQuestion?.text}
                      </DialogTitle>
                    </DialogHeader>
                    <div className="text-right">
                      {/* Answer form will be added here when the endpoint is ready */}
                      <p className="text-white/80">
                        این بخش پس از آماده شدن API پاسخ به سوال تکمیل خواهد شد.
                      </p>
                    </div>
                  </DialogContent>
                </Dialog>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}