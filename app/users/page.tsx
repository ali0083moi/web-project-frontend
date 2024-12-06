"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Search, UserPlus, Trophy, Users, Info } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import UserCard from "@/components/UserCard";

interface User {
  id: string;
  username: string;
  points: number;
  role: string;
  avatar_url: string;
}

interface UserDetails extends User {
  bio?: string;
  email?: string;
  joinedAt: string;
  followers: number;
  following: number;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("/api/users", {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = await response.json();
      setUsers(data.users);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching users:", error);
      setLoading(false);
    }
  };

  const handleFollow = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/follow`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      if (response.ok) {
        alert("با موفقیت دنبال شد!");
      }
    } catch (error) {
      console.error("Error following user:", error);
    }
  };

  const getAvatarUrl = (username: string) => {
    return `https://api.dicebear.com/7.x/pixel-art/png?seed=${encodeURIComponent(
      username
    )}`;
  };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShowDetails = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      if (!data.user) {
        throw new Error("User data not found");
      }

      setSelectedUser(data.user);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Error fetching user details:", error);
      alert("Could not load user details. Please try again later.");
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-950">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-white border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-950 py-28 px-4">
      <div className="container mx-auto max-w-7xl">
        {/* Header Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center p-3 mb-4 rounded-full bg-white/10 backdrop-blur-sm">
            <Users className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl font-bold mb-4 text-white">
            یافتن دوست‌های جدید
          </h1>
          <p className="text-white/80 max-w-2xl mx-auto text-lg">
            با کاربران دیگر آشنا شوید، آنها را دنبال کنید و تجربیات خود را به
            اشتراک بگذارید.
          </p>
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 gap-4 sm:gap-6 mb-12">
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-0 text-white">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="p-3 rounded-full bg-white/10">
                <Users className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/80">تعداد کاربران</p>
                <p className="text-2xl font-bold">{users.length}</p>
              </div>
            </div>
          </Card>
          <Card className="p-6 bg-white/10 backdrop-blur-sm border-0 text-white">
            <div className="flex items-center space-x-4 space-x-reverse">
              <div className="p-3 rounded-full bg-white/10">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/80">مجموع امتیازات</p>
                <p className="text-2xl font-bold">
                  {users
                    .reduce((sum, user) => sum + user.points, 0)
                    .toLocaleString("fa-IR")}
                </p>
              </div>
            </div>
          </Card>
        </div>

        {/* Search Bar */}
        <div className="relative max-w-2xl mx-auto mb-12">
          <div className="relative">
            <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white/60" />
            <Input
              type="text"
              placeholder="جستجو بر اساس نام یا نقش..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-4 pr-12 w-full h-12 text-lg bg-white/10 border-white/20 text-white placeholder:text-white/60"
              dir="rtl"
            />
          </div>
          <p className="mt-2 text-sm text-white/60 text-center">
            {filteredUsers.length} کاربر یافت شد
          </p>
        </div>

        {/* Users Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onFollow={handleFollow}
              onShowDetails={handleShowDetails}
              getAvatarUrl={getAvatarUrl}
            />
          ))}
        </div>

        {filteredUsers.length === 0 && (
          <div className="text-center text-white mt-12">
            <div className="inline-flex items-center justify-center p-4 rounded-full bg-white/10 mb-4">
              <Search className="w-6 h-6" />
            </div>
            <h3 className="text-lg font-semibold mb-2">کاربری یافت نشد</h3>
            <p className="text-white/80">لطفاً با معیارهای دیگری جستجو کنید</p>
          </div>
        )}
      </div>

      {/* User Details Modal */}
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent
          className="max-w-md mx-auto bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-950 border-0 text-white"
          dir="rtl"
        >
          {selectedUser && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl font-bold text-center mb-4 text-white">
                  مشخصات کاربر
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src={
                      selectedUser.avatar_url ||
                      getAvatarUrl(selectedUser.username)
                    }
                    alt={selectedUser.username}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h3 className="text-xl font-semibold text-white">
                  {selectedUser.username}
                </h3>
                <div className="px-3 py-1 rounded-full bg-white/10 text-white text-sm">
                  {selectedUser.role}
                </div>

                <div className="grid grid-cols-2 gap-4 w-full">
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <div className="text-sm text-white/80">دنبال‌کنندگان</div>
                    <div className="font-bold text-white">
                      {selectedUser.followers}
                    </div>
                  </div>
                  <div className="text-center p-3 bg-white/10 rounded-lg">
                    <div className="text-sm text-white/80">دنبال‌شده‌ها</div>
                    <div className="font-bold text-white">
                      {selectedUser.following}
                    </div>
                  </div>
                </div>

                {selectedUser.bio && (
                  <div className="w-full">
                    <div className="text-sm text-white/80 mb-1">بیوگرافی</div>
                    <p className="text-sm text-white">{selectedUser.bio}</p>
                  </div>
                )}

                <div className="w-full">
                  <div className="text-sm text-white/80 mb-1">تاریخ عضویت</div>
                  <p className="text-sm text-white">
                    {new Date(selectedUser.joinedAt).toLocaleDateString(
                      "fa-IR"
                    )}
                  </p>
                </div>

                <div className="flex items-center justify-center space-x-2 space-x-reverse">
                  <Trophy className="w-4 h-4 text-yellow-300" />
                  <span className="text-sm text-white/80">
                    {selectedUser.points.toLocaleString("fa-IR")} امتیاز
                  </span>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
