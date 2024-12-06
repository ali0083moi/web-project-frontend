import { NextResponse } from "next/server";
import { headers } from "next/headers";

const questions = {
  questions: [
    {
      id: "1",
      text: "پایتخت ایران کدام شهر است؟",
      category: "جغرافیا",
      difficulty: "easy",
      options: ["تهران", "اصفهان", "شیراز", "تبریز"],
      correctAnswer: 0,
    },
    {
      id: "2",
      text: "کدام یک از موارد زیر زبان برنامه‌نویسی نیست؟",
      category: "کامپیوتر",
      difficulty: "medium",
      options: ["Python", "Java", "HTML", "CSS"],
      correctAnswer: 3,
    },
    {
      id: "3",
      text: "بزرگترین سیاره منظومه شمسی کدام است؟",
      category: "نجوم",
      difficulty: "easy",
      options: ["زمین", "مشتری", "زحل", "مریخ"],
      correctAnswer: 1,
    },
    {
      id: "4",
      text: "چه کسی نظریه نسبیت را ارائه کرد؟",
      category: "فیزیک",
      difficulty: "medium",
      options: ["نیوتن", "اینشین", "هاوکینگ", "بور"],
      correctAnswer: 1,
    },
    {
      id: "5",
      text: "کدام عنصر بیشترین فراوانی را در پوسته زمین دارد؟",
      category: "شیمی",
      difficulty: "hard",
      options: ["آهن", "اکسیژن", "سیلیسیم", "آلومینیوم"],
      correctAnswer: 1,
    },
    {
      id: "6",
      text: "اولین زبان برنامه‌نویسی سطح بالا چه نام داشت؟",
      category: "کامپیوتر",
      difficulty: "hard",
      options: ["FORTRAN", "COBOL", "BASIC", "Pascal"],
      correctAnswer: 0,
    },
    {
      id: "7",
      text: "بلندترین قله ایران کدام است؟",
      category: "جغرافیا",
      difficulty: "medium",
      options: ["دماوند", "علم‌کوه", "سبلان", "تفتان"],
      correctAnswer: 0,
    },
    {
      id: "8",
      text: "کدام حیوان بزرگترین پستاندار جهان است؟",
      category: "زیست‌شناسی",
      difficulty: "easy",
      options: ["فیل آفریقایی", "نهنگ آبی", "کوسه نهنگ", "نهنگ قاتل"],
      correctAnswer: 1,
    },
    {
      id: "9",
      text: "مخترع تلفن چه کسی بود؟",
      category: "تاریخ",
      difficulty: "medium",
      options: ["ادیسون", "تسلا", "گراهام بل", "مارکنی"],
      correctAnswer: 2,
    },
    {
      id: "10",
      text: "کدام ویتامین به ویتامین آفتاب معروف است؟",
      category: "پزشکی",
      difficulty: "easy",
      options: ["A", "B", "C", "D"],
      correctAnswer: 3,
    },
    {
      id: "11",
      text: "پایتخت ژاپن کدام شهر است؟",
      category: "جغرافیا",
      difficulty: "easy",
      options: ["توکیو", "کیوتو", "اوساکا", "یوکوهاما"],
      correctAnswer: 0,
    },
    {
      id: "12",
      text: "کدام زبان برنامه‌نویسی توسط گوگل توسعه داده شد؟",
      category: "کامپیوتر",
      difficulty: "medium",
      options: ["Python", "Go", "Java", "Ruby"],
      correctAnswer: 1,
    },
    {
      id: "13",
      text: "بزرگترین اقیانوس جهان کدام است؟",
      category: "جغرافیا",
      difficulty: "easy",
      options: ["اطلس", "آرام", "هند", "منجمد شمالی"],
      correctAnswer: 1,
    },
    {
      id: "14",
      text: "واحد اندازه‌گیری فشار چیست؟",
      category: "فیزیک",
      difficulty: "medium",
      options: ["نیوتن", "پاسکال", "ژول", "وات"],
      correctAnswer: 1,
    },
    {
      id: "15",
      text: "کدام عنصر رسانای الکتریسیته نیست؟",
      category: "شیمی",
      difficulty: "hard",
      options: ["مس", "آلومینیوم", "نقره", "پلاستیک"],
      correctAnswer: 3,
    },
    {
      id: "16",
      text: "معمار مسجد شیخ لطف‌الله اصفهان که بود؟",
      category: "تاریخ",
      difficulty: "hard",
      options: [
        "محمدرضا اصفهانی",
        "علی اکبر اصفهانی",
        "استاد حسین",
        "قوام الدین شیرازی",
      ],
      correctAnswer: 0,
    },
    {
      id: "17",
      text: "کدام سیاره به سیاره سرخ معروف است؟",
      category: "نجوم",
      difficulty: "easy",
      options: ["زهره", "مریخ", "زحل", "عطارد"],
      correctAnswer: 1,
    },
    {
      id: "18",
      text: "قلب انسان چند حفره دارد؟",
      category: "پزشکی",
      difficulty: "medium",
      options: ["دو", "سه", "چهار", "پنج"],
      correctAnswer: 2,
    },
    {
      id: "19",
      text: "کدام حیوان سریع‌ترین جانور روی خشکی است؟",
      category: "زیست‌شناسی",
      difficulty: "medium",
      options: ["شیر", "پلنگ", "یوزپلنگ", "گوزن"],
      correctAnswer: 2,
    },
    {
      id: "20",
      text: "نام قدیم شهر استانبول چه بود؟",
      category: "تاریخ",
      difficulty: "hard",
      options: ["بیزانس", "قسطنطنیه", "روم شرقی", "آناتولی"],
      correctAnswer: 1,
    },
    {
      id: "21",
      text: "کدام گزینه یک سیستم عامل متن‌باز است؟",
      category: "کامپیوتر",
      difficulty: "medium",
      options: ["Windows", "Linux", "macOS", "iOS"],
      correctAnswer: 1,
    },
    {
      id: "22",
      text: "بزرگترین عضو بدن انسان کدام است؟",
      category: "پزشکی",
      difficulty: "easy",
      options: ["کبد", "مغز", "پوست", "روده"],
      correctAnswer: 2,
    },
    {
      id: "23",
      text: "کدام دریاچه عمیق‌ترین دریاچه جهان است؟",
      category: "جغرافیا",
      difficulty: "hard",
      options: ["خزر", "بایکال", "ویکتوریا", "سوپریور"],
      correctAnswer: 1,
    },
    {
      id: "24",
      text: "اولین کامپیوتر الکترونیکی چه نام داشت؟",
      category: "کامپیوتر",
      difficulty: "hard",
      options: ["ENIAC", "UNIVAC", "IBM 360", "Apple I"],
      correctAnswer: 0,
    },
    {
      id: "25",
      text: "کدام ماده بیشترین درصد هوا را تشکیل می‌دهد؟",
      category: "شیمی",
      difficulty: "medium",
      options: ["اکسیژن", "نیتروژن", "کربن دی‌اکسید", "هیدروژن"],
      correctAnswer: 1,
    },
    {
      id: "26",
      text: "کدام سلسله پادشاهی قدیمی‌ترین سلسله ایران است؟",
      category: "تاریخ",
      difficulty: "hard",
      options: ["هخامنشیان", "پیشدادیان", "ساسانیان", "اشکانیان"],
      correctAnswer: 1,
    },
    {
      id: "27",
      text: "کوچکترین سیاره منظومه شمسی کدام است؟",
      category: "نجوم",
      difficulty: "medium",
      options: ["عطارد", "مریخ", "زهره", "پلوتو"],
      correctAnswer: 0,
    },
    {
      id: "28",
      text: "کدام حیوان طولانی‌ترین عمر را دارد؟",
      category: "زیست‌شناسی",
      difficulty: "medium",
      options: ["فیل", "لاک‌پشت", "نهنگ", "عقاب"],
      correctAnswer: 1,
    },
    {
      id: "29",
      text: "واحد اندازه‌گیری جریان الکتریکی چیست؟",
      category: "فیزیک",
      difficulty: "easy",
      options: ["ولت", "آمپر", "وات", "اهم"],
      correctAnswer: 1,
    },
    {
      id: "30",
      text: "کدام هورمون به هورمون شادی معروف است؟",
      category: "پزشکی",
      difficulty: "medium",
      options: ["سروتونین", "دوپامین", "آدرنالین", "اندورفین"],
      correctAnswer: 0,
    },
    {
      id: "31",
      text: "پرجمعیت‌ترین شهر جهان کدام است؟",
      category: "جغرافیا",
      difficulty: "medium",
      options: ["توکیو", "شانگهای", "دهلی نو", "پکن"],
      correctAnswer: 0,
    },
    {
      id: "32",
      text: "کدام زبان برنامه‌نویسی برای هوش مصنوعی محبوب‌تر است؟",
      category: "کامپیوتر",
      difficulty: "medium",
      options: ["Java", "Python", "C++", "JavaScript"],
      correctAnswer: 1,
    },
    {
      id: "33",
      text: "فاصله زمین تا خورشید چند کیلومتر است؟",
      category: "نجوم",
      difficulty: "hard",
      options: ["150 میلیون", "100 میلیون", "200 میلیون", "250 میلیون"],
      correctAnswer: 0,
    },
    {
      id: "34",
      text: "کدام عنصر در دمای اتاق مایع است؟",
      category: "شیمی",
      difficulty: "medium",
      options: ["جیوه", "آهن", "مس", "طلا"],
      correctAnswer: 0,
    },
    {
      id: "35",
      text: "اولین پایتخت صفویان کدام شهر بود؟",
      category: "تاریخ",
      difficulty: "hard",
      options: ["تبریز", "اصفهان", "قزوین", "مشهد"],
      correctAnswer: 0,
    },
    {
      id: "36",
      text: "کدام استخوان بدن انسان بزرگترین است؟",
      category: "پزشکی",
      difficulty: "easy",
      options: ["ران", "بازو", "ساق پا", "کتف"],
      correctAnswer: 0,
    },
    {
      id: "37",
      text: "کدام جانور بیشترین تعداد دندان را دارد؟",
      category: "زیست‌شناسی",
      difficulty: "hard",
      options: ["کوسه", "تمساح", "حلزون", "دلفین"],
      correctAnswer: 2,
    },
    {
      id: "38",
      text: "واحد اندازه‌گیری دما در سیستم SI چیست؟",
      category: "فیزیک",
      difficulty: "medium",
      options: ["سانتیگراد", "فارنهایت", "کلوین", "رانکین"],
      correctAnswer: 2,
    },
    {
      id: "39",
      text: "طولانی‌ترین رود جهان کدام است؟",
      category: "جغرافیا",
      difficulty: "medium",
      options: ["آمازون", "نیل", "یانگ تسه", "می‌سی‌سی‌پی"],
      correctAnswer: 1,
    },
    {
      id: "40",
      text: "کدام شرکت سیستم عامل اندروید را توسعه داد؟",
      category: "کامپیوتر",
      difficulty: "easy",
      options: ["اپل", "مایکروسافت", "گوگل", "سامسونگ"],
      correctAnswer: 2,
    },
    {
      id: "41",
      text: "کدام سیاره دارای بیشترین قمر است؟",
      category: "نجوم",
      difficulty: "hard",
      options: ["زحل", "مشتری", "اورانوس", "نپتون"],
      correctAnswer: 1,
    },
    {
      id: "42",
      text: "کدام عنصر فراوان‌ترین فلز در پوسته زمین است؟",
      category: "شیمی",
      difficulty: "hard",
      options: ["آهن", "آلومینیوم", "مس", "روی"],
      correctAnswer: 1,
    },
    {
      id: "43",
      text: "چه کسی اولین پادشاه هخامنشی بود؟",
      category: "تاریخ",
      difficulty: "medium",
      options: ["کوروش", "داریوش", "خشایارشا", "کمبوجیه"],
      correctAnswer: 0,
    },
    {
      id: "44",
      text: "کدام ویتامین در انعقاد خون نقش دارد؟",
      category: "پزشکی",
      difficulty: "hard",
      options: ["K", "D", "C", "E"],
      correctAnswer: 0,
    },
    {
      id: "45",
      text: "کدام حیوان توانایی تغییر رنگ دارد؟",
      category: "زیست‌شناسی",
      difficulty: "easy",
      options: ["آفتاب‌پرست", "مارمولک", "سوسمار", "ایگوانا"],
      correctAnswer: 0,
    },
    {
      id: "46",
      text: "قانون جاذبه توسط چه کسی کشف شد؟",
      category: "فیزیک",
      difficulty: "easy",
      options: ["نیوتن", "انیشتین", "گالیله", "کپلر"],
      correctAnswer: 0,
    },
    {
      id: "47",
      text: "بلندترین آبشار جهان کدام است؟",
      category: "جغرافیا",
      difficulty: "hard",
      options: ["آنجل", "نیاگارا", "ویکتوریا", "ایگواسو"],
      correctAnswer: 0,
    },
    {
      id: "48",
      text: "کدام شبکه اجتماعی اول توسط مارک زاکربرگ ساخته شد؟",
      category: "کامپیوتر",
      difficulty: "easy",
      options: ["فیس‌بوک", "توییتر", "اینستاگرام", "لینکدین"],
      correctAnswer: 0,
    },
    {
      id: "49",
      text: "کدام کهکشان به کهکشان راه شیری نزدیک‌تر است؟",
      category: "نجوم",
      difficulty: "hard",
      options: ["آندرومدا", "مثلث", "برج الجبار", "عقاب"],
      correctAnswer: 0,
    },
    {
      id: "50",
      text: "کدام شهر ایران به شهر بادگیرها معروف است؟",
      category: "جغرافیا",
      difficulty: "medium",
      options: ["یزد", "کرمان", "شیراز", "اصفهان"],
      correctAnswer: 0,
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
