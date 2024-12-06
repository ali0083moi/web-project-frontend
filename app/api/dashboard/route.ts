import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Mock user data - should match the login route
const mockUsers = [
  {
    id: "1234",
    email: "test@example.com",
    username: "Ali Ahmadi",
    role: "player",
    points: 1200,
    followings: 400,
    followers: 200,
    avatar_url: "https://api.dicebear.com/7.x/big-smile/svg?seed=Ali",
  },
  {
    id: "1235",
    email: "test2@example.com",
    username: "Reza Ahmadi",
    role: "designer",
    followings: 400,
    followers: 200,
    avatar_url: "https://api.dicebear.com/7.x/big-smile/svg?seed=Reza",
  },
];

export async function GET(request: Request) {
  try {
    // Check for authorization header
    const authHeader = request.headers.get("authorization");
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    // Get token from cookies to verify authentication
    const cookieStore = await cookies();
    const token = cookieStore.get("auth-token");

    if (!token || token.value !== "mock_jwt_token_12345") {
      return NextResponse.json({ error: "Invalid token" }, { status: 401 });
    }

    // In a real application, you would:
    // 1. Verify the JWT token
    // 2. Get the user ID from the token
    // 3. Fetch the user's data from the database

    // For mock purposes, we'll return the first user
    const user = mockUsers[0];

    return NextResponse.json({ user });
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
