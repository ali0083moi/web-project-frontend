"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <button
      onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
      className="p-2 rounded-lg bg-white hover:bg-white/20 transition-colors text-black dark:text-white dark:bg-white/10"
    >
      {theme === "dark" ? "حالت روشن" : "حالت تاریک"}
    </button>
  );
}
