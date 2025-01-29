"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Filter, Loader2, Signal } from "lucide-react";
import axios from "axios";
import QuestionBox from "@/components/QuestionBox";

interface Question {
  id: string;
  text: string;
  category: string;
  difficulty: string;
}

interface QuestionDetail extends Question {
  option1: string;
  option2: string;
  option3: string;
  option4: string;
}

interface AnswerResponse {
  message: string;
  is_correct: boolean;
  correct_answer?: string;
}

interface Category {
  id: number;
  name: string;
  description: string;
  question_count: number;
}

const difficulties = ["همه", "easy", "medium", "hard"];

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [categories, setCategories] = useState<string[]>(["همه"]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [selectedDifficulty, setSelectedDifficulty] = useState("همه");
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionDetail | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerResponse, setAnswerResponse] = useState<AnswerResponse | null>(
    null
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchQuestions();
  }, [selectedCategory, selectedDifficulty]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("http://localhost:8080/api/categories", {
        headers: {
          Authorization: `Bearer ${
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("auth-token="))
              ?.split("=")[1] || ""
          }`,
        },
      });
      const categoryNames = [
        "همه",
        ...response.data.categories?.map((cat: Category) => cat.name),
      ];
      setCategories(categoryNames);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      let url = "http://localhost:8080/api/questions/feed";
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
          Authorization: `Bearer ${
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("auth-token="))
              ?.split("=")[1] || ""
          }`,
        },
      });
      setQuestions(response.data.questions);
    } catch (error) {
      console.error("Error fetching questions:", error);
    } finally {
      setLoading(false);
    }
  };

  const fetchQuestionDetails = async (id: string) => {
    try {
      const response = await axios.get(
        `http://localhost:8080/api/questions/${id}`,
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
      return response.data;
    } catch (error) {
      console.error("Error fetching question details:", error);
      return null;
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

  const handleAnswerSubmit = async (optionNumber: number) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/answers",
        {
          question_id: selectedQuestion?.id,
          selected_option: `option${optionNumber + 1}`,
        },
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

      setAnswerResponse(response.data);
      setIsAnswered(true);

      // Close dialog after 3 seconds
      setTimeout(() => {
        setIsAnswered(false);
        setAnswerResponse(null);
        setSelectedQuestion(null);
        closeButtonRef.current?.click();
      }, 3000);
    } catch (error) {
      console.error("Error submitting answer:", error);
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
                      {categories?.map((category) => (
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
        ) : questions.length === 0 ? (
          <div className="flex items-center justify-center h-64">
            <p className="text-white text-lg text-center">
              هیچ سوال جدیدی که شما به آن پاسخ نداده باشید وجود ندارد.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {questions?.map((question, index) => (
              <QuestionBox
                key={question.id}
                question={question}
                index={index}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
