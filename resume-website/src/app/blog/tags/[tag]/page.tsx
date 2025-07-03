import Link from 'next/link';
import { getSortedPostsData } from '@/lib/blog';
import { SectionWrapper } from '@/components/section-wrapper';
import { format, parseISO } from 'date-fns-jalali';
import Image from 'next/image';
import { CalendarDays, User, Tag as TagIcon, ArrowRight } from 'lucide-react'; // Renamed Tag to TagIcon to avoid conflict
import { Metadata } from 'next';
import { siteConfig } from '@/lib/utils';

type Props = {
  params: { tag: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const decodedTag = decodeURIComponent(params.tag);
  return {
    title: `پست‌های با تگ "${decodedTag}" | وبلاگ Mr Doctor`,
    description: `مرور پست‌های وبلاگ مرتبط با ${decodedTag} از Mr Doctor.`,
  };
}

export async function generateStaticParams() {
  const posts = getSortedPostsData();
  const tags = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).map(tag => ({
    tag: encodeURIComponent(tag),
  }));
}

export default function TagPage({ params }: Props) {
  const decodedTag = decodeURIComponent(params.tag);
  const allPosts = getSortedPostsData();
  const filteredPosts = allPosts.filter(post => post.tags?.includes(decodedTag));

  return (
    <SectionWrapper title={`پست‌ها با تگ: #${decodedTag}`} subtitle={`مروری بر تمام مقالات و نوشته‌های مرتبط با "${decodedTag}".`}>
      <div className="mb-8">
        <Link href="/blog" className="text-sm text-light-primary dark:text-dark-primary hover:underline flex items-center">
          <ArrowRight size={16} className="ml-1 rtl:mr-1 rtl:ml-0 transform rotate-180 rtl:rotate-0" />
          بازگشت به همه پست‌ها
        </Link>
      </div>
      {filteredPosts.length === 0 ? (
        <p className="text-center text-lg text-light-muted-foreground dark:text-dark-muted-foreground">
          هیچ پستی با این تگ یافت نشد.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredPosts.map(({ slug, title, date, excerpt, image, author, tags }) => (
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
                      {tags.slice(0,3).map(tagItem => ( // Renamed 'tag' to 'tagItem' to avoid conflict
                        <span key={tagItem} className={`px-2 py-0.5 text-xs rounded-full font-medium flex items-center ${tagItem === decodedTag ? 'bg-light-primary/20 text-light-primary dark:bg-dark-primary/20 dark:text-dark-primary' : 'bg-light-accent/10 text-light-muted-foreground dark:bg-dark-accent/10 dark:text-dark-muted-foreground'}`}>
                           <TagIcon size={12} className="ml-1 rtl:mr-1 rtl:ml-0" /> {tagItem}
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
