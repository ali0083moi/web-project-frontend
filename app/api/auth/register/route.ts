import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, password, confirmPassword, username, role } = body;

    // Mock validation
    if (password !== confirmPassword) {
      return NextResponse.json(
        { error: "Password and confirm password do not match" },
        { status: 400 }
      );
    }

    // Mock email existence check
    if (email === "existing@email.com") {
      return NextResponse.json(
        { error: "Email is already registered" },
        { status: 400 }
      );
    }

    // Mock successful registration - only return success message
    return NextResponse.json(
      {
        message: "User registered successfully",
        user: {
          id: "123",
          username: username || "Ali Ahmadi",
          email: email || "example@email.com",
          avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali",
          role: role || "designer",
          points: 0,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
