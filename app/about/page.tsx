import Image from "next/image";
import Link from "next/link";

export default function AboutUs() {
  const teamMembers = [
    {
      name: "علی محمدی",
      role: "مدیر پروژه",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Ali1",
      description: "متخصص در مدیریت پروژه‌های نرم‌افزاری با ۸ سال تجربه",
    },
    {
      name: "سارا احمدی",
      role: "طراح رابط کاربری",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Sara",
      description: "طراح خلاق با تجربه در ایجاد رابط‌های کاربری جذاب و کاربردی",
    },
    {
      name: "محمد حسینی",
      role: "توسعه‌دهنده ارشد",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Mohammad",
      description: "متخصص در توسعه برنامه‌های وب با استفاده از فناوری‌های مدرن",
    },
  ];

  const features = [
    {
      title: "یادگیری تعاملی",
      description:
        "با شرکت در چالش‌��ای متنوع، دانش خود را به روشی سرگرم‌کننده افزایش دهید",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
          />
        </svg>
      ),
    },
    {
      title: "رقابت سالم",
      description:
        "با دوستان و سایر کاربران در یک محیط رقابتی سالم به چالش بپردازید",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
      ),
    },
    {
      title: "جوایز ارزنده",
      description:
        "با کسب امتیاز و رتبه‌های برتر، جوایز ��فتگی و ماهانه دریافت کنید",
      icon: (
        <svg
          className="w-6 h-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7"
          />
        </svg>
      ),
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-10 bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-950">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          درباره کوییز گیم
        </h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
          پلتفرم آموزشی تعاملی که یادگیری را به یک تجربه جذاب و سرگرم‌کننده
          تبدیل می‌کند
        </p>
      </div>

      {/* Features Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white hover:transform hover:scale-105 transition-all duration-300"
            >
              <div className="bg-purple-500/50 rounded-full w-12 h-12 flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
              <p className="opacity-90">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          تیم ما
        </h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white/10 backdrop-blur-sm rounded-xl p-6 text-white text-center hover:transform hover:scale-105 transition-all duration-300"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 bg-white"
              />
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="text-purple-200 mb-3">{member.role}</p>
              <p className="opacity-90">{member.description}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Contact Section */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-8">با ما در ارتباط باشید</h2>
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8">
          <p className="mb-6">
            برای دریافت اخبار و به‌روزرسانی‌های جدید، ما را در شبکه‌های اجتماعی
            دنبال کنید
          </p>
          <div className="flex justify-center space-x-6 space-x-reverse">
            <Link
              href="#"
              className="bg-purple-500/50 p-3 rounded-full hover:bg-purple-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="bg-purple-500/50 p-3 rounded-full hover:bg-purple-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
              </svg>
            </Link>
            <Link
              href="#"
              className="bg-purple-500/50 p-3 rounded-full hover:bg-purple-500 transition-colors"
            >
              <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z M2 9h4v12H2z M4 2a2 2 0 1 1-2 2 2 2 0 0 1 2-2" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
