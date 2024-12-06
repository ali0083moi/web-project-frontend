import { NextResponse } from "next/server";
import { headers } from "next/headers";

const questions = {
  questions: [
    {
      id: "1",
      text: "پایتخت ایران کدام شهر است؟",
      category: "جغرافیا",
      difficulty: "easy",
    },
    {
      id: "2",
      text: "کدام یک از موارد زیر زبان برنامه‌نویسی نیست؟",
      category: "کامپیوتر",
      difficulty: "medium",
    },
    {
      id: "3",
      text: "بزرگترین سیاره منظومه شمسی کدام است؟",
      category: "نجوم",
      difficulty: "easy",
    },
    {
      id: "4",
      text: "چه کسی نظریه نسبیت را ارائه کرد؟",
      category: "فیزیک",
      difficulty: "medium",
    },
    {
      id: "5",
      text: "کدام عنصر بیشترین فراوانی را در پوسته زمین دارد؟",
      category: "شیمی",
      difficulty: "hard",
    },
    {
      id: "6",
      text: "اولین زبان برنامه‌نویسی سطح بالا چه نام داشت؟",
      category: "کامپیوتر",
      difficulty: "hard",
    },
    {
      id: "7",
      text: "بلندترین قله ایران کدام است؟",
      category: "جغرافیا",
      difficulty: "medium",
    },
    {
      id: "8",
      text: "کدام حیوان بزرگترین پستاندار جهان است؟",
      category: "زیست‌شناسی",
      difficulty: "easy",
    },
    {
      id: "9",
      text: "مخترع تلفن چه کسی بود؟",
      category: "تاریخ",
      difficulty: "medium",
    },
    {
      id: "10",
      text: "کدام ویتامین به ویتامین آفتاب معروف است؟",
      category: "پزشکی",
      difficulty: "easy",
    },
    {
      id: "11",
      text: "پایتخت ژاپن کدام شهر است؟",
      category: "جغرافیا",
      difficulty: "easy",
    },
    {
      id: "12",
      text: "کدام زبان برنامه‌نویسی توسط گوگل توسعه داده شد؟",
      category: "کامپیوتر",
      difficulty: "medium",
    },
    {
      id: "13",
      text: "بزرگترین اقیانوس جهان کدام است؟",
      category: "جغرافیا",
      difficulty: "easy",
    },
    {
      id: "14",
      text: "واحد اندازه‌گیری فشار چیست؟",
      category: "فیزیک",
      difficulty: "medium",
    },
    {
      id: "15",
      text: "کدام عنصر رسانای الکتریسیته نیست؟",
      category: "شیمی",
      difficulty: "hard",
    },
    {
      id: "16",
      text: "معمار مسجد شیخ لطف‌الله اصفهان که بود؟",
      category: "تاریخ",
      difficulty: "hard",
    },
    {
      id: "17",
      text: "کدام سیاره به سیاره سرخ معروف است؟",
      category: "نجوم",
      difficulty: "easy",
    },
    {
      id: "18",
      text: "قلب انسان چند حفره دارد؟",
      category: "پزشکی",
      difficulty: "medium",
    },
    {
      id: "19",
      text: "کدام حیوان سریع‌ترین جانور روی خشکی است؟",
      category: "زیست‌شناسی",
      difficulty: "medium",
    },
    {
      id: "20",
      text: "نام قدیم شهر استانبول چه بود؟",
      category: "تاریخ",
      difficulty: "hard",
    },
    {
      id: "21",
      text: "کدام گزینه یک سیستم عامل متن‌باز است؟",
      category: "کامپیوتر",
      difficulty: "medium",
    },
    {
      id: "22",
      text: "بزرگترین عضو بدن انسان کدام است؟",
      category: "پزشکی",
      difficulty: "easy",
    },
    {
      id: "23",
      text: "کدام دریاچه عمیق‌ترین دریاچه جهان است؟",
      category: "جغرافیا",
      difficulty: "hard",
    },
    {
      id: "24",
      text: "اولین کامپیوتر الکترونیکی چه نام داشت؟",
      category: "کامپیوتر",
      difficulty: "hard",
    },
    {
      id: "25",
      text: "کدام ماده بیشترین درصد هوا را تشکیل می‌دهد؟",
      category: "شیمی",
      difficulty: "medium",
    },
    {
      id: "26",
      text: "کدام سلسله پادشاهی قدیمی‌ترین سلسله ایران است؟",
      category: "تاریخ",
      difficulty: "hard",
    },
    {
      id: "27",
      text: "کوچکترین سیاره منظومه شمسی کدام است؟",
      category: "نجوم",
      difficulty: "medium",
    },
    {
      id: "28",
      text: "کدام حیوان طولانی‌ترین عمر را دارد؟",
      category: "زیست‌شناسی",
      difficulty: "medium",
    },
    {
      id: "29",
      text: "واحد اندازه‌گیری جریان الکتریکی چیست؟",
      category: "فیزیک",
      difficulty: "easy",
    },
    {
      id: "30",
      text: "کدام هورمون به هورمون شادی معروف است؟",
      category: "پزشکی",
      difficulty: "medium",
    },
    {
      id: "31",
      text: "پرجمعیت‌ترین شهر جهان کدام است؟",
      category: "جغرافیا",
      difficulty: "medium",
    },
    {
      id: "32",
      text: "کدام زبان برنامه‌نویسی برای هوش مصنوعی محبوب‌تر است؟",
      category: "کامپیوتر",
      difficulty: "medium",
    },
    {
      id: "33",
      text: "فاصله زمین تا خورشید چند کیلومتر است؟",
      category: "نجوم",
      difficulty: "hard",
    },
    {
      id: "34",
      text: "کدام عنصر در دمای اتاق مایع است؟",
      category: "شیمی",
      difficulty: "medium",
    },
    {
      id: "35",
      text: "اولین پایتخت صفویان کدام شهر بود؟",
      category: "تاریخ",
      difficulty: "hard",
    },
    {
      id: "36",
      text: "کدام استخوان بدن انسان بزرگترین است؟",
      category: "پزشکی",
      difficulty: "easy",
    },
    {
      id: "37",
      text: "کدام جانور بیشترین تعداد دندان را دارد؟",
      category: "زیست‌شناسی",
      difficulty: "hard",
    },
    {
      id: "38",
      text: "واحد اندازه‌گیری دما در سیستم SI چیست؟",
      category: "فیزیک",
      difficulty: "medium",
    },
    {
      id: "39",
      text: "طولانی‌ترین رود جهان کدام است؟",
      category: "جغرافیا",
      difficulty: "medium",
    },
    {
      id: "40",
      text: "کدام شرکت سیستم عامل اندروید را توسعه داد؟",
      category: "کامپیوتر",
      difficulty: "easy",
    },
    {
      id: "41",
      text: "کدام سیاره دارای بیشترین قمر است؟",
      category: "نجوم",
      difficulty: "hard",
    },
    {
      id: "42",
      text: "کدام عنصر فراوان‌ترین فلز در پوسته زمین است؟",
      category: "شیمی",
      difficulty: "hard",
    },
    {
      id: "43",
      text: "چه کسی اولین پادشاه هخامنشی بود؟",
      category: "تاریخ",
      difficulty: "medium",
    },
    {
      id: "44",
      text: "کدام ویتامین در انعقاد خون نقش دارد؟",
      category: "پزشکی",
      difficulty: "hard",
    },
    {
      id: "45",
      text: "کدام حیوان توانایی تغییر رنگ دارد؟",
      category: "زیست‌شناسی",
      difficulty: "easy",
    },
    {
      id: "46",
      text: "قانون جاذبه توسط چه کسی کشف شد؟",
      category: "فیزیک",
      difficulty: "easy",
    },
    {
      id: "47",
      text: "بلندترین آبشار جهان کدام است؟",
      category: "جغرافیا",
      difficulty: "hard",
    },
    {
      id: "48",
      text: "کدام شبکه اجتماعی اول توسط مارک زاکربرگ ساخته شد؟",
      category: "کامپیوتر",
      difficulty: "easy",
    },
    {
      id: "49",
      text: "کدام کهکشان به کهکشان راه شیری نزدیک‌تر است؟",
      category: "نجوم",
      difficulty: "hard",
    },
    {
      id: "50",
      text: "کدام شهر ایران به شهر بادگیرها معروف است؟",
      category: "جغرافیا",
      difficulty: "medium",
    },
  ],
};

export async function GET(request: Request) {
  try {
    const headersList = await headers();
    const token = headersList.get("authorization");

    if (!token || !token.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const difficulty = searchParams.get("difficulty");

    let filteredQuestions = questions.questions;

    if (category) {
      filteredQuestions = filteredQuestions.filter(
        (q) => q.category === category
      );
    }

    if (difficulty) {
      filteredQuestions = filteredQuestions.filter(
        (q) => q.difficulty === difficulty
      );
    }

    return NextResponse.json({ questions: filteredQuestions });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
