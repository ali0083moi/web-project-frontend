import { NextResponse } from "next/server";

interface Player {
  rank: number;
  username: string;
  points: number;
  avatarUrl: string;
}
let players: Player[] = [
  {
    rank: 1,
    username: "علی احمدی",
    points: 2500,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali",
  },
  {
    rank: 2,
    username: "مریم حسینی",
    points: 2350,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maryam",
  },
  {
    rank: 3,
    username: "مریم حسینی",
    points: 2350,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maryam",
  },
  {
    rank: 4,
    username: "مریم حسینی",
    points: 2350,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maryam",
  },
  {
    rank: 5,
    username: "مریم حسینی",
    points: 2350,
    avatarUrl: "https://api.dicebear.com/7.x/avataaars/svg?seed=Maryam",
  },
];

export async function GET() {
  try {
    return NextResponse.json(players);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch leaderboard data" },
      { status: 500 }
    );
  }
}
