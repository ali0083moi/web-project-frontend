import { NextResponse } from "next/server";
import { headers } from "next/headers";

interface Player {
  id: string;
  rank: number;
  username: string;
  points: number;
  avatar_url: string;
}
let players: Player[] = [
  {
    id: "uuid1",
    rank: 1,
    username: "علی احمدی",
    points: 2500,
    avatar_url: "https://api.dicebear.com/9.x/big-smile/svg?seed=Brian",
  },
  {
    id: "uuid2",
    rank: 2,
    username: "مریم حسینی",
    points: 2350,
    avatar_url: "https://api.dicebear.com/9.x/big-smile/svg?seed=Robert",
  },
  {
    id: "uuid3",
    rank: 3,
    username: "امیررضا محمدی",
    points: 2100,
    avatar_url: "https://api.dicebear.com/9.x/big-smile/svg?seed=Eden",
  },
  {
    id: "uuid4",
    rank: 4,
    username: "محمد اکبری",
    points: 1950,
    avatar_url: "https://api.dicebear.com/9.x/big-smile/svg?seed=Amaya",
  },
  {
    id: "uuid5",
    rank: 5,
    username: "سارا رضایی",
    points: 1900,
    avatar_url: "https://api.dicebear.com/9.x/big-smile/svg?seed=Nolan",
  },
];

export async function GET() {
  try {
    const headersList = await headers();
    const authorization = headersList.get("Authorization");

    if (!authorization || !authorization.startsWith("Bearer ")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    return NextResponse.json({
      leaderboard: players,
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch leaderboard data" },
      { status: 500 }
    );
  }
}
