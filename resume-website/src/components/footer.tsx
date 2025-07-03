import { siteConfig } from "@/lib/utils";
import { Github, Linkedin, Send } from "lucide-react"; // Send for Telegram or Email

export function Footer() {
  return (
    <footer className="py-6 md:px-8 md:py-0 border-t border-light-border/40 dark:border-dark-border/40">
      <div className="container mx-auto flex flex-col items-center justify-between gap-4 px-4 py-10 md:h-24 md:flex-row md:py-0 sm:px-6 lg:px-8">
        <div className="text-center text-sm leading-loose text-light-muted-foreground md:text-left dark:text-dark-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} {siteConfig.name}. تمامی حقوق محفوظ است.
          </p>
          <p>
            ساخته شده با{" "}
            <a
              href="https://nextjs.org"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-light-primary dark:hover:text-dark-primary"
            >
              Next.js
            </a>{" "}
            و{" "}
            <a
              href="https://tailwindcss.com"
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4 hover:text-light-primary dark:hover:text-dark-primary"
            >
              Tailwind CSS
            </a>
            .
          </p>
        </div>
        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <a
            href={siteConfig.links.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-light-muted-foreground hover:text-light-primary dark:text-dark-muted-foreground dark:hover:text-dark-primary"
          >
            <Github className="h-6 w-6" />
          </a>
          {/* Add other social links here based on contactInfo */}
          {/* Example for LinkedIn:
          <a
            href={contactInfo.linkedin} // Make sure contactInfo is available here or pass as prop
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-light-muted-foreground hover:text-light-primary dark:text-dark-muted-foreground dark:hover:text-dark-primary"
          >
            <Linkedin className="h-6 w-6" />
          </a>
          */}
          {/* Example for Telegram:
           <a
            href={contactInfo.telegram} // Make sure contactInfo is available here or pass as prop
            target="_blank"
            rel="noreferrer"
            aria-label="Telegram"
            className="text-light-muted-foreground hover:text-light-primary dark:text-dark-muted-foreground dark:hover:text-dark-primary"
          >
            <Send className="h-6 w-6" />
          </a>
          */}
        </div>
      </div>
    </footer>
  );
}
