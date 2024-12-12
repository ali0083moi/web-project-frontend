import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X, Check, ChevronDown } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import axios from "axios";

interface Question {
  id: number;
  text: string;
  category: string;
  category_id: number;
  difficulty: string;
  option1?: string;
  option2?: string;
  option3?: string;
  option4?: string;
  correct_answer?: number;
  related_question_ids?: number[];
}

interface QuestionFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
  question?: Question;
}

interface Category {
  id: number;
  name: string;
}

interface FormData {
  text: string;
  category_id: number;
  difficulty_level: string;
  option1: string;
  option2: string;
  option3: string;
  option4: string;
  correct_answer: number;
  related_question_ids: string[];
}

export default function QuestionFormModal({
  isOpen,
  onClose,
  onSuccess,
  question,
}: QuestionFormModalProps) {
  const initialFormState: FormData = {
    text: "",
    category_id: 0,
    difficulty_level: "easy",
    option1: "",
    option2: "",
    option3: "",
    option4: "",
    correct_answer: 1,
    related_question_ids: [],
  };

  const [formData, setFormData] = useState<FormData>(initialFormState);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [availableQuestions, setAvailableQuestions] = useState<Question[]>([]);

  useEffect(() => {
    fetchCategories();
    fetchAllQuestions();
    if (question?.id) {
      fetchAvailableQuestions();
    }
  }, [question]);

  const fetchCategories = async () => {
    try {
      const response = await axios.get("/api/categories/my", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setCategories(response.data.categories);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const fetchAvailableQuestions = async () => {
    try {
      if (!question?.id) {
        setAvailableQuestions([]);
        return;
      }

      const response = await axios.get(`/api/questions/${question.id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      setAvailableQuestions(response.data.questions || []);

      // Update form data with the received question details
      setFormData({
        ...formData,
        text: response.data.text,
        option1: response.data.option1,
        option2: response.data.option2,
        option3: response.data.option3,
        option4: response.data.option4,
        category_id: getCategoryId(response.data.category),
        difficulty_level: response.data.difficulty,
      });
    } catch (error) {
      console.error("Error fetching questions:", error);
      setAvailableQuestions([]);
    }
  };

  const fetchAllQuestions = async () => {
    try {
      const response = await axios.get("/api/questions", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      setAvailableQuestions(response.data.questions || []);
    } catch (error) {
      console.error("Error fetching all questions:", error);
      setAvailableQuestions([]);
    }
  };

  // Helper function to get category_id from category name
  const getCategoryId = (categoryName: string): number => {
    const categoryMap: { [key: string]: number } = {
      جغرافیا: 1,
      کامپیوتر: 2,
      نجوم: 3,
      فیزیک: 4,
      شیمی: 5,
      تاریخ: 6,
      زیست‌شناسی: 7,
      پزشکی: 8,
    };
    return categoryMap[categoryName] || 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (question) {
        await axios.put(`/api/questions/${question.id}`, formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
      } else {
        await axios.post("/api/questions", formData, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setFormData(initialFormState);
      }
      onSuccess();
    } catch (error) {
      console.error("Error submitting question:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-br from-purple-900 to-purple-950 text-white border-none shadow-2xl max-w-2xl w-[95%] rounded-2xl max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute left-4 top-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors group"
        >
          <X className="w-5 h-5 text-white/80 group-hover:text-white" />
        </button>

        <DialogHeader className="pt-4 pb-2">
          <DialogTitle className="text-2xl font-bold text-center">
            {question ? "ویرایش سوال" : "افزودن سوال جدید"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4 pb-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-right">
              متن سوال
            </label>
            <textarea
              value={formData.text}
              onChange={(e) =>
                setFormData({ ...formData, text: e.target.value })
              }
              className="w-full bg-white/10 rounded-lg px-4 py-3 text-right"
              rows={3}
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-medium text-right">
                دسته‌بندی
              </label>
              <select
                value={formData.category_id}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    category_id: Number(e.target.value),
                  })
                }
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-right"
                required
              >
                <option value="">انتخاب کنید</option>
                {categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-medium text-right">
                سطح سختی
              </label>
              <select
                value={formData.difficulty_level}
                onChange={(e) =>
                  setFormData({ ...formData, difficulty_level: e.target.value })
                }
                className="w-full bg-white/10 rounded-lg px-4 py-3 text-right"
                required
              >
                <option value="easy">آسان</option>
                <option value="medium">متوسط</option>
                <option value="hard">سخت</option>
              </select>
            </div>
          </div>

          <div className="space-y-4">
            <label className="block text-sm font-medium text-right">
              گزینه‌ها و پاسخ صحیح
            </label>
            <div className="grid grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((num) => (
                <div
                  key={num}
                  className={`
                    flex items-center gap-3 p-3 rounded-lg transition-all
                    ${
                      formData.correct_answer === num
                        ? "bg-purple-600/30 border-2 border-purple-500"
                        : "bg-white/10 hover:bg-white/15 cursor-pointer"
                    }
                  `}
                  onClick={() =>
                    setFormData({ ...formData, correct_answer: num })
                  }
                >
                  <div
                    className={`
                      min-w-[1.5rem] h-6 rounded-full flex items-center justify-center
                      ${
                        formData.correct_answer === num
                          ? "bg-purple-500"
                          : "bg-white/20"
                      }
                    `}
                  >
                    {formData.correct_answer === num && (
                      <Check className="w-4 h-4 text-white" />
                    )}
                  </div>
                  <input
                    value={formData[`option${num}` as keyof typeof formData]}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        [`option${num}`]: e.target.value,
                      })
                    }
                    onClick={(e) => e.stopPropagation()}
                    placeholder={`گزینه ${num}`}
                    className="w-full bg-transparent border-none focus:ring-0 text-right placeholder-white/50"
                    required
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-right">
              سوالات مرتبط
            </label>
            <div className="relative">
              <div className="w-full bg-white/10 rounded-lg px-4 py-3 text-right min-h-[8rem] max-h-48 overflow-y-auto">
                {(availableQuestions || [])
                  .filter((q) => q.id !== question?.id)
                  .map((q) => (
                    <div
                      key={q.id}
                      className={`
                        flex items-center gap-3 p-2 rounded-md mb-2 cursor-pointer transition-all
                        ${
                          formData.related_question_ids.includes(String(q.id))
                            ? "bg-purple-600/30 border border-purple-500"
                            : "hover:bg-white/10"
                        }
                      `}
                      onClick={() => {
                        const newIds = formData.related_question_ids.includes(
                          String(q.id)
                        )
                          ? formData.related_question_ids.filter(
                              (id) => id !== String(q.id)
                            )
                          : [...formData.related_question_ids, String(q.id)];
                        setFormData({
                          ...formData,
                          related_question_ids: newIds,
                        });
                      }}
                    >
                      <div
                        className={`
                        w-5 h-5 rounded flex items-center justify-center border
                        ${
                          formData.related_question_ids.includes(String(q.id))
                            ? "bg-purple-500 border-purple-500"
                            : "border-white/30"
                        }
                      `}
                      >
                        {formData.related_question_ids.includes(
                          String(q.id)
                        ) && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <span className="text-sm text-white/90 line-clamp-1">
                        {q.text}
                      </span>
                    </div>
                  ))}
              </div>
            </div>
            <p className="text-xs text-white/60 text-right mt-1">
              {formData.related_question_ids.length} سوال انتخاب شده
            </p>
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 transition-colors disabled:opacity-50"
            >
              {loading ? "در حال ارسال..." : question ? "ویرایش" : "افزودن"}
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
