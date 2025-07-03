import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Add other utility functions here as needed
export const siteConfig = {
  name: "Mr Doctor",
  description: "وب‌سایت رزومه حرفه‌ای Mr Doctor، برنامه‌نویس Python، SQL، Git، امنیت و طراحی وب.",
  url: "https://example.com", // Replace with actual URL
  ogImage: "https://example.com/og.jpg", // Replace with actual OG image URL
  links: {
    github: "https://github.com/xMrDoctor",
  },
  navLinks: [
    { href: "#about", label: "درباره من" },
    { href: "#skills", label: "مهارت‌ها" },
    { href: "#projects", label: "پروژه‌ها" },
    { href: "#experience", label: "تجربه کاری" },
    { href: "#contact", label: "تماس" },
    { href: "/blog", label: "وبلاگ" },
  ],
};

export interface Project {
  id: string;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language: string | null;
  updated_at: string;
  created_at: string;
  pushed_at: string;
  homepage: string | null;
  topics: string[];
}

export interface GitHubRepo {
  id: number;
  name: string;
  full_name: string;
  html_url: string;
  description: string | null;
  url: string;
  languages_url: string;
  created_at: string;
  updated_at: string;
  pushed_at: string;
  git_url: string;
  ssh_url: string;
  clone_url: string;
  svn_url: string;
  homepage: string | null;
  stargazers_count: number;
  watchers_count: number;
  language: string | null;
  forks_count: number;
  open_issues_count: number;
  topics: string[];
  visibility: string;
  default_branch: string;
  owner: {
    login: string;
    avatar_url: string;
  };
}

export interface BlogPost {
  slug: string;
  title: string;
  date: string;
  excerpt: string;
  content: string;
  image?: string;
}

export const skillsData = [
  { name: "Python", level: 95, icon: "🐍" },
  { name: "SQL (SQLite, PostgreSQL, MySQL)", level: 90, icon: "📊" },
  { name: "Git & GitHub", level: 90, icon: "🌿" },
  { name: "CyberSecurity", level: 85, icon: "🔒" },
  { name: "Web Design (HTML, CSS, JS)", level: 80, icon: "🌐" },
  { name: "Tailwind CSS", level: 85, icon: "🌬️" },
  { name: "Bash Scripting", level: 75, icon: "💻" },
  { name: "Linux Administration", level: 70, icon: "🐧" },
  { name: "Telebot (Python Telegram Bot API)", level: 80, icon: "🤖" },
  { name: "C#", level: 60, icon: "sharp" }, // Placeholder, consider a better icon or image
  { name: "SQL Optimization", level: 88, icon: "💡" },
  { name: "Next.js", level: 70, icon: "🚀" }, // Added based on current project
  { name: "TypeScript", level: 65, icon: "🔷" }, // Added based on current project
];

export const experienceData = [
  {
    title: "Senior Python Developer",
    company: "Tech Solutions Inc.",
    date: "ژانویه ۲۰۲۱ - حال",
    description: "توسعه و نگهداری اپلیکیشن‌های وب مبتنی بر پایتون، طراحی و پیاده‌سازی APIها، بهینه‌سازی پایگاه داده و همکاری با تیم‌های دیگر برای ارائه راهکارهای نوآورانه.",
    logo: "/path/to/company-logo1.png", // Replace with actual logo path
  },
  {
    title: "Full-Stack Developer",
    company: "Creative Web Agency",
    date: "جولای ۲۰۱۸ - دسامبر ۲۰۲۰",
    description: "طراحی و توسعه وب‌سایت‌های واکنش‌گرا با استفاده از HTML، CSS، JavaScript و فریم‌ورک‌های مختلف. مدیریت پایگاه داده و اطمینان از امنیت و عملکرد بهینه وب‌سایت‌ها.",
    logo: "/path/to/company-logo2.png", // Replace with actual logo path
  },
];

export const contactInfo = {
  email: "your.email@example.com", // Replace with actual email
  linkedin: "https://linkedin.com/in/yourprofile", // Replace with actual LinkedIn profile
  telegram: "https://t.me/yourusername", // Replace with actual Telegram username
};
