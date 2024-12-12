"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  description: string;
}

export default function ConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  description,
}: ConfirmationModalProps) {
  const { toast } = useToast();

  const handleConfirm = () => {
    try {
      onConfirm();
      onClose();
      toast({
        variant: "success",
        title: "موفقیت",
        description: "عملیات با موفقیت انجام شد",
        duration: 3000,
      });
    } catch (error) {
      toast({
        variant: "destructive",
        title: "خطا",
        description: "خطا در انجام عملیات",
        duration: 3000,
      });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] bg-gradient-to-br from-purple-900 to-purple-950 text-white border-none shadow-2xl max-w-md w-[95%] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold text-center">
            {title}
          </DialogTitle>
        </DialogHeader>
        <div className="py-4 text-center text-white/80">{description}</div>
        <div className="flex justify-end gap-4 mt-4">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/20 text-white transition-colors"
          >
            انصراف
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 text-white transition-colors"
          >
            حذف
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
