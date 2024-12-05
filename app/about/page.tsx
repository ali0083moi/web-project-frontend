export default function AboutUs() {
  const teamMembers = [
    {
      name: "علی مقدسی",
      imageUrl: "/images/ali.jpeg",
      UniCode: "402106542",
    },
    {
      name: "مائده حیدری",
      imageUrl: "/images/maedeh.jpeg",
      UniCode: "400104918",
    },
    {
      name: "علیرضا میرشفیعیان",
      imageUrl: "/images/alireza.jpeg",
      UniCode: "401106628",
    },
  ];

  const technologies = [
    {
      name: "React",
      icon: "🔵",
      description: "کتابخانه‌ای قدرتمند برای ساخت رابط کاربری",
    },
    {
      name: "Next.js",
      icon: "⚡",
      description: "فریم‌ورک React برای تولید برنامه‌های وب",
    },
    {
      name: "Tailwind CSS",
      icon: "🎨",
      description: "فریم‌ورک CSS برای طراحی سریع و انعطاف‌پذیر",
    },
    {
      name: "TypeScript",
      icon: "📘",
      description: "جاوااسکریپت با قابلیت تایپ استاتیک",
    },
  ];

  return (
    <div className="min-h-screen pt-28 pb-10 bg-gradient-to-b from-purple-400 to-purple-600 dark:from-purple-900 dark:to-purple-950">
      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white mb-20">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">درباره کوئیزلند</h1>
        <p className="text-xl md:text-2xl max-w-3xl mx-auto opacity-90">
          پلتفرم آموزشی تعاملی که یادگیری را به یک تجربه جذاب و سرگرم‌کننده
          تبدیل می‌کند
        </p>
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
                src={member.imageUrl}
                alt={member.name}
                className="w-32 h-32 rounded-full mx-auto mb-4 bg-white"
              />
              <h3 className="text-xl font-bold mb-1">{member.name}</h3>
              <p className="opacity-90">{member.UniCode}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Technologies Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-bold text-white text-center mb-12">
          تکنولوژی‌های مورد استفاده
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2 cursor-pointer"
            >
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                {tech.icon}
              </div>
              <h3 className="text-white text-xl font-bold mb-2">{tech.name}</h3>
              <p className="text-white/80 text-sm">{tech.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
