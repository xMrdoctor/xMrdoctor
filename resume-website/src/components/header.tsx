"use client";
import Link from "next/link";
import { ThemeToggle } from "./theme-toggle";
import { siteConfig } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-light-border/40 bg-light-background/95 backdrop-blur supports-[backdrop-filter]:bg-light-background/60 dark:border-dark-border/40 dark:bg-dark-background/95 dark:supports-[backdrop-filter]:bg-dark-background/60">
      <div className="container mx-auto flex h-16 max-w-screen-2xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center space-x-2 rtl:space-x-reverse">
          {/* <MountainIcon className="h-6 w-6" /> */}
          <span className="font-bold text-lg">{siteConfig.name}</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6 rtl:space-x-reverse text-sm font-medium">
          {siteConfig.navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-light-primary dark:hover:text-dark-primary"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center space-x-2 rtl:space-x-reverse">
          <ThemeToggle />
          <button
            className="md:hidden rounded-md p-2 text-light-foreground dark:text-dark-foreground hover:bg-light-accent dark:hover:bg-dark-accent"
            onClick={toggleMobileMenu}
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>
      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-light-background dark:bg-dark-background shadow-lg p-4 z-40">
          <nav className="flex flex-col space-y-4">
            {siteConfig.navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="transition-colors hover:text-light-primary dark:hover:text-dark-primary py-2 text-center"
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}

// Placeholder for MountainIcon if you want a logo, or remove it.
// function MountainIcon(props: React.SVGProps<SVGSVGElement>) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <path d="m8 3 4 8 5-5 5 15H2L8 3z" />
//     </svg>
//   );
// }
