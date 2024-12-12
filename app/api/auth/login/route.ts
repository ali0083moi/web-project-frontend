import { NextResponse } from "next/server";

// Mock user data for testing
const mockUsers = [
  {
    id: "1234",
    email: "test@example.com",
    password: "password123",
    username: "Ali Ahmadi",
    role: "player",
    points: 1200,
    followings: 400,
    followers: 200,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali",
  },
  {
    id: "1235",
    email: "test2@example.com",
    password: "password123",
    username: "Reza Ahmadi",
    role: "designer",
    followings: 400,
    followers: 200,
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Reza",
  },
];

const mockJwtToken: Record<string, string> = {
  "test@example.com": "mock_jwt1_token_12345",
  "test2@example.com": "mock_jwt2_token_12345",
};

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password } = body;

    // Find user by email
    const user = mockUsers.find((u) => u.email === email);

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Check password (in a real app, you'd use proper password hashing)
    if (user.password !== password) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    // Successful login
    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json(
      {
        message: "Login successful",
        token: mockJwtToken[email],
        user: userWithoutPassword,
      },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
