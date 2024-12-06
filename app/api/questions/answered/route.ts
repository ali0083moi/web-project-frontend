import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const headersList = await headers();
  const token = headersList.get("authorization");

  // Check for authentication
  if (!token || !token.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Mock data
  const answeredQuestions = {
    questions: [
      {
        id: 1,
        text: "پایتخت ایران کدام شهر است؟",
        category: "جغرافیا",
        difficulty: "easy",
        selected_option: "تهران",
        is_correct: true,
      },
      {
        id: 2,
        text: "کدام یک از موارد زیر زبان برنامه‌نویسی نیست؟",
        category: "کامپیوتر",
        difficulty: "medium",
        selected_option: "CSS",
        is_correct: true,
      },
      {
        id: 3,
        text: "بزرگترین سیاره منظومه شمسی کدام است؟",
        category: "نجوم",
        difficulty: "easy",
        selected_option: "مشتری",
        is_correct: true,
      },
      {
        id: 4,
        text: "چه کسی نظریه نسبیت را ارائه کرد؟",
        category: "فیزیک",
        difficulty: "medium",
        selected_option: "آلبرت اینشتین",
        is_correct: true,
      },
      {
        id: 5,
        text: "کدام عنصر بیشترین فراوانی را در پوسته زمین دارد؟",
        category: "شیمی",
        difficulty: "hard",
        selected_option: "اکسیژن",
        is_correct: true,
      },
      {
        id: 6,
        text: "اولین زبان برنامه‌نویسی سطح بالا چه نام داشت؟",
        category: "کامپیوتر",
        difficulty: "hard",
        selected_option: "FORTRAN",
        is_correct: true,
      },
      {
        id: 7,
        text: "بلندترین قله ایران کدام است؟",
        category: "جغرافیا",
        difficulty: "medium",
        selected_option: "دماوند",
        is_correct: true,
      },
      {
        id: 8,
        text: "کدام حیوان بزرگترین پستاندار جهان است؟",
        category: "زیست‌شناسی",
        difficulty: "easy",
        selected_option: "نهنگ آبی",
        is_correct: true,
      },
      {
        id: 9,
        text: "مخترع تلفن چه کسی بود؟",
        category: "تاریخ",
        difficulty: "medium",
        selected_option: "گراهام بل",
        is_correct: true,
      },
      {
        id: 10,
        text: "کدام ویتامین به ویتامین آفتاب معروف است؟",
        category: "پزشکی",
        difficulty: "easy",
        selected_option: "D",
        is_correct: true,
      },
      {
        id: 11,
        text: "پایتخت ژاپن کدام شهر است؟",
        category: "جغرافیا",
        difficulty: "easy",
        selected_option: "توکیو",
        is_correct: true,
      },
      {
        id: 12,
        text: "کدام زبان برنامه‌نویسی توسط گوگل توسعه داده شد؟",
        category: "کامپیوتر",
        difficulty: "medium",
        selected_option: "Go",
        is_correct: true,
      },
      {
        id: 13,
        text: "بزرگترین اقیانوس جهان کدام است؟",
        category: "جغرافیا",
        difficulty: "easy",
        selected_option: "آرام",
        is_correct: true,
      },
      {
        id: 14,
        text: "واحد اندازه‌گیری فشار چیست؟",
        category: "فیزیک",
        difficulty: "medium",
        selected_option: "پاسکال",
        is_correct: true,
      },
      {
        id: 15,
        text: "کدام عنصر رسانای الکتریسیته نیست؟",
        category: "شیمی",
        difficulty: "hard",
        selected_option: "پلاستیک",
        is_correct: true,
      },
      {
        id: 16,
        text: "معمار مسجد شیخ لطف‌الله اصفهان که بود؟",
        category: "تاریخ",
        difficulty: "hard",
        selected_option: "محمدرضا اصفهانی",
        is_correct: true,
      },
      {
        id: 17,
        text: "کدام سیاره به سیاره سرخ معروف است؟",
        category: "نجوم",
        difficulty: "easy",
        selected_option: "مریخ",
        is_correct: true,
      },
      {
        id: 18,
        text: "قلب انسان چند حفره دارد؟",
        category: "پزشکی",
        difficulty: "medium",
        selected_option: "چهار",
        is_correct: true,
      },
      {
        id: 19,
        text: "کدام حیوان سریع‌ترین جانور روی خشکی است؟",
        category: "زیست‌شناسی",
        difficulty: "medium",
        selected_option: "یوزپلنگ",
        is_correct: true,
      },
      {
        id: 20,
        text: "نام قدیم شهر استانبول چه بود؟",
        category: "تاریخ",
        difficulty: "hard",
        selected_option: "قسطنطنیه",
        is_correct: true,
      },
    ],
  };

  return NextResponse.json(answeredQuestions);
}
