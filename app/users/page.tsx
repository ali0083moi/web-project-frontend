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
import { useDebounce } from "@/hooks/useDebounce";
import { useToast } from "@/components/ui/use-toast";

interface User {
  id: string;
  username: string;
  points: number;
  role: string;
  avatar_url: string;
  followed: boolean;
}

interface UserDetails extends User {
  followers: number;
  followings: number;
}

export default function UsersPage() {
  const { toast } = useToast();
  const [users, setUsers] = useState<User[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const debouncedSearchQuery = useDebounce(searchQuery, 500);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<UserDetails | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (debouncedSearchQuery) {
      searchUsers(debouncedSearchQuery);
    } else {
      fetchUsers();
    }
  }, [debouncedSearchQuery]);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/users", {
        headers: {
          Authorization: `Bearer ${
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("auth-token="))
              ?.split("=")[1] || ""
          }`,
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

  const searchUsers = async (query: string) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8080/api/users?query=${encodeURIComponent(query)}`,
        {
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("auth-token="))
                ?.split("=")[1] || ""
            }`,
          },
        }
      );
      const data = await response.json();
      setUsers(data.users);
    } catch (error) {
      console.error("Error searching users:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFollow = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}/follow`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("auth-token="))
                ?.split("=")[1] || ""
            }`,
          },
        }
      );
      if (response.ok) {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, followed: true } : user
          )
        );
        toast({
          variant: "success",
          title: "موفقیت",
          description: "با موفقیت دنبال شد!",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در دنبال کردن کاربر",
        duration: 3000,
      });
    }
  };

  const handleUnfollow = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}/unfollow`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("auth-token="))
                ?.split("=")[1] || ""
            }`,
          },
        }
      );
      if (response.ok) {
        setUsers(
          users.map((user) =>
            user.id === userId ? { ...user, followed: false } : user
          )
        );
        toast({
          variant: "success",
          title: "موفقیت",
          description: "با موفقیت لغو دنبال شد!",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در لغو دنبال کردن کاربر",
        duration: 3000,
      });
    }
  };

  // const getAvatarUrl = (username: string) => {
  //   return `https://api.dicebear.com/7.x/pixel-art/png?seed=${encodeURIComponent(
  //     username
  //   )}`;
  // };

  const filteredUsers = users.filter(
    (user) =>
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShowDetails = async (userId: string) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/users/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("auth-token="))
                ?.split("=")[1] || ""
            }`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const userData = await response.json();
      setSelectedUser(userData);
      setIsModalOpen(true);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در دریافت اطلاعات کاربر. لطفاً دوباره تلاش کنید.",
        duration: 3000,
      });
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
              placeholder="جستجو بر اساس نام..."
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
              onUnfollow={handleUnfollow}
              onShowDetails={handleShowDetails}
              avatarUrl={user.avatar_url}
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
          className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-950 border-0 text-white p-6 rounded-2xl shadow-2xl w-11/12 md:w-full"
          dir="rtl"
        >
          <button
            onClick={() => setIsModalOpen(false)}
            className="absolute left-4 top-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors duration-200 group"
          >
            <svg
              className="w-5 h-5 text-white/80 group-hover:text-white"
              fill="none"
              strokeWidth="2.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
          {selectedUser && (
            <>
              <DialogHeader className="space-y-4">
                <DialogTitle className="text-2xl font-bold text-center text-white">
                  مشخصات کاربر
                </DialogTitle>
              </DialogHeader>
              <div className="flex flex-col items-center space-y-4">
                <div className="w-24 h-24 rounded-full overflow-hidden">
                  <img
                    src={selectedUser.avatar_url}
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
                      {selectedUser.followings}
                    </div>
                  </div>
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
