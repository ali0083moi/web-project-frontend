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
    picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali",
  },
  {
    id: "1235",
    email: "test2@example.com",
    username: "Reza Ahmadi",
    role: "designer",
    followings: 400,
    followers: 200,
    picture_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Reza",
  },
];

export async function GET() {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth-token");

  if (!token) {
    return NextResponse.json({ user: null });
  }

  try {
    // Since we're using a mock token, we'll just return the mock user
    // In a real app, you would verify the JWT token here
    if (token.value === "mock_jwt_token_12345") {
      return NextResponse.json({ user: mockUsers[0] });
    }

    return NextResponse.json({ user: null });
  } catch (error) {
    return NextResponse.json({ user: null });
  }
}
