import { motion } from "framer-motion";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import axios from "axios";

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

interface QuestionBoxProps {
  question: Question;
  index: number;
  onQuestionClose?: () => void;
}

export default function QuestionBox({
  question,
  index,
  onQuestionClose,
}: QuestionBoxProps) {
  const [selectedQuestion, setSelectedQuestion] =
    useState<QuestionDetail | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [answerResponse, setAnswerResponse] = useState<AnswerResponse | null>(
    null
  );
  const closeButtonRef = useRef<HTMLButtonElement>(null);

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

      setTimeout(() => {
        setIsAnswered(false);
        setAnswerResponse(null);
        setSelectedQuestion(null);
        closeButtonRef.current?.click();
        onQuestionClose?.();
      }, 3000);
    } catch (error) {
      console.error("Error submitting answer:", error);
    }
  };

  return (
    <motion.div
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
            onClick={async () => {
              const details = await fetchQuestionDetails(question.id);
              setSelectedQuestion(details);
            }}
            className="w-full bg-white/10 hover:bg-white/20 text-white py-2.5 px-4 rounded-xl 
                     transition-all duration-300 flex items-center justify-center gap-2
                     hover:scale-[1.02] active:scale-[0.98] hover:shadow-lg"
          >
            <span>پاسخ به سوال</span>
            <motion.div
              initial={{ scale: 0.8 }}
              animate={{ scale: 1 }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              ⭐
            </motion.div>
          </button>
        </DialogTrigger>

        <DialogContent
          className="bg-gradient-to-br from-purple-900 to-purple-950 text-white 
                                border-none shadow-2xl max-w-2xl w-[95%] rounded-2xl
                                fixed left-[50%] top-[50%] translate-x-[-50%] translate-y-[-50%]
                                overflow-y-auto max-h-[90vh] md:max-h-[85vh]"
        >
          <DialogHeader className="space-y-4">
            <div className="flex items-center gap-3 bg-white/5 p-4 rounded-xl">
              <span
                className={`px-3 py-1 rounded-full text-sm font-medium ${getDifficultyColor(
                  selectedQuestion?.difficulty || ""
                )}`}
              >
                {selectedQuestion?.difficulty === "easy"
                  ? "آسان"
                  : selectedQuestion?.difficulty === "medium"
                  ? "متوسط"
                  : "سخت"}
              </span>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800">
                {selectedQuestion?.category}
              </span>
            </div>
            <DialogTitle className="text-right text-xl font-bold leading-relaxed">
              {selectedQuestion?.text}
            </DialogTitle>
          </DialogHeader>

          <div className="text-right mt-6">
            {selectedQuestion && (
              <div className="grid grid-cols-1 gap-4">
                {[
                  selectedQuestion.option1,
                  selectedQuestion.option2,
                  selectedQuestion.option3,
                  selectedQuestion.option4,
                ].map((option, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => !isAnswered && handleAnswerSubmit(index)}
                    className={`w-full text-right px-6 py-4 rounded-xl
                              transition-all duration-300
                              flex items-center gap-4 group
                              ${
                                isAnswered
                                  ? answerResponse?.correct_answer ===
                                    `option${index + 1}`
                                    ? "bg-green-500/20 border-green-500/50"
                                    : "bg-white/5 border-white/10"
                                  : "bg-white/5 hover:bg-white/15 border-white/10 hover:border-white/20"
                              }`}
                    disabled={isAnswered}
                  >
                    <span
                      className="w-8 h-8 rounded-lg bg-white/10 flex items-center justify-center
                                   text-white/70 group-hover:bg-white/20 transition-all"
                    >
                      {String.fromCharCode(65 + index)}
                    </span>
                    <span className="flex-1">{option}</span>
                    {isAnswered &&
                      answerResponse?.correct_answer ===
                        `option${index + 1}` && (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-green-400"
                        >
                          ✓
                        </motion.span>
                      )}
                  </motion.button>
                ))}

                {isAnswered && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className={`mt-4 p-4 rounded-xl ${
                      answerResponse?.is_correct
                        ? "bg-green-500/20 text-green-300"
                        : "bg-red-500/20 text-red-300"
                    }`}
                  >
                    {answerResponse?.is_correct
                      ? "آفرین! پاسخ شما درست بود."
                      : "پاسخ شما نادرست بود."}
                  </motion.div>
                )}
              </div>
            )}
          </div>
          <DialogClose ref={closeButtonRef} className="absolute left-4 top-4" />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
