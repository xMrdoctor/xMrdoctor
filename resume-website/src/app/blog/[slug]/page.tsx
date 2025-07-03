import { getPostData, getAllPostSlugs, getSortedPostsData } from '@/lib/blog';
import { notFound } from 'next/navigation';
import { format, parseISO } from 'date-fns-jalali';
import Image from 'next/image';
import Link from 'next/link';
import { SectionWrapper } from '@/components/section-wrapper';
import { ArrowRight, CalendarDays, User, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { Metadata, ResolvingMetadata } from 'next';
import { siteConfig } from '@/lib/utils';

type Props = {
  params: { slug: string };
};

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  try {
    const post = await getPostData(params.slug);
    const previousImages = (await parent).openGraph?.images || [];

    return {
      title: `${post.title} | وبلاگ Mr Doctor`,
      description: post.excerpt,
      authors: [{ name: post.author || siteConfig.name, url: siteConfig.url }],
      keywords: post.tags?.join(', '),
      openGraph: {
        title: post.title,
        description: post.excerpt,
        type: 'article',
        publishedTime: post.date,
        authors: [siteConfig.url],
        url: `${siteConfig.url}/blog/${params.slug}`,
        images: post.image ? [{ url: `${siteConfig.url}${post.image}`, alt: post.title }, ...previousImages] : previousImages,
        tags: post.tags,
      },
      twitter: {
        card: 'summary_large_image',
        title: post.title,
        description: post.excerpt,
        images: post.image ? [`${siteConfig.url}${post.image}`] : undefined,
      },
    };
  } catch (error) {
    // Post not found
    return {
      title: "پست یافت نشد",
      description: "متاسفانه این پست وجود ندارد.",
    };
  }
}

export async function generateStaticParams() {
  const paths = getAllPostSlugs();
  return paths;
}

export default async function BlogPostPage({ params }: Props) {
  let post;
  try {
    post = await getPostData(params.slug);
  } catch (error) {
    notFound(); // This will render the not-found.tsx file if it exists, or a default Next.js 404 page.
  }

  const allPosts = getSortedPostsData();
  const currentPostIndex = allPosts.findIndex(p => p.slug === params.slug);
  const prevPost = currentPostIndex > 0 ? allPosts[currentPostIndex - 1] : null;
  const nextPost = currentPostIndex < allPosts.length - 1 ? allPosts[currentPostIndex + 1] : null;

  return (
    <SectionWrapper className="py-8 md:py-12">
      <article className="max-w-3xl mx-auto">
        {/* Back to blog link */}
        <div className="mb-6">
          <Link href="/blog" className="text-sm text-light-primary dark:text-dark-primary hover:underline flex items-center">
            <ArrowRight size={16} className="ml-1 rtl:mr-1 rtl:ml-0 transform rotate-180 rtl:rotate-0" />
            بازگشت به لیست وبلاگ
          </Link>
        </div>

        {/* Post Header */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 text-light-foreground dark:text-dark-foreground leading-tight">
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center text-sm text-light-muted-foreground dark:text-dark-muted-foreground space-x-4 rtl:space-x-reverse">
            <div className="flex items-center mb-2 md:mb-0">
              <CalendarDays size={16} className="ml-1.5 rtl:mr-1.5 rtl:ml-0" />
              <span>منتشر شده در {format(parseISO(post.date), 'PPP', { locale: require('date-fns-jalali/locale/fa') })}</span>
            </div>
            {post.author && (
              <div className="flex items-center mb-2 md:mb-0">
                <User size={16} className="ml-1.5 rtl:mr-1.5 rtl:ml-0" />
                <span>توسط {post.author}</span>
              </div>
            )}
          </div>
          {post.tags && post.tags.length > 0 && (
            <div className="mt-4 flex flex-wrap gap-2">
              {post.tags.map(tag => (
                <Link key={tag} href={`/blog/tags/${tag}`} legacyBehavior>
                  <a className="px-2.5 py-1 text-xs bg-light-accent/10 text-light-primary dark:bg-dark-accent/10 dark:text-dark-primary rounded-full font-medium hover:opacity-80 transition-opacity flex items-center">
                    <Tag size={12} className="ml-1 rtl:mr-1 rtl:ml-0" /> {tag}
                  </a>
                </Link>
              ))}
            </div>
          )}
        </header>

        {/* Optional Banner Image */}
        {post.image && (
          <div className="relative w-full h-64 md:h-80 lg:h-96 mb-8 rounded-lg overflow-hidden shadow-lg">
            <Image
              src={post.image}
              alt={`بنر برای ${post.title}`}
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
        )}

        {/* Post Content */}
        <div
          className="prose prose-lg dark:prose-invert max-w-none
                     prose-headings:font-bold prose-headings:text-light-foreground dark:prose-headings:text-dark-foreground
                     prose-p:text-light-muted-foreground dark:prose-p:text-dark-muted-foreground prose-p:leading-relaxed
                     prose-a:text-light-primary dark:prose-a:text-dark-primary prose-a:no-underline hover:prose-a:underline
                     prose-strong:text-light-foreground dark:prose-strong:text-dark-foreground
                     prose-blockquote:border-r-4 prose-blockquote:border-light-primary dark:prose-blockquote:border-dark-primary prose-blockquote:pr-4 rtl:prose-blockquote:border-l-4 rtl:prose-blockquote:border-r-0 rtl:prose-blockquote:pl-4 rtl:prose-blockquote:pr-0
                     prose-code:bg-light-muted/50 dark:prose-code:bg-dark-muted/50 prose-code:p-1 prose-code:rounded prose-code:text-sm prose-code:font-mono
                     prose-pre:bg-gray-800 dark:prose-pre:bg-gray-900 prose-pre:text-gray-100 prose-pre:p-4 prose-pre:rounded-md prose-pre:overflow-x-auto
                     prose-li:marker:text-light-primary dark:prose-li:marker:text-dark-primary"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Navigation to Previous/Next Post */}
      <nav className="max-w-3xl mx-auto mt-12 flex justify-between items-center border-t border-light-border dark:border-dark-border pt-8">
        {prevPost ? (
          <Link href={`/blog/${prevPost.slug}`} className="group flex items-center text-light-primary dark:text-dark-primary hover:underline">
            <ChevronRight size={20} className="ml-2 rtl:mr-2 rtl:ml-0 transform transition-transform group-hover:-translate-x-1 rtl:group-hover:translate-x-1" />
            <div>
              <span className="block text-sm text-light-muted-foreground dark:text-dark-muted-foreground">پست قبلی</span>
              <span className="font-semibold">{prevPost.title}</span>
            </div>
          </Link>
        ) : (
          <div></div> // Empty div to maintain layout
        )}
        {nextPost ? (
          <Link href={`/blog/${nextPost.slug}`} className="group flex items-center text-light-primary dark:text-dark-primary hover:underline text-right rtl:text-left">
             <div>
              <span className="block text-sm text-light-muted-foreground dark:text-dark-muted-foreground">پست بعدی</span>
              <span className="font-semibold">{nextPost.title}</span>
            </div>
            <ChevronLeft size={20} className="mr-2 rtl:ml-2 rtl:mr-0 transform transition-transform group-hover:translate-x-1 rtl:group-hover:-translate-x-1" />
          </Link>
        ) : (
          <div></div> // Empty div to maintain layout
        )}
      </nav>
    </SectionWrapper>
  );
}
