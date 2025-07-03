import { SectionWrapper } from "@/components/section-wrapper";
import { getGithubStats } from "@/lib/github";
import { Star, Users, GitFork, Package, AlertTriangle, Activity } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const statCardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

const StatCard = ({ icon: Icon, label, value, customIndex }: { icon: React.ElementType, label: string, value: string | number, customIndex: number }) => (
  <motion.div
    className="bg-light-card dark:bg-dark-card p-4 md:p-6 rounded-lg shadow-md flex flex-col items-center text-center"
    custom={customIndex}
    variants={statCardVariants}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true, amount: 0.5 }}
  >
    <Icon size={32} className="mb-3 text-light-primary dark:text-dark-primary" />
    <p className="text-2xl md:text-3xl font-bold text-light-card-foreground dark:text-dark-card-foreground">{value}</p>
    <p className="text-sm text-light-muted-foreground dark:text-dark-muted-foreground">{label}</p>
  </motion.div>
);

export async function GitHubActivity() {
  const stats = await getGithubStats();

  if (!stats) {
    return (
      <SectionWrapper id="github-activity" title="فعالیت گیت‌هاب" subtitle="آمار و نمودار فعالیت‌های من در گیت‌هاب.">
        <div className="flex flex-col items-center justify-center text-center bg-light-card dark:bg-dark-card p-8 rounded-lg shadow-md">
          <AlertTriangle size={48} className="text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">خطا در بارگذاری آمار گیت‌هاب</h3>
          <p className="text-light-muted-foreground dark:text-dark-muted-foreground">
            متاسفانه در حال حاضر امکان نمایش آمار گیت‌هاب وجود ندارد.
          </p>
        </div>
      </SectionWrapper>
    );
  }

  const primaryLanguages = Object.entries(stats.languages)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 5); // Display top 5 languages

  return (
    <SectionWrapper id="github-activity" title="فعالیت گیت‌هاب" subtitle="نگاهی کلی به آمار و نمودار مشارکت‌های من در پلتفرم گیت‌هاب.">
      <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
        <StatCard icon={Package} label="ریپازیتوری عمومی" value={stats.publicRepos} customIndex={0} />
        <StatCard icon={Star} label="مجموع ستاره‌ها" value={stats.totalStars} customIndex={1} />
        <StatCard icon={Users} label="دنبال‌کنندگان" value={stats.followers} customIndex={2} />
        <StatCard icon={GitFork} label="مجموع فورک‌ها" value={stats.totalForks} customIndex={3} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 items-start">
        {/* Contribution Chart */}
        <motion.div
          className="md:col-span-2 bg-light-card dark:bg-dark-card p-4 md:p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-light-card-foreground dark:text-dark-card-foreground flex items-center">
            <Activity size={24} className="ml-2 rtl:mr-2 rtl:ml-0 text-green-500" />
            نمودار مشارکت‌ها
          </h3>
          <div className="overflow-x-auto pb-2">
            <Image
              src={stats.contributionChartUrl + "?theme=" + (typeof window !== "undefined" && document.documentElement.classList.contains('dark') ? 'dark' : 'light')}
              // The theme parameter might not work for all chart services or might need dynamic update on theme toggle.
              // For ghchart.rshah.org, it seems to pick up system theme or you can pass a color like &color=768390 for a dark-theme-ish chart.
              // A simple solution is to use a neutral chart or two versions if the service allows.
              // Or, if the service provides an embed that adapts, use that.
              // For this example, we'll assume a light version or one that adapts.
              // Update: ghchart.rshah.org does support a color param. Example: &color=2ea44f for green dots.
              // A better approach for dynamic theme: use a client component to set the image src based on current theme.
              // For now, this is a simplified version.
              alt={`نمودار مشارکت گیت‌هاب برای ${stats.username}`}
              width={800} // Adjust width as needed
              height={180} // Adjust height as needed
              className="rounded-md w-full h-auto"
              unoptimized // External image, may not need Next.js optimization
              priority // Load this image sooner if it's important
            />
          </div>
           <p className="text-xs text-light-muted-foreground dark:text-dark-muted-foreground mt-2 text-center">
            نمودار فعالیت یک ساله اخیر (ممکن است نیاز به بروزرسانی دستی داشته باشد).
          </p>
        </motion.div>

        {/* Top Languages */}
        <motion.div
          className="bg-light-card dark:bg-dark-card p-4 md:p-6 rounded-lg shadow-lg"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: "easeOut" }}
          viewport={{ once: true, amount: 0.2 }}
        >
          <h3 className="text-xl font-semibold mb-4 text-light-card-foreground dark:text-dark-card-foreground">زبان‌های پراستفاده</h3>
          {primaryLanguages.length > 0 ? (
            <ul className="space-y-3">
              {primaryLanguages.map(([lang, count]) => (
                <li key={lang} className="flex justify-between items-center text-sm">
                  <span className="text-light-muted-foreground dark:text-dark-muted-foreground">{lang}</span>
                  <span className="font-semibold text-light-primary dark:text-dark-primary">{count} ریپازیتوری</span>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm text-light-muted-foreground dark:text-dark-muted-foreground">اطلاعات زبان‌ها در دسترس نیست.</p>
          )}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
