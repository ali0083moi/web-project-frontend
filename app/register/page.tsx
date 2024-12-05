"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Register() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    acceptTerms: false,
    role: "player",
  });
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
  });

  const validatePasswords = () => {
    let isValid = true;
    const newErrors = { password: "", confirmPassword: "" };

    if (formData.password.length < 8) {
      newErrors.password = "رمز عبور باید حداقل ۸ کاراکتر باشد";
      isValid = false;
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "رمز عبور و تکرار آن مطابقت ندارند";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validatePasswords()) return;

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      router.push("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-950 py-12 pt-28 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md">
        <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 shadow-xl">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-white mb-2">ثبت نام</h1>
            <p className="text-white/80">به جمع کاربران کوئیزلند بپیوندید</p>
          </div>

          {/* Register Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name Input */}
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium text-white mb-2"
              >
                نام و نام خانوادگی
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="علی احمدی"
                required
              />
            </div>

            {/* Email Input */}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-white mb-2"
              >
                ایمیل
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-4 py-3 rounded-lg bg-white/5 border border-white/10 text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors"
                placeholder="example@email.com"
                required
              />
            </div>

            {/* Password Input */}
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-white mb-2"
              >
                رمز عبور
              </label>
              <input
                type="password"
                id="password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors ${
                  errors.password ? "border-red-500" : "border-white/10"
                }`}
                placeholder="********"
                required
              />
              {errors.password && (
                <p className="mt-1 text-sm text-red-400">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label
                htmlFor="confirmPassword"
                className="block text-sm font-medium text-white mb-2"
              >
                تکرار رمز عبور
              </label>
              <input
                type="password"
                id="confirmPassword"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className={`w-full px-4 py-3 rounded-lg bg-white/5 border text-white placeholder-white/50 focus:outline-none focus:border-purple-500 transition-colors ${
                  errors.confirmPassword ? "border-red-500" : "border-white/10"
                }`}
                placeholder="********"
                required
              />
              {errors.confirmPassword && (
                <p className="mt-1 text-sm text-red-400">
                  {errors.confirmPassword}
                </p>
              )}
            </div>

            {/* Role Selection */}
            <div>
              <label className="block text-sm font-medium text-white mb-3">
                نوع حساب کاربری
              </label>
              <div className="flex space-x-6 space-x-reverse">
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="player"
                    name="role"
                    value="player"
                    checked={formData.role === "player"}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="h-4 w-4 border-white/10 bg-white/5 text-purple-500 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="player"
                    className="mr-2 text-sm text-white/80 select-none"
                  >
                    بازیکن
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    type="radio"
                    id="designer"
                    name="role"
                    value="designer"
                    checked={formData.role === "designer"}
                    onChange={(e) =>
                      setFormData({ ...formData, role: e.target.value })
                    }
                    className="h-4 w-4 border-white/10 bg-white/5 text-purple-500 focus:ring-purple-500"
                  />
                  <label
                    htmlFor="designer"
                    className="mr-2 text-sm text-white/80 select-none"
                  >
                    طراح سوال
                  </label>
                </div>
              </div>
            </div>

            {/* Terms and Conditions */}
            <div className="flex items-center">
              <input
                type="checkbox"
                id="terms"
                checked={formData.acceptTerms}
                onChange={(e) =>
                  setFormData({ ...formData, acceptTerms: e.target.checked })
                }
                className="h-4 w-4 rounded border-white/10 bg-white/5 text-purple-500 focus:ring-purple-500"
                required
              />
              <label
                htmlFor="terms"
                className="mr-2 text-sm text-white/80 select-none"
              >
                <span>با </span>
                <Link
                  href="/terms"
                  className="text-white hover:text-purple-200 transition-colors"
                >
                  قوانین و مقررات
                </Link>
                <span> موافقم</span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3 px-4 rounded-lg bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <span className="flex items-center justify-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  در حال ثبت نام...
                </span>
              ) : (
                "ثبت نام"
              )}
            </button>

            {/* Login Link */}
            <div className="text-center mt-6">
              <p className="text-white/80">
                قبلاً ثبت نام کرده‌اید؟{" "}
                <Link
                  href="/login"
                  className="text-white font-medium hover:text-purple-200 transition-colors"
                >
                  وارد شوید
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
