"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function CategoriesPage() {
  const router = useRouter();

  useEffect(() => {
    router.push("/designer/categories");
  }, []);
}
