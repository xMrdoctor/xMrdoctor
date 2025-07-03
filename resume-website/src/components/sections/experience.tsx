import { SectionWrapper } from "@/components/section-wrapper";
import { experienceData } from "@/lib/utils";
import Image from "next/image"; // If using logos
import { Briefcase, CalendarDays } from "lucide-react";
import { motion } from "framer-motion";

const timelineItemVariants = {
  hidden: { opacity: 0, x: -50 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

export function Experience() {
  return (
    <SectionWrapper id="experience" title="تجربه کاری" subtitle="مروری بر سوابق شغلی و مسئولیت‌های من در شرکت‌های مختلف.">
      <div className="relative">
        {/* The timeline vertical line */}
        <div className="hidden md:block absolute top-0 bottom-0 left-1/2 w-0.5 bg-light-border dark:bg-dark-border transform -translate-x-1/2"></div>

        {experienceData.map((exp, index) => (
          <motion.div
            key={index}
            className="mb-12 md:mb-16 flex md:items-start"
            custom={index}
            variants={timelineItemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            {/* Timeline Dot and Logo (Desktop) */}
            <div className={`hidden md:flex flex-col items-center ${index % 2 === 0 ? 'md:order-1' : 'md:order-3'} md:w-1/2 md:pr-8 rtl:md:pl-8 rtl:md:pr-0 ${index % 2 !== 0 ? 'md:pl-8 rtl:md:pr-8 rtl:md:pl-0 md:text-left rtl:md:text-right' : 'md:text-right rtl:md:text-left'}`}>
              <div className="absolute left-1/2 top-1 transform -translate-x-1/2 -translate-y-1/2">
                <div className="w-6 h-6 rounded-full bg-light-primary dark:bg-dark-primary border-4 border-light-background dark:border-dark-background"></div>
              </div>
              {/* Optional: Company Logo
              {exp.logo && (
                <Image src={exp.logo} alt={`${exp.company} logo`} width={60} height={60} className="rounded-full mb-2 shadow-md" />
              )} */}
            </div>

            {/* Content Card */}
            <div className={`w-full md:w-1/2 bg-light-card dark:bg-dark-card p-6 rounded-lg shadow-xl ${index % 2 === 0 ? 'md:order-2 md:ml-auto rtl:md:mr-auto rtl:md:ml-0' : 'md:order-2 md:mr-auto rtl:md:ml-auto rtl:md:mr-0'}`}>
              {/* Mobile Logo & Dot */}
              <div className="md:hidden flex items-center mb-4">
                <div className="w-4 h-4 rounded-full bg-light-primary dark:bg-dark-primary mr-3 rtl:ml-3 rtl:mr-0 shrink-0"></div>
                {/* {exp.logo && <Image src={exp.logo} alt={`${exp.company} logo`} width={40} height={40} className="rounded-full mr-3 rtl:ml-3 rtl:mr-0 shadow-sm" />} */}
              </div>

              <h3 className="text-xl font-semibold text-light-card-foreground dark:text-dark-card-foreground mb-1">{exp.title}</h3>
              <p className="text-md font-medium text-light-primary dark:text-dark-primary mb-2">{exp.company}</p>
              <div className="flex items-center text-sm text-light-muted-foreground dark:text-dark-muted-foreground mb-3">
                <CalendarDays size={16} className="ml-1 rtl:mr-1 rtl:ml-0" />
                <span>{exp.date}</span>
              </div>
              <p className="text-sm text-light-muted-foreground dark:text-dark-muted-foreground leading-relaxed">
                {exp.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  );
}
