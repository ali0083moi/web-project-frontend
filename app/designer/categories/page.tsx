"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Plus, Filter, Pencil, Trash2 } from "lucide-react";
import CategoryModal from "@/components/CategoryModal";
import { useToast } from "@/components/ui/use-toast";
import ConfirmationModal from "@/components/ConfirmationModal";

interface Category {
  id: number;
  name: string;
  description: string;
}

export default function CategoriesPage() {
  const { toast } = useToast();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [isConfirmModalOpen, setIsConfirmModalOpen] = useState(false);
  const [deletingCategoryId, setDeletingCategoryId] = useState<number | null>(
    null
  );

  const fetchCategories = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/categories/my", {
        headers: {
          Authorization: `Bearer ${
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("auth-token="))
              ?.split("=")[1] || ""
          }`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setCategories(data.categories);
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در دریافت دسته‌بندی‌ها",
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetchCategories();
    }
  }, []);

  const handleCreateCategory = async (data: {
    name: string;
    description: string;
  }) => {
    try {
      const response = await fetch("http://localhost:8080/api/categories", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${
            document.cookie
              .split("; ")
              .find((row) => row.startsWith("auth-token="))
              ?.split("=")[1] || ""
          }`,
        },
        body: JSON.stringify({
          ...data,
          created_by: JSON.parse(localStorage.getItem("user") || "{}").id,
        }),
      });

      if (response.ok) {
        toast({
          variant: "success",
          title: "موفقیت",
          description: "دسته‌بندی با موفقیت ایجاد شد",
          duration: 3000,
        });
        fetchCategories();
      } else {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "خطا در ایجاد دسته‌بندی",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در ایجاد دسته‌بندی",
        duration: 3000,
      });
    }
  };

  const handleUpdateCategory = async (data: {
    name: string;
    description: string;
  }) => {
    if (!editingCategory) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/categories/${editingCategory.id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${
              document.cookie
                .split("; ")
                .find((row) => row.startsWith("auth-token="))
                ?.split("=")[1] || ""
            }`,
          },
          body: JSON.stringify({
            ...data,
            created_by: JSON.parse(localStorage.getItem("user") || "{}").id,
          }),
        }
      );

      if (response.ok) {
        toast({
          variant: "success",
          title: "موفقیت",
          description: "دسته‌بندی با موفقیت بروزرسانی شد",
          duration: 3000,
        });
        fetchCategories();
      } else {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "خطا در بروزرسانی دسته‌بندی",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در بروزرسانی دسته‌بندی",
        duration: 3000,
      });
    }
  };

  const handleDeleteCategory = async (id: number) => {
    setDeletingCategoryId(id);
    setIsConfirmModalOpen(true);
  };

  const confirmDelete = async () => {
    if (!deletingCategoryId) return;

    try {
      const response = await fetch(
        `http://localhost:8080/api/categories/${deletingCategoryId}`,
        {
          method: "DELETE",
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
        toast({
          variant: "success",
          title: "موفقیت",
          description: "دسته‌بندی با موفقیت حذف شد",
          duration: 3000,
        });
        fetchCategories();
      } else {
        const data = await response.json();
        toast({
          variant: "destructive",
          title: "خطا",
          description: data.error || "خطا در حذف دسته‌بندی",
          duration: 3000,
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در حذف دسته‌بندی",
        duration: 3000,
      });
    }
  };

  const handleEditCategory = async (category: Category) => {
    try {
      const response = await fetch(
        `http://localhost:8080/api/categories/${category.id}`,
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

      if (response.ok) {
        const data = await response.json();
        setEditingCategory(data);
        setIsModalOpen(true);
      } else {
        toast({
          variant: "destructive",
          title: "خطا",
          description: "خطا در دریافت اطلاعات دسته‌بندی",
        });
      }
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در دریافت اطلاعات دسته‌بندی",
      });
    }
  };

  return (
    <div className="min-h-screen pt-28 pb-10 px-4 bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/10 backdrop-blur-sm rounded-3xl p-8 mb-8"
        >
          <div className="flex flex-col md:flex-row gap-8 items-start md:items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-white mb-2 text-right">
                مدیریت دسته‌بندی‌ها
              </h1>
              <p className="text-white/80 text-right">
                دسته‌بندی‌های خود را مدیریت کنید و دسته‌بندی جدید اضافه کنید
              </p>
            </div>

            <button
              onClick={() => {
                setEditingCategory(null);
                setIsModalOpen(true);
              }}
              className="flex items-center gap-2 bg-white/10 hover:bg-white/20 
                       text-white px-6 py-3 rounded-xl transition-all duration-300"
            >
              <Plus className="w-5 h-5" />
              <span>افزودن دسته‌بندی جدید</span>
            </button>
          </div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {categories.map((category, index) => (
            <motion.div
              key={category.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6"
            >
              <h3 className="text-xl font-semibold mb-2 text-white">
                {category.name}
              </h3>
              <p className="text-white/80 mb-4">{category.description}</p>
              <div className="flex justify-end gap-2">
                <button
                  onClick={() => handleEditCategory(category)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                >
                  <Pencil className="w-4 h-4 text-white" />
                </button>
                <button
                  onClick={() => handleDeleteCategory(category.id)}
                  className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-all"
                >
                  <Trash2 className="w-4 h-4 text-red-400" />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <CategoryModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setEditingCategory(null);
          }}
          onSubmit={
            editingCategory ? handleUpdateCategory : handleCreateCategory
          }
          initialData={editingCategory || undefined}
          title={editingCategory ? "ویرایش دسته‌بندی" : "افزودن دسته‌بندی جدید"}
        />

        <ConfirmationModal
          isOpen={isConfirmModalOpen}
          onClose={() => setIsConfirmModalOpen(false)}
          onConfirm={confirmDelete}
          title="حذف دسته‌بندی"
          description="آیا از حذف این دسته‌بندی اطمینان دارید؟ این عمل قابل بازگشت نیست."
        />
      </div>
    </div>
  );
}
