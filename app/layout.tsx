import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { AuthProvider } from "@/contexts/AuthContext";
import Navbar from "@/components/shared/navbar";
import { ThemeProvider } from "./providers/theme-provider";
import Footer from "@/components/shared/footer";
import { Toaster } from "@/components/ui/toaster";
export const metadata: Metadata = {
  title: "کوئیزلند",
  description: "کوئیزلند",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <html lang="fa" dir="rtl" suppressHydrationWarning>
        <body
          className="font-vazir h-screen flex flex-col"
          suppressHydrationWarning
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <Navbar />
            <main className="w-full flex-grow">{children}</main>
            <Footer />
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </AuthProvider>
  );
}
