"use client"; // Required for onClick handlers and dynamic imports

import Image from "next/image";
import { SectionWrapper } from "@/components/section-wrapper";
import { siteConfig, contactInfo, skillsData, experienceData } from "@/lib/utils"; // Assuming contactInfo might be used for a CTA
import { Download, Github, Linkedin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import React from "react"; // Import React for potential ref usage if needed

// Dynamically import pdfmake and html-to-pdfmake for client-side usage
const importPdfMake = async () => {
  const pdfMake = (await import('pdfmake/build/pdfmake')).default;
  const pdfFonts = (await import('pdfmake/build/vfs_fonts')).default;
  pdfMake.vfs = pdfFonts.pdfMake.vfs;

  // Configure Vazir font for pdfmake (crucial for Farsi text)
  // You need to have Vazir font files (e.g., Vazirmatn-Regular.ttf) available in your vfs_fonts or load them.
  // For simplicity, assuming vfs_fonts includes a compatible font or English fallback.
  // For proper Farsi, you'd typically do:
  // pdfMake.fonts = {
  //   Vazir: {
  //     normal: 'Vazirmatn-Regular.ttf',
  //     bold: 'Vazirmatn-Bold.ttf',
  //     italics: 'Vazirmatn-Regular.ttf', // Or an italics version if available
  //     bolditalics: 'Vazirmatn-Bold.ttf',
  //   },
  //   Roboto: { // Default fallback
  //     normal: 'Roboto-Regular.ttf',
  //     bold: 'Roboto-Medium.ttf',
  //     italics: 'Roboto-Italic.ttf',
  //     bolditalics: 'Roboto-MediumItalic.ttf'
  //   }
  // };
  // For now, we'll rely on default fonts or what's in vfs_fonts.
  // This part needs careful setup for correct Farsi rendering in PDF.
  // A simple setup for Farsi might involve setting a default font that supports it:
   pdfMake.fonts = {
    Vazirmatn: { // Using Vazirmatn as defined in globals.css font-face
      normal: 'Vazirmatn-Regular.woff2', // This assumes you have the TTF version for pdfmake or pdfmake can handle woff2 (often not)
                                        // It's better to convert woff2 to TTF and include in vfs_fonts or load directly.
                                        // For this example, this line is illustrative.
                                        // You'd typically point to a TTF file within your project or vfs.
      bold: 'Vazirmatn-Bold.woff2',
      // italics: 'Vazirmatn-Light.woff2', // if you have light for italics
      // bolditalics: 'Vazirmatn-Bold.woff2'
    },
    Roboto: { // Fallback
      normal: 'Roboto-Regular.ttf',
      bold: 'Roboto-Medium.ttf',
      italics: 'Roboto-Italic.ttf',
      bolditalics: 'Roboto-MediumItalic.ttf'
    }
  };


  const htmlToPdfmake = (await import('html-to-pdfmake')).default;
  return { pdfMake, htmlToPdfmake };
};


export function AboutMe() {
  const user = {
    name: "Mr Doctor",
    avatarUrl: `https://avatars.githubusercontent.com/${siteConfig.links.github.split('/').pop()}`,
    bio: "برنامه‌نویس فول استک با تمرکز بر Python، SQL و امنیت وب. علاقه‌مند به حل چالش‌های پیچیده و ساخت راه‌حل‌های کارآمد و مقیاس‌پذیر. همواره در حال یادگیری و کشف تکنولوژی‌های جدید برای بهبود مهارت‌ها و ارائه بهترین نتیجه.",
    detailedIntroHtml: `
      <h2>درباره من</h2>
      <p>سلام! من <strong>${siteConfig.name}</strong> هستم، یک توسعه‌دهنده نرم‌افزار با تجربه که اشتیاق زیادی به ساخت برنامه‌های کاربردی، ایمن و با کارایی بالا دارم. تخصص اصلی من در اکوسیستم پایتون، مدیریت و بهینه‌سازی پایگاه‌های داده SQL و همچنین پیاده‌سازی اصول امنیتی در وب است.</p>
      <p>در طول مسیر حرفه‌ای خود، روی پروژه‌های متنوعی کار کرده‌ام که از توسعه API های RESTful گرفته تا ساخت ربات‌های تلگرامی و ابزارهای تحلیل داده را شامل می‌شود. من به کدنویسی تمیز، معماری ماژولار و تست‌نویسی اهمیت زیادی می‌دهم.</p>
      <p>هدف من استفاده از تکنولوژی برای ایجاد تاثیر مثبت و ارائه ارزش به کاربران است. اگر به دنبال یک همکار خلاق، دقیق و نتیجه‌گرا برای پروژه بعدی خود هستید، خوشحال می‌شوم با شما صحبت کنم.</p>
      <br/>
      <h3>زبان‌ها:</h3>
      <p>فارسی (زبان مادری)، انگلیسی (حرفه‌ای)</p>
    `,
    languages: "فارسی (زبان مادری)، انگلیسی (حرفه‌ای)", // Kept for display if needed outside PDF
  };

  const handleDownloadPdf = async () => {
    try {
      const { pdfMake, htmlToPdfmake } = await importPdfMake();

      // 1. Construct the HTML content for the PDF
      // This should be a simpler, more PDF-friendly version of your resume.
      // For Farsi text, ensure elements are styled with `font-family: Vazirmatn` or similar.
      // And text direction `direction: rtl`. html-to-pdfmake might need help with RTL.

      let resumeHtml = `
        <div style="font-family: Vazirmatn, Roboto, sans-serif; direction: rtl; text-align: right;">
          <h1 style="text-align: center; color: #6200ee;">${user.name}</h1>
          <p style="text-align: center; font-size: 10px;">${contactInfo.email} | ${siteConfig.links.github}</p>
          <hr/>
          ${user.detailedIntroHtml}

          <h2>مهارت‌ها</h2>
          <ul>${skillsData.map(skill => `<li><strong>${skill.name}</strong>: ${skill.level}%</li>`).join('')}</ul>

          <h2>تجربه کاری</h2>
          ${experienceData.map(exp => `
            <div>
              <h3>${exp.title} در ${exp.company}</h3>
              <p><small>${exp.date}</small></p>
              <p>${exp.description}</p>
            </div>
          `).join('<br/>')}

          <h2>پروژه‌های منتخب (نمونه)</h2>
          <p>برای لیست کامل پروژه‌ها به پروفایل گیت‌هاب مراجعه شود.</p>
          <ul>
            <li>نام پروژه ۱: توضیحات مختصر</li>
            <li>نام پروژه ۲: توضیحات مختصر</li>
          </ul>
          <br/>
          <p style="font-size: 9px; text-align: center;">رزومه تولید شده در تاریخ: ${new Date().toLocaleDateString('fa-IR')}</p>
        </div>
      `;

      // Replace Vazirmatn-Regular.woff2 in vfs_fonts.js with an actual base64 encoded TTF if issues persist.
      // This is a common pain point with pdfmake and custom fonts.
      // The Vazirmatn.ttf (or similar) should be converted to base64 and added to vfs_fonts.js,
      // or loaded dynamically if pdfmake supports it in your setup.
      // For now, we assume pdfMake.fonts setup handles it.

      const pdfContent = htmlToPdfmake(resumeHtml, {
         defaultStyles: { // Optional: define default styles for elements
           p: { margin: [0, 5, 0, 10], alignment: 'right' }, // top, left, bottom, right
           h1: { fontSize: 22, bold: true, alignment: 'center', margin: [0,0,0,10] },
           h2: { fontSize: 18, bold: true, alignment: 'right', margin: [0,5,0,5] },
           h3: { fontSize: 14, bold: true, alignment: 'right', margin: [0,5,0,3] },
           ul: { margin: [0, 0, 0, 10] },
           li: { alignment: 'right', margin: [0,0,0,2] }, // Ensure list items are also RTL
         },
         customTagProcessors: {
            // Example: handle a custom <my-custom-tag> if needed
         }
      });

      const docDefinition = {
        content: pdfContent,
        defaultStyle: {
          font: "Vazirmatn", // Ensure this matches a font defined in pdfMake.fonts
          alignment: "right", // Global RTL alignment
        },
        // You can add page numbers, headers, footers etc. here
        // styles: { ... } // Additional styles
      };

      // pdfMake.createPdf(docDefinition).download(`رزومه-${user.name.replace(/\s+/g, '_')}.pdf`);
      // Open in new tab for better UX on some browsers / mobile
       pdfMake.createPdf(docDefinition).open({}, window.open('', '_blank'));


    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("متاسفانه در تولید فایل PDF خطایی رخ داد. لطفا از قابلیت پرینت مرورگر استفاده کنید.");
      // Fallback to window.print() or other method
      // window.print();
    }
  };


  return (
    <SectionWrapper id="about" title="درباره من">
      <div className="grid grid-cols-1 gap-8 md:grid-cols-3 md:gap-12 items-start"> {/* Changed items-center to items-start */}
        <div className="md:col-span-1 flex flex-col items-center text-center">
          <Image
            src={user.avatarUrl}
            alt={user.name}
            width={200}
            height={200}
            className="rounded-full shadow-lg mb-6"
            priority
          />
          <h3 className="text-2xl font-semibold mb-2">{user.name}</h3>
          <p className="text-light-muted-foreground dark:text-dark-muted-foreground mb-4">{user.bio}</p>
          <div className="flex space-x-3 rtl:space-x-reverse justify-center mb-4">
            <a href={siteConfig.links.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub" className="text-light-muted-foreground hover:text-light-primary dark:text-dark-muted-foreground dark:hover:text-dark-primary">
              <Github size={24} />
            </a>
            <a href={contactInfo.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" className="text-light-muted-foreground hover:text-light-primary dark:text-dark-muted-foreground dark:hover:text-dark-primary">
              <Linkedin size={24} />
            </a>
            <a href={`mailto:${contactInfo.email}`} aria-label="Email" className="text-light-muted-foreground hover:text-light-primary dark:text-dark-muted-foreground dark:hover:text-dark-primary">
              <Send size={24} /> {/* Using Send for email as well, or choose another icon */}
            </a>
          </div>
          <Button variant="outline" className="w-full md:w-auto" onClick={handleDownloadPdf}>
            <Download size={18} className="ml-2 rtl:mr-2 rtl:ml-0" />
            دانلود رزومه (PDF)
          </Button>
        </div>
        <div className="md:col-span-2" id="resume-content-for-pdf"> {/* This ID is less relevant now as HTML is constructed manually */}
          <div
            className="prose prose-lg dark:prose-invert max-w-none text-light-foreground dark:text-dark-foreground space-y-4"
            dangerouslySetInnerHTML={{ __html: user.detailedIntroHtml.replace(/<h2>درباره من<\/h2>/, '') }} // Remove h2 if SectionWrapper provides title
          />
          {/* Languages are now part of detailedIntroHtml for PDF, but can be shown separately on web */}
           <div className="mt-6 md:hidden"> {/* Hidden on medium and up as it's in the text */}
            <h4 className="text-lg font-semibold mb-2">زبان‌ها:</h4>
            <p className="text-light-muted-foreground dark:text-dark-muted-foreground">{user.languages}</p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  );
}
