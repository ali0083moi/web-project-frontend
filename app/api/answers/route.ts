import { NextResponse } from "next/server";
import { headers } from "next/headers";

const correctAnswers: { [key: string]: string } = {
  "1": "option1", // تهران
  "2": "option4", // CSS
  "3": "option2", // مشتری
  "4": "option2", // اینشتین
  "5": "option2", // اکسیژن
  "6": "option1", // FORTRAN
  "7": "option1", // دماوند
  "8": "option2", // نهنگ آبی
  "9": "option3", // گراهام بل
  "10": "option4", // D
  "11": "option1", // توکیو
  "12": "option2", // Go
  "13": "option2", // آرام
  "14": "option2", // پاسکال
  "15": "option2", // کلسیم
  "16": "option1", // ENIAC
  "17": "option1", // آسیا
  "18": "option2", // نیتروژن
  "19": "option1", // یوزپلنگ
  "20": "option1", // قسطنطنیه
  "21": "option1", // جیوه
  "22": "option2", // Linux
  "23": "option1", // گودال ماریانا
  "24": "option2", // گلبول‌های سفید
  "25": "option1", // کوروش
  "26": "option3", // عطارد
  "27": "option2", // آمپر
  "28": "option2", // مار
  "29": "option1", // قاهره
  "30": "option2", // Python
  "31": "option3", // پوست
  "32": "option1", // کلر
  "33": "option2", // عثمانی
  "34": "option2", // زحل
  "35": "option2", // اینرسی
  "36": "option3", // هیدروژن
  "37": "option2", // قطب جنوب
  "38": "option1", // آدا لاولیس
  "39": "option1", // انسولین
  "40": "option1", // داروین
  "41": "option1", // نیل
  "42": "option1", // SARS-CoV-2
  "43": "option1", // لیتیم
  "44": "option1", // JavaScript
  "45": "option1", // گانیمد
  "46": "option1", // نیوتن
  "47": "option1", // آنجل
  "48": "option1", // فیس‌بوک
  "49": "option1", // آندرومدا
  "50": "option1", // یزد
};

export async function POST(request: Request) {
  const headersList = await headers();
  const token = headersList.get("authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { question_id, selected_option } = body;

    const correct_answer = correctAnswers[question_id];
    const is_correct = selected_option === correct_answer;

    if (is_correct) {
      return NextResponse.json({
        message: "Answer submitted successfully",
        correct_answer: correct_answer,
        is_correct: true,
      });
    } else {
      return NextResponse.json({
        message: "Answer submitted successfully",
        correct_answer: correct_answer,
        is_correct: false,
      });
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
