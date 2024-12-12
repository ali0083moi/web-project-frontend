import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: { name: string; description: string }) => void;
  initialData?: {
    name: string;
    description: string;
  };
  title: string;
}

export default function CategoryModal({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  title,
}: CategoryModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
  });

  // Reset form data when modal opens/closes or initialData changes
  useEffect(() => {
    if (initialData) {
      setFormData({
        name: initialData.name,
        description: initialData.description,
      });
    } else {
      setFormData({
        name: "",
        description: "",
      });
    }
  }, [initialData, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="bg-gradient-to-br from-purple-900 to-purple-950 
                               text-white border-none shadow-2xl max-w-2xl w-[95%] 
                               rounded-2xl fixed top-1/2 left-1/2 transform 
                               -translate-x-1/2 -translate-y-1/2"
      >
        <DialogHeader>
          <div className="flex items-center justify-between">
            <button
              onClick={onClose}
              className="p-2 hover:bg-white/10 rounded-lg transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
            <DialogTitle className="text-xl font-bold text-white">
              {title}
            </DialogTitle>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 mt-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90 text-right">
              نام دسته‌بندی
            </label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
              className="w-full bg-white/10 text-white rounded-xl px-4 py-3 
                       outline-none focus:ring-2 focus:ring-white/20 
                       placeholder-white/50 transition-all duration-300"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-white/90 text-right">
              توضیحات
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  description: e.target.value,
                })
              }
              className="w-full bg-white/10 text-white rounded-xl px-4 py-3 
                       outline-none focus:ring-2 focus:ring-white/20 
                       placeholder-white/50 transition-all duration-300"
              rows={3}
              required
            />
          </div>

          <div className="flex justify-end gap-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 
                       text-white transition-colors"
            >
              انصراف
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded-lg bg-purple-600 hover:bg-purple-700 
                       text-white transition-colors"
            >
              ذخیره
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
