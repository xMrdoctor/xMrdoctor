import { SectionWrapper } from "@/components/section-wrapper";
import { skillsData } from "@/lib/utils";
import { motion } from "framer-motion"; // For animations

// A simple mapping for icons if not directly provided or if we want to use Lucide icons
// For now, using the icons provided in skillsData
// import { Python, Database, GitMerge, ShieldCheck, Code, Wind, Terminal, ToyBrick, Bot, Braces } from 'lucide-react';

// const iconMap: { [key: string]: React.ElementType } = {
//   Python: Python,
//   SQL: Database,
//   Git: GitMerge,
//   CyberSecurity: ShieldCheck,
//   "Web Design": Code,
//   TailwindCSS: Wind,
//   Bash: Terminal,
//   Linux: ToyBrick, // Placeholder, Lucide doesn't have a direct Linux icon
//   Telebot: Bot,
//   "C#": Braces, // Placeholder
//   "SQL Optimization": Database, // Could be more specific
//   "Next.js": Code, // Placeholder
//   TypeScript: Code, // Placeholder
// };

const cardVariants = {
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

export function Skills() {
  return (
    <SectionWrapper id="skills" title="مهارت‌های من" subtitle="مجموعه‌ای از تکنولوژی‌ها و ابزارهایی که در آن‌ها تخصص دارم.">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {skillsData.map((skill, index) => (
          <motion.div
            key={skill.name}
            className="bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-lg flex flex-col items-center text-center transition-all duration-300 hover:shadow-xl hover:scale-105"
            custom={index}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {/* {iconMap[skill.name] ? React.createElement(iconMap[skill.name], { size: 40, className:"mb-3 text-light-primary dark:text-dark-primary"}) : <span className="text-3xl mb-3">{skill.icon}</span>} */}
            <span className="text-4xl mb-4 text-light-primary dark:text-dark-primary">{skill.icon}</span>
            <h3 className="text-lg font-semibold mb-1 text-light-card-foreground dark:text-dark-card-foreground">{skill.name}</h3>
            {skill.level && (
              <div className="w-full bg-light-muted dark:bg-dark-muted rounded-full h-2.5 mb-2">
                <div
                  className="bg-light-primary dark:bg-dark-primary h-2.5 rounded-full"
                  style={{ width: `${skill.level}%` }}
                  aria-valuenow={skill.level}
                  aria-valuemin={0}
                  aria-valuemax={100}
                  role="progressbar"
                  aria-label={`${skill.name} proficiency`}
                ></div>
              </div>
            )}
            {/* <p className="text-xs text-light-muted-foreground dark:text-dark-muted-foreground">{skill.level}% تسلط</p> */}
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
