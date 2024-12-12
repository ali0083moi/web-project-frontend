"use client";

import { motion } from "framer-motion";
import { Check, X } from "lucide-react";

interface Question {
  id: number;
  text: string;
  category: string;
  difficulty: string;
  created_at: string;
}

interface QuestionsTableProps {
  questions: Question[];
}

export default function DesignerQuestionsTable({
  questions,
}: QuestionsTableProps) {
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

  const getDifficultyText = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "آسان";
      case "medium":
        return "متوسط";
      case "hard":
        return "سخت";
      default:
        return difficulty;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white/10 backdrop-blur-sm rounded-3xl p-8"
    >
      <h2 className="text-2xl font-bold text-white mb-6 text-right">
        سوالات پاسخ داده شده
      </h2>
      <div className="relative">
        {/* Gradient Overlays for Scroll Indication */}
        <div className="absolute top-0 left-0 right-0 h-8 bg-gradient-to-b from-black/20 to-transparent z-10 pointer-events-none rounded-t-lg"></div>
        <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-black/20 to-transparent z-10 pointer-events-none rounded-b-lg"></div>

        {/* Scrollable Container */}
        <div className="overflow-y-auto max-h-[400px] rounded-lg scrollbar-thin scrollbar-thumb-white/20 scrollbar-track-transparent hover:scrollbar-thumb-white/30">
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead className="sticky top-0 bg-purple-900/80 backdrop-blur-sm z-20">
                <tr className="border-b border-white/10">
                  <th className="px-6 py-4 text-sm font-medium text-white/80">
                    شماره
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-white/80">
                    متن سوال
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-white/80">
                    دسته‌بندی
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-white/80">
                    سطح سختی
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-white/80">
                    تاریخ ایجاد
                  </th>
                </tr>
              </thead>
              <tbody>
                {questions.map((question, index) => (
                  <motion.tr
                    key={question.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="border-b border-white/5 hover:bg-white/5 transition-colors"
                  >
                    <td className="px-6 py-4 text-white">{question.id}</td>
                    <td className="px-6 py-4 text-white">{question.text}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                        {question.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${getDifficultyColor(
                          question.difficulty
                        )}`}
                      >
                        {getDifficultyText(question.difficulty)}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">
                      {question.created_at.split("T")[0]}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
