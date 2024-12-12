import { NextResponse } from "next/server";
import { headers } from "next/headers";

const categories = {
  categories: [
    {
      id: 1,
      name: "تاریخ",
      description: "سوالات مربوط به رویدادها و شخصیت‌های تاریخی",
      question_count: 45,
    },
    {
      id: 2,
      name: "جغرافیا",
      description: "سوالات مربوط به مکان‌ها، اقلیم و جغرافیای جهان",
      question_count: 52,
    },
    {
      id: 3,
      name: "کامپیوتر",
      description: "سوالات مربوط به علوم کامپیوتر و فناوری اطلاعات",
      question_count: 48,
    },
    {
      id: 4,
      name: "نجوم",
      description: "سوالات مربوط به فضا، سیارات و کهکشان‌ها",
      question_count: 35,
    },
    {
      id: 5,
      name: "زیست‌شناسی",
      description: "سوالات مربوط به موجودات زنده و علوم زیستی",
      question_count: 42,
    },
    {
      id: 6,
      name: "ادبیات",
      description: "سوالات مربوط به شعر، نثر و ادبیات فارسی",
      question_count: 33,
    },
  ],
};

export async function GET() {
  const headersList = await headers();
  const token = headersList.get("authorization");

  if (!token || !token.startsWith("Bearer ")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.json(categories);
}
