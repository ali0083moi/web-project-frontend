import { NextResponse } from "next/server";
import { headers } from "next/headers";

const categories = {
  "1": {
    id: 1,
    name: "تاریخ",
    description: "سوالات مربوط به رویدادها و شخصیت‌های تاریخی",
    created_by: 1,
  },
  "2": {
    id: 2,
    name: "جغرافیا",
    description: "سوالات مربوط به مکان‌ها، اقلیم و جغرافیای جهان",
    created_by: 1,
  },
  "3": {
    id: 3,
    name: "کامپیوتر",
    description: "سوالات مربوط به علوم کامپیوتر و فناوری اطلاعات",
    created_by: 1,
  },
  "4": {
    id: 4,
    name: "نجوم",
    description: "سوالات مربوط به فضا، سیارات و کهکشان‌ها",
    created_by: 1,
  },
  "5": {
    id: 5,
    name: "زیست‌شناسی",
    description: "سوالات مربوط به موجودات زنده و علوم زیستی",
    created_by: 1,
  },
  "6": {
    id: 6,
    name: "ادبیات",
    description: "سوالات مربوط به شعر، نثر و ادبیات فارسی",
    created_by: 1,
  },
};

// Mock questions data to check for category references
const questions = {
  "1": { category_id: 1 },
  "2": { category_id: 2 },
};

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
  const category = categories[id as keyof typeof categories];

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  // Check if category has associated questions
  const hasQuestions = Object.values(questions).some(
    (q) => q.category_id === Number(id)
  );
  if (hasQuestions) {
    return NextResponse.json(
      { error: "Category cannot be deleted as it has associated questions" },
      { status: 400 }
    );
  }

  delete categories[id as keyof typeof categories];

  return NextResponse.json({
    message: "Category deleted successfully",
  });
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
  const category = categories[id as keyof typeof categories];

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  const body = await request.json();
  const { name, description, created_by } = body;

  if (!name || !description || !created_by) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Update category
  categories[id as keyof typeof categories] = {
    ...category,
    name,
    description,
    created_by,
  };

  return NextResponse.json({
    message: "Category updated successfully",
    category: {
      id: Number(id),
      name,
      description,
    },
  });
}

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
  const category = categories[id as keyof typeof categories];

  if (!category) {
    return NextResponse.json({ error: "Category not found" }, { status: 404 });
  }

  return NextResponse.json({
    id: category.id,
    name: category.name,
    description: category.description,
  });
}
