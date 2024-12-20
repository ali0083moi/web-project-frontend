import { NextResponse } from "next/server";

// Helper function to generate random users
function generateRandomUsers(count: number) {
  const roles = ["designer", "player"];
  const firstNames = [
    "مریم",
    "سارا",
    "علی",
    "محمد",
    "فاطمه",
    "زهرا",
    "امیر",
    "حسین",
    "نیما",
    "رضا",
  ];
  const lastNames = [
    "احمدی",
    "رضایی",
    "محمدی",
    "حسینی",
    "کریمی",
    "موسوی",
    "علوی",
    "نجفی",
    "صادقی",
    "طاهری",
  ];

  return Array.from({ length: count }, (_, index) => {
    const username = `${
      firstNames[Math.floor(Math.random() * firstNames.length)]
    } ${lastNames[Math.floor(Math.random() * lastNames.length)]}`;
    return {
      id: (index + 1).toString(),
      username,
      points: Math.floor(Math.random() * 5000),
      role: roles[Math.floor(Math.random() * roles.length)],
      avatar_url: `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
        username
      )}`,
      followed: Math.random() < 0.5,
    };
  });
}

export async function GET(request: Request) {
  try {
    // Check for authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get search query from URL
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query")?.toLowerCase();

    // Generate all users
    const allUsers = generateRandomUsers(50);

    // If there's a search query, filter the users
    const users = query
      ? allUsers.filter(
          (user) =>
            user.username.toLowerCase().includes(query) ||
            user.role.toLowerCase().includes(query)
        )
      : allUsers;

    return NextResponse.json({ users });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
