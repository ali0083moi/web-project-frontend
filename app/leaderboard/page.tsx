"use client";

import { useState, useEffect } from "react";
import axios from "axios";

interface Player {
  id: string;
  rank: number;
  username: string;
  points: number;
  avatar_url: string;
}

export default function Leaderboard() {
  const [players, setPlayers] = useState<Player[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("/api/leaderboard", {
          headers: {
            Authorization: `Bearer ${process.env.NEXT_PUBLIC_JWT_TOKEN}`,
          },
        });
        setPlayers(response.data.leaderboard);
      } catch (error) {
        console.error("Error fetching leaderboard:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, []);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen pt-28 pb-10 px-4 bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-950">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-white text-center mb-20">
          جدول امتیازات
        </h1>

        {/* Top 3 Players */}
        <div className="flex justify-center items-end gap-4 mb-12">
          {/* Second Place */}
          <div className="text-center">
            <div className="relative">
              <img
                src={players[1]?.avatar_url}
                alt={players[1]?.username}
                className="w-24 h-24 rounded-full border-4 border-silver bg-white"
              />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-silver rounded-full flex items-center justify-center text-white font-bold">
                2
              </span>
            </div>
            <div className="mt-6 text-white">
              <p className="font-semibold">{players[1]?.username}</p>
              <p className="text-sm opacity-90">{players[1]?.points} امتیاز</p>
            </div>
          </div>

          {/* First Place */}
          <div className="text-center -mt-8">
            <div className="relative">
              <div className="absolute -top-8 left-1/2 -translate-x-1/2">
                <svg
                  className="w-12 h-12 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" />
                </svg>
              </div>
              <img
                src={players[0]?.avatar_url}
                alt={players[0]?.username}
                className="w-32 h-32 rounded-full border-4 border-yellow-400 bg-white"
              />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center text-white font-bold">
                1
              </span>
            </div>
            <div className="mt-6 text-white">
              <p className="font-semibold">{players[0]?.username}</p>
              <p className="text-sm opacity-90">{players[0]?.points} امتیاز</p>
            </div>
          </div>

          {/* Third Place */}
          <div className="text-center">
            <div className="relative">
              <img
                src={players[2]?.avatar_url}
                alt={players[2]?.username}
                className="w-24 h-24 rounded-full border-4 border-bronze bg-white"
              />
              <span className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-8 h-8 bg-bronze rounded-full flex items-center justify-center text-white font-bold">
                3
              </span>
            </div>
            <div className="mt-6 text-white">
              <p className="font-semibold">{players[2]?.username}</p>
              <p className="text-sm opacity-90">{players[2]?.points} امتیاز</p>
            </div>
          </div>
        </div>

        {/* Leaderboard Table */}
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 shadow-xl">
          <div className="space-y-4">
            {players.slice(3).map((player) => (
              <div
                key={player.rank}
                className="flex items-center gap-4 p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
              >
                <span className="w-8 text-center font-bold text-white">
                  {player.rank}
                </span>
                <img
                  src={player.avatar_url}
                  alt={player.username}
                  className="w-12 h-12 rounded-full bg-white"
                />
                <div className="flex-grow">
                  <p className="font-semibold text-white">{player.username}</p>
                </div>
                <div className="text-right">
                  <p className="font-bold text-white">{player.points}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
