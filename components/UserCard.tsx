import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Trophy, UserPlus, Info } from "lucide-react";

interface User {
  id: string;
  username: string;
  points: number;
  role: string;
  avatar_url: string;
}

interface UserCardProps {
  user: User;
  onFollow: (userId: string) => void;
  onShowDetails: (userId: string) => void;
  getAvatarUrl: (username: string) => string;
}

export default function UserCard({
  user,
  onFollow,
  onShowDetails,
  getAvatarUrl,
}: UserCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 overflow-hidden bg-white/10 backdrop-blur-sm border-0">
      <div className="p-6">
        <div className="flex flex-col items-center text-center">
          <div className="relative w-24 h-24 mb-4">
            <div className="w-24 h-24 rounded-full overflow-hidden group-hover:scale-105 transition-transform duration-300">
              <img
                src={user.avatar_url || getAvatarUrl(user.username)}
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
              onClick={() => onFollow(user.id)}
              className="flex-1 bg-gradient-to-r from-purple-500/20 to-green-500/20 hover:bg-gradient-to-r hover:from-purple-500/40 hover:to-green-500/40 text-white border-0 transition-all duration-300 backdrop-blur-sm hover:scale-105 shadow-lg hover:shadow-purple-500/25 p-2 w-1/2"
              variant="outline"
            >
              <UserPlus className="w-4 h-4 ml-2 animate-pulse" />
              دنبال کردن
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
