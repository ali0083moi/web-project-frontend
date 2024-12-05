import Link from "next/link";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center flex-grow p-4 py-24 md:p-24 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 dark:from-purple-900 dark:via-pink-900 dark:to-red-900 min-h-screen">
      {/* Hero Section */}
      <div className="text-center text-white mb-16">
        <h1 className="text-4xl font-bold mb-4">
          به دنیای سوال و جواب خوش آمدید!
        </h1>
        <p className="text-xl mb-8">
          دانش خود را به چالش بکشید، با دوستان رقابت کنید و جوایز هیجان‌انگیز
          ببرید.
        </p>
        <Link
          href="/signup"
          className="bg-white text-purple-600 dark:bg-gray-800 dark:text-purple-400 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition"
        >
          شروع بازی
        </Link>
      </div>

      {/* Features Grid */}
      <div className="grid md:grid-cols-3 gap-8 text-white text-center max-w-6xl mb-16">
        <div className="bg-white/10 dark:bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-4">موضوعات متنوع</h3>
          <p>
            از تاریخ و علوم گرفته تا ورزش و سرگرمی، موضوعات متنوعی را کاوش کنید
            و دانش خود را گسترش دهید.
          </p>
        </div>
        <div className="bg-white/10 dark:bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-4">رقابت آنلاین</h3>
          <p>
            با بازیکنان از سراسر ایران و جهان رقابت کنید، دوستان جدید پیدا کنید
            و مهارت‌های خود را محک بزنید.
          </p>
        </div>
        <div className="bg-white/10 dark:bg-gray-800/50 p-6 rounded-lg backdrop-blur-sm">
          <h3 className="text-xl font-bold mb-4">جوایز هفتگی</h3>
          <p>
            با کسب امتیاز و رتبه‌بندی بالا، شانس خود را برای بردن جوایز هفتگی
            هیجان‌انگیز افزایش دهید.
          </p>
        </div>
      </div>

      {/* How to Start Section */}
      <div className="text-white text-center max-w-4xl">
        <h2 className="text-3xl font-bold mb-8">چگونه شروع کنیم؟</h2>
        <ul className="text-right list-decimal list-inside space-y-4 mb-12">
          <li>ثبت نام کنید و یک حساب کاربری بسازید.</li>
          <li>موضوع مورد علاقه خود را انتخاب کنید.</li>
          <li>به سوالات پاسخ دهید و امتیاز جمع کنید.</li>
          <li>با دوستان خود رقابت کنید و در لیدربورد بالا بروید.</li>
          <li>جوایز هفتگی را برنده شوید و از بازی لذت ببرید!</li>
        </ul>

        <div className="text-center">
          <h3 className="text-2xl mb-6">
            آماده‌اید تا دانش خود را به چالش بکشید؟
          </h3>
          <Link
            href="/signup"
            className="bg-white text-purple-600 px-8 py-3 rounded-full font-bold hover:bg-opacity-90 transition"
          >
            همین حالا شروع کنید
          </Link>
        </div>
      </div>
    </main>
  );
}
