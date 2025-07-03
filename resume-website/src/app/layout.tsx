import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider"; // Will be created later

export const metadata: Metadata = {
  title: "Mr Doctor - Portfolio",
  description: "وب‌سایت رزومه حرفه‌ای Mr Doctor، برنامه‌نویس Python، SQL، Git، امنیت و طراحی وب.",
  // Add more metadata tags here as needed for SEO
  keywords: "Mr Doctor, Python, SQL, Git, Security, Web Design, Portfolio, Resume, برنامه‌نویس, رزومه",
  authors: [{ name: "Mr Doctor", url: "https://github.com/xMrDoctor" }],
  // Open Graph and Twitter card metadata can be added here
};

import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { ScrollToTopButton } from "@/components/scroll-to-top-button"; // Import the new component

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" suppressHydrationWarning>
      <head>
        {/* Add Vazir font links or other critical head elements if not handled by @font-face in CSS */}
      </head>
      <body className="min-h-screen bg-light-background font-vazir text-light-foreground antialiased dark:bg-dark-background dark:text-dark-foreground">
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="relative flex min-h-dvh flex-col bg-background">
            <Header />
            <main className="flex-1 py-8 md:py-12">{children}</main>
            <Footer />
            <ScrollToTopButton /> {/* Add the button here */}
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
