import { NextResponse } from "next/server";
import { headers } from "next/headers";

const questions = {
  "1": {
    id: "1",
    text: "پایتخت ایران کدام شهر است؟",
    category: "جغرافیا",
    difficulty: "easy",
    option1: "تهران",
    option2: "اصفهان",
    option3: "شیراز",
    option4: "تبریز",
  },
  "2": {
    id: "2",
    text: "کدام یک از موارد زیر زبان برنامه‌نویسی نیست؟",
    category: "کامپیوتر",
    difficulty: "medium",
    option1: "Python",
    option2: "Java",
    option3: "HTML",
    option4: "CSS",
  },
  "3": {
    id: "3",
    text: "بزرگترین سیاره منظومه شمسی کدام است؟",
    category: "نجوم",
    difficulty: "easy",
    option1: "زمین",
    option2: "مشتری",
    option3: "زحل",
    option4: "مریخ",
  },
  "4": {
    id: "4",
    text: "چه کسی نظریه نسبیت را ارائه کرد؟",
    category: "فیزیک",
    difficulty: "medium",
    option1: "نیوتن",
    option2: "اینشتین",
    option3: "هاوکینگ",
    option4: "بور",
  },
  "5": {
    id: "5",
    text: "کدام عنصر بیشترین فراوانی را در پوسته زمین دارد؟",
    category: "شیمی",
    difficulty: "hard",
    option1: "آهن",
    option2: "اکسیژن",
    option3: "سیلیسیم",
    option4: "آلومینیوم",
  },
  "6": {
    id: "6",
    text: "اولین زبان برنامه‌نویسی سطح بالا چه نام داشت؟",
    category: "کامپیوتر",
    difficulty: "hard",
    option1: "FORTRAN",
    option2: "COBOL",
    option3: "BASIC",
    option4: "Pascal",
  },
  "7": {
    id: "7",
    text: "بلندترین قله ایران کدام است؟",
    category: "جغرافیا",
    difficulty: "medium",
    option1: "دماوند",
    option2: "علم‌کوه",
    option3: "سبلان",
    option4: "تفتان",
  },
  "8": {
    id: "8",
    text: "کدام حیوان بزرگترین پستاندار جهان است؟",
    category: "زیست‌شناسی",
    difficulty: "easy",
    option1: "فیل آفریقایی",
    option2: "نهنگ آبی",
    option3: "کوسه نهنگ",
    option4: "نهنگ قاتل",
  },
  "9": {
    id: "9",
    text: "مخترع تلفن چه کسی بود؟",
    category: "تاریخ",
    difficulty: "medium",
    option1: "ادیسون",
    option2: "تسلا",
    option3: "گراهام بل",
    option4: "مارکنی",
  },
  "10": {
    id: "10",
    text: "کدام ویتامین به ویتامین آفتاب معروف است؟",
    category: "پزشکی",
    difficulty: "easy",
    option1: "A",
    option2: "B",
    option3: "C",
    option4: "D",
  },
  "11": {
    id: "11",
    text: "پایتخت ژاپن کدام شهر است؟",
    category: "جغرافیا",
    difficulty: "easy",
    option1: "توکیو",
    option2: "کیوتو",
    option3: "اوساکا",
    option4: "یوکوهاما",
  },
  "12": {
    id: "12",
    text: "کدام زبان برنامه‌نویسی توسط گوگل توسعه داده شد؟",
    category: "کامپیوتر",
    difficulty: "medium",
    option1: "Python",
    option2: "Go",
    option3: "Java",
    option4: "Ruby",
  },
  "13": {
    id: "13",
    text: "بزرگترین اقیانوس جهان کدام است؟",
    category: "جغرافیا",
    difficulty: "easy",
    option1: "اطلس",
    option2: "آرام",
    option3: "هند",
    option4: "منجمد شمالی",
  },
  "14": {
    id: "14",
    text: "واحد اندازه‌گیری فشار چیست؟",
    category: "فیزیک",
    difficulty: "medium",
    option1: "نیوتن",
    option2: "پاسکال",
    option3: "ژول",
    option4: "وات",
  },
  "15": {
    id: "15",
    text: "کدام عنصر در ساختار DNA وجود ندارد؟",
    category: "زیست‌شناسی",
    difficulty: "hard",
    option1: "فسفر",
    option2: "کلسیم",
    option3: "نیتروژن",
    option4: "کربن",
  },
  "16": {
    id: "16",
    text: "اولین کامپیوتر الکترونیکی چه نام داشت؟",
    category: "کامپیوتر",
    difficulty: "hard",
    option1: "ENIAC",
    option2: "UNIVAC",
    option3: "EDVAC",
    option4: "IBM 650",
  },
  "17": {
    id: "17",
    text: "بزرگترین قاره جهان کدام است؟",
    category: "جغرافیا",
    difficulty: "easy",
    option1: "آسیا",
    option2: "آفریقا",
    option3: "آمریکای شمالی",
    option4: "اروپا",
  },
  "18": {
    id: "18",
    text: "کدام گاز بیشترین درصد را در هوا دارد؟",
    category: "شیمی",
    difficulty: "medium",
    option1: "اکسیژن",
    option2: "نیتروژن",
    option3: "دی‌اکسید کربن",
    option4: "آرگون",
  },
  "19": {
    id: "19",
    text: "کدام حیوان سریع‌ترین جانور روی خشکی است؟",
    category: "زیست‌شناسی",
    difficulty: "medium",
    option1: "یوزپلنگ",
    option2: "شیر",
    option3: "پلنگ",
    option4: "گوزن",
  },
  "20": {
    id: "20",
    text: "نام قدیم شهر استانبول چه بود؟",
    category: "تاریخ",
    difficulty: "hard",
    option1: "قسطنطنیه",
    option2: "بیزانس",
    option3: "روم شرقی",
    option4: "آنکارا",
  },
  "21": {
    id: "21",
    text: "کدام عنصر در دمای اتاق مایع است؟",
    category: "شیمی",
    difficulty: "medium",
    option1: "جیوه",
    option2: "سدیم",
    option3: "مس",
    option4: "روی",
  },
  "22": {
    id: "22",
    text: "کدام سیستم عامل متن‌باز است؟",
    category: "کامپیوتر",
    difficulty: "medium",
    option1: "Windows",
    option2: "Linux",
    option3: "macOS",
    option4: "iOS",
  },
  "23": {
    id: "23",
    text: "عمیق‌ترین نقطه اقیانوس‌ها کجاست؟",
    category: "جغرافیا",
    difficulty: "hard",
    option1: "گودال ماریانا",
    option2: "گودال پورتوریکو",
    option3: "گودال فیلیپین",
    option4: "گودال تونگا",
  },
  "24": {
    id: "24",
    text: "کدام سلول‌های خونی در دفاع از بدن نقش دارند؟",
    category: "پزشکی",
    difficulty: "medium",
    option1: "گلبول‌های قرمز",
    option2: "گلبول‌های سفید",
    option3: "پلاکت‌ها",
    option4: "پلاسما",
  },
  "25": {
    id: "25",
    text: "اولین پادشاه هخامنشی چه کسی بود؟",
    category: "تاریخ",
    difficulty: "medium",
    option1: "کوروش",
    option2: "داریوش",
    option3: "خشایارشا",
    option4: "کمبوجیه",
  },
  "26": {
    id: "26",
    text: "کوچکترین سیاره منظومه شمسی کدام است؟",
    category: "نجوم",
    difficulty: "easy",
    option1: "زمین",
    option2: "مریخ",
    option3: "عطارد",
    option4: "زهره",
  },
  "27": {
    id: "27",
    text: "واحد اندازه‌گیری جریان الکتریکی چیست؟",
    category: "فیزیک",
    difficulty: "easy",
    option1: "ولت",
    option2: "آمپر",
    option3: "وات",
    option4: "اهم",
  },
  "28": {
    id: "28",
    text: "کدام حیوان قلب چهار اتاقکی ندارد؟",
    category: "زیست‌شناسی",
    difficulty: "hard",
    option1: "خرگوش",
    option2: "مار",
    option3: "گربه",
    option4: "سگ",
  },
  "29": {
    id: "29",
    text: "پایتخت مصر کدام شهر است؟",
    category: "جغرافیا",
    difficulty: "easy",
    option1: "قاهره",
    option2: "اسکندریه",
    option3: "شرم الشیخ",
    option4: "لوکسور",
  },
  "30": {
    id: "30",
    text: "کدام زبان برنامه‌نویسی برای هوش مصنوعی محبوب‌تر است؟",
    category: "کامپیوتر",
    difficulty: "medium",
    option1: "Java",
    option2: "Python",
    option3: "C++",
    option4: "JavaScript",
  },
  "31": {
    id: "31",
    text: "بزرگترین عضو بدن انسان کدام است؟",
    category: "پزشکی",
    difficulty: "easy",
    option1: "کبد",
    option2: "مغز",
    option3: "پوست",
    option4: "روده",
  },
  "32": {
    id: "32",
    text: "کدام ماده شیمیایی برای ضدعفونی کردن آب استخر استفاده می‌شود؟",
    category: "شیمی",
    difficulty: "medium",
    option1: "کلر",
    option2: "سدیم",
    option3: "اکسیژن",
    option4: "نیتروژن",
  },
  "33": {
    id: "33",
    text: "کدام امپراتوری روم را فتح کرد؟",
    category: "تاریخ",
    difficulty: "hard",
    option1: "هخامنشیان",
    option2: "عثمانی",
    option3: "مغول",
    option4: "ساسانیان",
  },
  "34": {
    id: "34",
    text: "کدام سیاره دارای حلقه است؟",
    category: "نجوم",
    difficulty: "easy",
    option1: "مریخ",
    option2: "زحل",
    option3: "زمین",
    option4: "عطارد",
  },
  "35": {
    id: "35",
    text: "قانون اول نیوتن درباره چیست؟",
    category: "فیزیک",
    difficulty: "medium",
    option1: "جاذبه",
    option2: "اینرسی",
    option3: "انرژی",
    option4: "حرکت",
  },
  "36": {
    id: "36",
    text: "کدام عنصر در جدول تناوبی بیشترین فراوانی را در جهان دارد؟",
    category: "شیمی",
    difficulty: "hard",
    option1: "اکسیژن",
    option2: "کربن",
    option3: "هیدروژن",
    option4: "هلیوم",
  },
  "37": {
    id: "37",
    text: "کدام قاره کمترین جمعیت را دارد؟",
    category: "جغرافیا",
    difficulty: "medium",
    option1: "اقیانوسیه",
    option2: "قطب جنوب",
    option3: "آمریکای شمالی",
    option4: "اروپا",
  },
  "38": {
    id: "38",
    text: "اولین برنامه‌نویس کامپیوتر چه کسی بود؟",
    category: "کامپیوتر",
    difficulty: "hard",
    option1: "آدا لاولیس",
    option2: "آلن تورینگ",
    option3: "گریس هاپر",
    option4: "جان فون نویمان",
  },
  "39": {
    id: "39",
    text: "کدام هورمون باعث کاهش قند خون می‌شود؟",
    category: "پزشکی",
    difficulty: "medium",
    option1: "انسولین",
    option2: "گلوکاگون",
    option3: "تیروکسین",
    option4: "کورتیزول",
  },
  "40": {
    id: "40",
    text: "کدام دانشمند نظریه تکامل را ارائه کرد؟",
    category: "زیست‌شناسی",
    difficulty: "easy",
    option1: "داروین",
    option2: "مندل",
    option3: "پاستور",
    option4: "لامارک",
  },
  "41": {
    id: "41",
    text: "کدام رود در مصر جریان دارد؟",
    category: "جغرافیا",
    difficulty: "easy",
    option1: "نیل",
    option2: "دجله",
    option3: "فرات",
    option4: "کارون",
  },
  "42": {
    id: "42",
    text: "کدام ویروس باعث بیماری کووید-19 شد؟",
    category: "پزشکی",
    difficulty: "easy",
    option1: "SARS-CoV-2",
    option2: "H1N1",
    option3: "HIV",
    option4: "Ebola",
  },
  "43": {
    id: "43",
    text: "کدام عنصر در ساخت باتری‌های لیتیومی استفاده می‌شود؟",
    category: "شیمی",
    difficulty: "hard",
    option1: "لیتیم",
    option2: "سدیم",
    option3: "پتاسیم",
    option4: "کلسیم",
  },
  "44": {
    id: "44",
    text: "کدام زبان برنامه‌نویسی برای وب محبوب‌تر است؟",
    category: "کامپیوتر",
    difficulty: "easy",
    option1: "JavaScript",
    option2: "Python",
    option3: "Java",
    option4: "C++",
  },
  "45": {
    id: "45",
    text: "بزرگترین ماه منظومه شمسی کدام است؟",
    category: "نجوم",
    difficulty: "medium",
    option1: "گانیمد",
    option2: "تیتان",
    option3: "یوروپا",
    option4: "فوبوس",
  },
  "46": {
    id: "46",
    text: "کدام دانشمند قانون جاذبه را کشف کرد؟",
    category: "فیزیک",
    difficulty: "easy",
    option1: "نیوتن",
    option2: "انیشتین",
    option3: "گالیله",
    option4: "کپلر",
  },
  "47": {
    id: "47",
    text: "بلندترین آبشار جهان کدام است؟",
    category: "جغرافیا",
    difficulty: "hard",
    option1: "آنجل",
    option2: "نیاگارا",
    option3: "ویکتوریا",
    option4: "ایگواسو",
  },
  "48": {
    id: "48",
    text: "کدام شبکه اجتماعی اول توسط مارک زاکربرگ ساخته شد؟",
    category: "کامپیوتر",
    difficulty: "easy",
    option1: "فیس‌بوک",
    option2: "توییتر",
    option3: "اینستاگرام",
    option4: "لینکدین",
  },
  "49": {
    id: "49",
    text: "کدام کهکشان به کهکشان راه شیری نزدیک‌تر است؟",
    category: "نجوم",
    difficulty: "hard",
    option1: "آندرومدا",
    option2: "مثلث",
    option3: "برج الجبار",
    option4: "عقاب",
  },
  "50": {
    id: "50",
    text: "کدام شهر ایران به شهر بادگیرها معروف است؟",
    category: "جغرافیا",
    difficulty: "medium",
    option1: "یزد",
    option2: "کرمان",
    option3: "شیراز",
    option4: "اصفهان",
  },
};

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const headersList = await headers();
  const token = headersList.get("authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;
  const question = questions[id as keyof typeof questions];

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  return NextResponse.json(question);
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  const headersList = await headers();
  const token = headersList.get("authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;
  const question = questions[id as keyof typeof questions];

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  const body = await request.json();
  const {
    text,
    option1,
    option2,
    option3,
    option4,
    correct_answer,
    difficulty_level,
    category_id,
  } = body;

  // Validate required fields
  if (
    !text ||
    !option1 ||
    !option2 ||
    !option3 ||
    !option4 ||
    !correct_answer ||
    !difficulty_level ||
    !category_id
  ) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Map category_id to category name
  const categoryMap: { [key: number]: string } = {
    1: "جغرافیا",
    2: "کامپیوتر",
    3: "نجوم",
    4: "فیزیک",
    5: "شیمی",
    6: "تاریخ",
    7: "زیست‌شناسی",
    8: "پزشکی",
  };

  // Update question
  questions[id as keyof typeof questions] = {
    ...question,
    text,
    category: categoryMap[category_id] || "سایر",
    difficulty: difficulty_level,
    option1,
    option2,
    option3,
    option4,
  };

  return NextResponse.json({
    message: "Question updated successfully",
    question: {
      id,
      text,
    },
  });
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  const headersList = await headers();
  const token = headersList.get("authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const id = params.id;
  const question = questions[id as keyof typeof questions];

  if (!question) {
    return NextResponse.json({ error: "Question not found" }, { status: 404 });
  }

  // Delete the question
  delete questions[id as keyof typeof questions];

  return NextResponse.json({
    message: "Question deleted successfully",
  });
}
