import { SectionWrapper } from "@/components/section-wrapper";
import { contactInfo, siteConfig } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Send, Mail, Phone, MapPin } from "lucide-react"; // Added more icons
import { motion } from "framer-motion";

const contactItemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.5,
      ease: "easeOut",
    },
  }),
};

export function Contact() {
  // You can add more contact details if needed
  const contactDetails = [
    {
      icon: Mail,
      label: "ایمیل",
      value: contactInfo.email,
      href: `mailto:${contactInfo.email}`,
    },
    {
      icon: Linkedin,
      label: "لینکدین",
      value: "پروفایل لینکدین", // Or display username
      href: contactInfo.linkedin,
    },
    {
      icon: Send, // Using Send for Telegram, consider a specific Telegram icon if available
      label: "تلگرام",
      value: "ارتباط در تلگرام", // Or display username
      href: contactInfo.telegram,
    },
    {
      icon: Github,
      label: "گیت‌هاب",
      value: "پروفایل گیت‌هاب",
      href: siteConfig.links.github,
    },
    // Example for phone (if you want to add it)
    // {
    //   icon: Phone,
    //   label: "تلفن",
    //   value: "+98 912 345 6789", // Replace with actual phone
    //   href: "tel:+989123456789",
    // },
    // Example for location (if you want to add it)
    // {
    //   icon: MapPin,
    //   label: "موقعیت",
    //   value: "تهران، ایران", // Replace with actual location
    //   href: "#", // Could link to a map
    // },
  ];

  return (
    <SectionWrapper id="contact" title="تماس با من" subtitle="برای همکاری، مشاوره یا هرگونه سوال، از طریق راه‌های زیر با من در ارتباط باشید.">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 items-start">
        {/* Contact Info Blocks */}
        <div className="space-y-6">
          {contactDetails.map((item, index) => (
            <motion.a
              key={item.label}
              href={item.href}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start p-4 bg-light-card dark:bg-dark-card rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              custom={index}
              variants={contactItemVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.5 }}
            >
              <item.icon size={28} className="mr-4 rtl:ml-4 rtl:mr-0 text-light-primary dark:text-dark-primary flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-lg font-semibold text-light-card-foreground dark:text-dark-card-foreground">{item.label}</h3>
                <p className="text-sm text-light-muted-foreground dark:text-dark-muted-foreground break-all">{item.value}</p>
              </div>
            </motion.a>
          ))}
        </div>

        {/* Contact Form Placeholder (or simple message) */}
        <motion.div
          className="bg-light-card dark:bg-dark-card p-6 md:p-8 rounded-lg shadow-xl"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          <h3 className="text-2xl font-semibold mb-6 text-light-card-foreground dark:text-dark-card-foreground text-center md:text-right rtl:md:text-left">ارسال پیام مستقیم</h3>
          <p className="text-light-muted-foreground dark:text-dark-muted-foreground mb-6 text-center md:text-right rtl:md:text-left">
            در حال حاضر، برای ارسال پیام مستقیم می‌توانید از طریق ایمیل یا شبکه‌های اجتماعی اقدام کنید. قابلیت فرم تماس در آینده اضافه خواهد شد.
          </p>
          <div className="flex justify-center md:justify-end rtl:md:justify-start">
            <Button asChild size="lg" className="min-w-[150px]">
              <a href={`mailto:${contactInfo.email}`}>
                ارسال ایمیل
                <Mail size={20} className="mr-2 rtl:ml-2 rtl:mr-0" />
              </a>
            </Button>
          </div>
          {/*
          // Basic Contact Form Structure (if you want to implement it later)
          <form action="#" method="POST" className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-light-foreground dark:text-dark-foreground">نام کامل</label>
              <input type="text" name="name" id="name" autoComplete="name" className="mt-1 block w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-light-primary dark:focus:ring-dark-primary focus:border-light-primary dark:focus:border-dark-primary sm:text-sm bg-light-input dark:bg-dark-input text-light-foreground dark:text-dark-foreground" />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-light-foreground dark:text-dark-foreground">ایمیل</label>
              <input type="email" name="email" id="email" autoComplete="email" className="mt-1 block w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-light-primary dark:focus:ring-dark-primary focus:border-light-primary dark:focus:border-dark-primary sm:text-sm bg-light-input dark:bg-dark-input text-light-foreground dark:text-dark-foreground" />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-light-foreground dark:text-dark-foreground">پیام شما</label>
              <textarea id="message" name="message" rows={4} className="mt-1 block w-full px-3 py-2 border border-light-border dark:border-dark-border rounded-md shadow-sm focus:outline-none focus:ring-light-primary dark:focus:ring-dark-primary focus:border-light-primary dark:focus:border-dark-primary sm:text-sm bg-light-input dark:bg-dark-input text-light-foreground dark:text-dark-foreground"></textarea>
            </div>
            <div>
              <Button type="submit" className="w-full">
                ارسال پیام
                <Send size={18} className="mr-2 rtl:ml-2 rtl:mr-0" />
              </Button>
            </div>
          </form>
          */}
        </motion.div>
      </div>
    </SectionWrapper>
  );
}
