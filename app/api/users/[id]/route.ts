import { NextResponse } from "next/server";

// Helper function to generate random users (copied from /api/users/route.ts)
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
      followed: Math.random() > 0.5 ? true : false,
    };
  });
}

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    // Check for authorization header
    const authHeader = request.headers.get("authorization");

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Generate all users to find the matching one
    const allUsers = generateRandomUsers(50);
    const user = allUsers.find((u) => u.id === params.id);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Add followers and following counts to the user object
    const userWithDetails = {
      ...user,
      followers: Math.floor(Math.random() * 1000),
      following: Math.floor(Math.random() * 500),
    };

    return NextResponse.json({ user: userWithDetails });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
