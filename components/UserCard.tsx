import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, UserPlus, Info } from "lucide-react";

interface User {
  id: string;
  username: string;
  points: number;
  role: string;
  avatar_url: string;
  followed: boolean;
}

interface UserCardProps {
  user: User;
  onFollow: (userId: string) => void;
  onUnfollow: (userId: string) => void;
  onShowDetails: (userId: string) => void;
  avatarUrl: string;
}

export default function UserCard({
  user,
  onFollow,
  onUnfollow,
  onShowDetails,
  avatarUrl,
}: UserCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white/10 backdrop-blur-sm border-0">
      <div className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-24 h-24 mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img
                src={user.avatar_url || avatarUrl}
                alt={user.username}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2 text-white">
            {user.username}
          </h3>
          <div className="px-3 py-1 rounded-full bg-white/10 text-white text-sm mb-2">
            {user.role}
          </div>
          <div className="flex items-center justify-center space-x-2 space-x-reverse mb-4">
            <Trophy className="w-4 h-4 text-yellow-300" />
            <span className="text-sm text-white/80">
              {user.points.toLocaleString("fa-IR")} امتیاز
            </span>
          </div>
          <div className="flex gap-3 w-full">
            <Button
              className={`w-full ${
                user.followed
                  ? "bg-red-500 hover:bg-red-600"
                  : "bg-purple-500 hover:bg-purple-600"
              }`}
              onClick={() =>
                user.followed ? onUnfollow(user.id) : onFollow(user.id)
              }
            >
              {user.followed ? "دنبال نکردن" : "دنبال کردن"}
            </Button>
            <Button
              onClick={() => onShowDetails(user.id)}
              className="bg-purple-500/20 hover:bg-purple-500/40 text-white border-0 transition-all duration-300 backdrop-blur-sm hover:scale-105 shadow-lg hover:shadow-purple-500/25 p-2 w-1/2"
              variant="outline"
            >
              <Info className="w-4 h-4 ml-2 animate-pulse" />
              اطلاعات بیشتر
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
