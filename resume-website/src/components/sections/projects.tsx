import { SectionWrapper } from "@/components/section-wrapper";
import { Project, siteConfig } from "@/lib/utils";
import { getGithubProjects } from "@/lib/github"; // Import the fetching function
import { Github, ExternalLink, Star, GitFork, CalendarDays, Code2, AlertTriangle } from "lucide-react";
import { format, parseISO } from 'date-fns-jalali';
import { motion } from "framer-motion";
import Link from "next/link";

const cardVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1, // Slightly faster delay for smoother appearance
      duration: 0.4,
      ease: "easeOut",
    },
  }),
};

// This component will now be a Server Component by default due to async/await
export async function ProjectsSection() {
  const projects = await getGithubProjects();

  if (!projects || projects.length === 0) {
    return (
      <SectionWrapper id="projects" title="پروژه‌های منتخب" subtitle="نگاهی به برخی از کارهایی که انجام داده‌ام.">
        <div className="flex flex-col items-center justify-center text-center bg-light-card dark:bg-dark-card p-8 rounded-lg shadow-md">
          <AlertTriangle size={48} className="text-yellow-500 mb-4" />
          <h3 className="text-xl font-semibold mb-2">خطا در بارگذاری پروژه‌ها</h3>
          <p className="text-light-muted-foreground dark:text-dark-muted-foreground mb-4">
            متاسفانه در حال حاضر امکان نمایش پروژه‌ها از گیت‌هاب وجود ندارد. لطفا بعدا دوباره تلاش کنید یا مستقیما از پروفایل گیت‌هاب بازدید نمایید.
          </p>
          <a
            href={siteConfig.links.github + "?tab=repositories"}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-light-primary-foreground bg-light-primary hover:bg-light-primary/90 dark:text-dark-primary-foreground dark:bg-dark-primary dark:hover:bg-dark-primary/90"
          >
            مشاهده در گیت‌هاب
            <Github size={20} className="mr-2 rtl:ml-2 rtl:mr-0" />
          </a>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <SectionWrapper id="projects" title="پروژه‌های منتخب" subtitle="نگاهی به برخی از آخرین کارهایی که در گیت‌هاب پوش کرده‌ام. برای مشاهده بیشتر، به پروفایل من مراجعه کنید.">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
        {projects.map((project, index) => (
          <motion.div
            key={project.id}
            className="bg-light-card dark:bg-dark-card rounded-xl shadow-lg overflow-hidden flex flex-col transition-all duration-300 hover:shadow-2xl hover:scale-[1.02]"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible" // Animate when the card comes into view
            viewport={{ once: true, amount: 0.1 }} // Trigger animation when 10% of the card is visible
          >
            <div className="p-6 flex-grow">
              <div className="flex justify-between items-start mb-3">
                <h3 className="text-xl font-bold text-light-card-foreground dark:text-dark-card-foreground hover:text-light-primary dark:hover:text-dark-primary transition-colors">
                  <Link href={project.html_url} target="_blank" rel="noopener noreferrer">
                    {project.name}
                  </Link>
                </h3>
                <div className="flex space-x-3 rtl:space-x-reverse">
                  <Link href={project.html_url} target="_blank" rel="noopener noreferrer" aria-label="GitHub repository" className="text-light-muted-foreground hover:text-light-primary dark:text-dark-muted-foreground dark:hover:text-dark-primary transition-colors">
                    <Github size={22} />
                  </Link>
                  {project.homepage && (
                    <Link href={project.homepage} target="_blank" rel="noopener noreferrer" aria-label="Live demo or homepage" className="text-light-muted-foreground hover:text-light-primary dark:text-dark-muted-foreground dark:hover:text-dark-primary transition-colors">
                      <ExternalLink size={22} />
                    </Link>
                  )}
                </div>
              </div>
              <p className="text-sm text-light-muted-foreground dark:text-dark-muted-foreground mb-4 min-h-[60px] line-clamp-3">
                {project.description || "بدون توضیحات."}
              </p>
              <div className="flex items-center text-xs text-light-muted-foreground dark:text-dark-muted-foreground mb-4">
                {project.language && (
                  <>
                    <Code2 size={14} className="ml-1 rtl:mr-1 rtl:ml-0 text-sky-500" />
                    <span className="font-medium">{project.language}</span>
                    <span className="mx-1.5 opacity-50">·</span>
                  </>
                )}
                <Star size={14} className="ml-1 rtl:mr-1 rtl:ml-0 text-yellow-500" />
                <span className="font-medium">{project.stargazers_count}</span>
                <span className="mx-1.5 opacity-50">·</span>
                <GitFork size={14} className="ml-1 rtl:mr-1 rtl:ml-0 text-green-500" />
                <span className="font-medium">{project.forks_count}</span>
              </div>
              <div className="text-xs text-light-muted-foreground dark:text-dark-muted-foreground flex items-center">
                <CalendarDays size={14} className="ml-1 rtl:mr-1 rtl:ml-0 opacity-70" />
                آخرین بروزرسانی: {format(parseISO(project.pushed_at), 'yyyy/MM/dd')}
              </div>
            </div>
            {project.topics && project.topics.length > 0 && (
              <div className="px-6 pt-3 pb-4 border-t border-light-border/70 dark:border-dark-border/70">
                <div className="flex flex-wrap gap-2">
                  {project.topics.slice(0, 4).map(topic => ( // Show max 4 topics
                    <span key={topic} className="px-2.5 py-1 text-xs bg-light-accent/10 text-light-primary dark:bg-dark-accent/10 dark:text-dark-primary rounded-full font-medium">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </motion.div>
        ))}
      </div>
      <div className="text-center mt-12">
        <Link
          href={siteConfig.links.github + "?tab=repositories"}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-semibold rounded-lg text-light-primary-foreground bg-light-primary hover:bg-light-primary/90 dark:text-dark-primary-foreground dark:bg-dark-primary dark:hover:bg-dark-primary/90 transition-colors shadow-md hover:shadow-lg"
        >
          همه پروژه‌ها در گیت‌هاب
          <Github size={20} className="mr-2.5 rtl:ml-2.5 rtl:mr-0" />
        </Link>
      </div>
    </SectionWrapper>
  );
}
