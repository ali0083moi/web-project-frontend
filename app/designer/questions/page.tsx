"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Plus, Filter, Loader2, Pencil, Trash2, Search, X } from "lucide-react";
import { Dialog } from "@/components/ui/dialog";
import QuestionFormModal from "@/components/QuestionFormModal";
import axios from "axios";
import ConfirmationModal from "@/components/ConfirmationModal";

interface Question {
  id: number;
  text: string;
  category: string;
  category_id: number;
  difficulty: string;
  created_at: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  correct_answer?: number;
  related_question_ids?: number[];
}

export default function QuestionsPage() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState("همه");
  const [selectedDifficulty, setSelectedDifficulty] = useState("همه");
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);
  const [categories, setCategories] = useState<string[]>(["همه"]);
  const difficulties = ["همه", "easy", "medium", "hard"];
  const [searchQuery, setSearchQuery] = useState("");
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [questionToDelete, setQuestionToDelete] = useState<number | null>(null);

  useEffect(() => {
    fetchCategories();
    fetchQuestions();
  }, [selectedCategory, selectedDifficulty]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const categoryNames = [
        "همه",
        ...response.data.categories.map((cat: any) => cat.name),
      ];
      setCategories(categoryNames);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchQuestions = async () => {
    setLoading(true);
    try {
      let url = "/api/questions/my";
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

  const handleDeleteClick = (id: number) => {
    setQuestionToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!questionToDelete) return;

    try {
      await axios.delete(`/api/questions/${questionToDelete}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchQuestions();
    } catch (error) {
      console.error("Error deleting question:", error);
    }
  };

  const filteredQuestions = questions.filter((question) =>
    question.text.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen pt-28 pb-10 px-4 bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 text-right">
                مدیریت سوالات
              </h1>
              <p className="text-white/80 text-right">
                سوالات خود را مدیریت کنید و سوالات جدید اضافه کنید
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 items-center">
              <button
                onClick={() => setIsCreateModalOpen(true)}
                className="flex items-center gap-2 bg-white/10 hover:bg-white/20 
                           text-white px-6 py-3 rounded-xl transition-all duration-300
                           whitespace-nowrap"
              >
                <Plus className="w-5 h-5" />
                <span>افزودن سوال جدید</span>
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-col sm:flex-row gap-4">
            <div className="relative flex-grow">
              <input
                type="text"
                placeholder="جستجو در سوالات..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white/10 text-white rounded-xl px-4 py-3 pr-11 
                           outline-none focus:ring-2 focus:ring-white/20 
                           placeholder:text-white/60 text-right
                           backdrop-blur-md hover:bg-white/20 transition-all duration-300"
                dir="rtl"
              />
              <div className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60">
                <Search className="w-5 h-5" />
              </div>
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 
                             text-white/60 hover:text-white/80 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="bg-white/10 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 min-w-[160px]"
            >
              {categories.map((category) => (
                <option
                  key={category}
                  value={category}
                  className="text-gray-900"
                >
                  {category}
                </option>
              ))}
            </select>

            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="bg-white/10 text-white rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-white/20 min-w-[160px]"
            >
              {difficulties.map((difficulty) => (
                <option
                  key={difficulty}
                  value={difficulty}
                  className="text-gray-900"
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
          </div>

          {searchQuery && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="mt-4 text-sm text-white/60 text-right"
            >
              {filteredQuestions.length} سوال یافت شد
            </motion.div>
          )}
        </motion.div>

        {loading ? (
          <div className="flex items-center justify-center h-64">
            <Loader2 className="w-8 h-8 text-white animate-spin" />
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-sm rounded-3xl p-8">
            <div className="overflow-x-auto">
              <table className="w-full text-right">
                <thead>
                  <tr className="border-b border-white/10">
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
                    <th className="px-6 py-4 text-sm font-medium text-white/80">
                      عملیات
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {filteredQuestions.map((question, index) => (
                    <motion.tr
                      key={question.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="border-b border-white/5 hover:bg-white/5"
                    >
                      <td className="px-6 py-4 text-white">{question.text}</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                          {question.category}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                            question.difficulty === "easy"
                              ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
                              : question.difficulty === "medium"
                              ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300"
                              : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
                          }`}
                        >
                          {question.difficulty === "easy"
                            ? "آسان"
                            : question.difficulty === "medium"
                            ? "متوسط"
                            : "سخت"}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-white">
                        {new Date(question.created_at).toLocaleDateString(
                          "fa-IR"
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <button
                            onClick={() => setEditingQuestion(question)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Pencil className="w-4 h-4 text-white" />
                          </button>
                          <button
                            onClick={() => handleDeleteClick(question.id)}
                            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4 text-red-400" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        <QuestionFormModal
          isOpen={isCreateModalOpen}
          onClose={() => setIsCreateModalOpen(false)}
          onSuccess={() => {
            setIsCreateModalOpen(false);
            fetchQuestions();
          }}
        />

        {editingQuestion && (
          <QuestionFormModal
            isOpen={!!editingQuestion}
            onClose={() => setEditingQuestion(null)}
            onSuccess={() => {
              setEditingQuestion(null);
              fetchQuestions();
            }}
            question={editingQuestion}
          />
        )}

        <ConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleConfirmDelete}
          title="حذف سوال"
          description="آیا از حذف این سوال اطمینان دارید؟"
        />
      </div>
    </div>
  );
}
