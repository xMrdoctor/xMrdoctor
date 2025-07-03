import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';
import { SectionWrapper } from '@/components/section-wrapper';
import { format, parseISO } from 'date-fns-jalali';
import Image from 'next/image';
import { CalendarDays, User, Tag } from 'lucide-react';
import { Metadata } from 'next';

export const metadata: Metadata = {
  title: "وبلاگ | Mr Doctor",
  description: "آخرین نوشته‌ها و مقالات از Mr Doctor در زمینه برنامه‌نویسی، توسعه وب، امنیت و تکنولوژی.",
};

export default function BlogListPage() {
  const posts = getSortedPostsData();

  return (
    <SectionWrapper title="وبلاگ" subtitle="آخرین نوشته‌ها و مقالات من در دنیای تکنولوژی.">
      {posts.length === 0 ? (
        <p className="text-center text-lg text-light-muted-foreground dark:text-dark-muted-foreground">
          در حال حاضر هیچ پستی در وبلاگ منتشر نشده است. به زودی با مطالب جدید باز خواهم گشت!
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map(({ slug, title, date, excerpt, image, author, tags }) => (
            <Link key={slug} href={`/blog/${slug}`} legacyBehavior>
              <a className="block bg-light-card dark:bg-dark-card rounded-lg shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.03]">
                {image && (
                  <div className="relative w-full h-48">
                    <Image
                      src={image}
                      alt={`تصویر بنر برای ${title}`}
                      layout="fill"
                      objectFit="cover"
                      className="transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                )}
                <div className="p-6">
                  <h2 className="text-xl font-semibold mb-2 text-light-card-foreground dark:text-dark-card-foreground group-hover:text-light-primary dark:group-hover:text-dark-primary transition-colors">
                    {title}
                  </h2>
                  <div className="flex items-center text-xs text-light-muted-foreground dark:text-dark-muted-foreground mb-3 space-x-3 rtl:space-x-reverse">
                    <div className="flex items-center">
                      <CalendarDays size={14} className="ml-1 rtl:mr-1 rtl:ml-0" />
                      <span>{format(parseISO(date), 'PPP', { locale: require('date-fns-jalali/locale/fa') })}</span>
                    </div>
                    {author && (
                      <div className="flex items-center">
                        <User size={14} className="ml-1 rtl:mr-1 rtl:ml-0" />
                        <span>{author}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-light-muted-foreground dark:text-dark-muted-foreground mb-4 line-clamp-3">
                    {excerpt}
                  </p>
                  {tags && tags.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {tags.slice(0, 3).map(tag => (
                        <span key={tag} className="px-2 py-0.5 text-xs bg-light-accent/10 text-light-primary dark:bg-dark-accent/10 dark:text-dark-primary rounded-full font-medium flex items-center">
                           <Tag size={12} className="ml-1 rtl:mr-1 rtl:ml-0" /> {tag}
                        </span>
                      ))}
                    </div>
                  )}
                  <span className="text-sm font-medium text-light-primary dark:text-dark-primary hover:underline">
                    ادامه مطلب &rarr;
                  </span>
                </div>
              </a>
            </Link>
          ))}
        </div>
      )}
    </SectionWrapper>
  );
}
