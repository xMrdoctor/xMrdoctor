import { MetadataRoute } from 'next';
import { getSortedPostsData, getAllPostSlugs } from '@/lib/blog'; // Assuming these functions exist
import { siteConfig } from '@/lib/utils'; // For base URL

export default function sitemap(): MetadataRoute.Sitemap {
  const BASE_URL = siteConfig.url || 'https://example.com'; // Fallback, replace with your actual domain

  // Get all blog posts for dynamic routes
  const posts = getSortedPostsData(); // This returns frontmatter, need slugs
  const postEntries: MetadataRoute.Sitemap = posts.map(({ slug, date }) => ({
    url: `${BASE_URL}/blog/${slug}`,
    lastModified: new Date(date).toISOString(),
    changeFrequency: 'monthly', // Or 'weekly' if you update often
    priority: 0.8,
  }));

  // Get all tags for dynamic tag pages
  const tagSlugs = new Set<string>();
  posts.forEach(post => {
    post.tags?.forEach(tag => tagSlugs.add(tag));
  });
  const tagEntries: MetadataRoute.Sitemap = Array.from(tagSlugs).map(tag => ({
    url: `${BASE_URL}/blog/tags/${encodeURIComponent(tag)}`,
    lastModified: new Date().toISOString(), // Could be based on latest post with that tag
    changeFrequency: 'weekly',
    priority: 0.6,
  }));


  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly', // Or 'monthly' if content changes
      priority: 1,
    },
    {
      url: `${BASE_URL}/#about`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/#skills`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/#projects`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/#experience`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/#contact`,
      lastModified: new Date().toISOString(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${BASE_URL}/blog`,
      lastModified: new Date().toISOString(), // Could be the date of the latest post
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  return [
    ...staticPages,
    ...postEntries,
    ...tagEntries,
  ];
}
