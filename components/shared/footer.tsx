export default function Footer() {
  return (
    <footer
      className="bg-neutral-200/80 dark:bg-neutral-800/80 text-white"
      dir="rtl"
    >
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="w-full flex justify-center">
          {/* About Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-bold text-center">درباره کوئیزلند</h3>
            <p className="text-sm text-center">
              کوئیزلند یک پلتفرم آنلاین برای یادگیری از طریق بازی و سرگرمی است.
              با ما همراه باشید و در مسابقات هیجان‌انگیز شرکت کنید.
            </p>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-sm">
            © {new Date().getFullYear()} کوئیزلند. تمامی حقوق محفوظ است.
          </p>
        </div>
      </div>
    </footer>
  );
}
