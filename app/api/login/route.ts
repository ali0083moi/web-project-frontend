import { NextResponse } from "next/server";

const loginData = {
  username: "admin",
  password: "admin",
};

export async function GET() {
  try {
    return NextResponse.json(loginData);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch leaderboard data" },
      { status: 500 }
    );
  }
}
