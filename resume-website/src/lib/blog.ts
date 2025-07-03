import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { BlogPost } from './utils'; // Assuming BlogPost interface is in utils.ts
import { remark } from 'remark';
import html from 'remark-html';
import remarkGfm from 'remark-gfm';

const postsDirectory = path.join(process.cwd(), 'content/blog');

export function getSortedPostsData(): Omit<BlogPost, 'content'>[] {
  // Get file names under /content/blog
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter(fileName => fileName.endsWith('.md')) // Filter for markdown files
    .map(fileName => {
      // Remove ".md" from file name to get id
      const slug = fileName.replace(/\.md$/, '');

      // Read markdown file as string
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');

      // Use gray-matter to parse the post metadata section
      const matterResult = matter(fileContents);

      // Combine the data with the id
      return {
        slug,
        title: matterResult.data.title || 'بدون عنوان',
        date: matterResult.data.date || new Date().toISOString(),
        excerpt: matterResult.data.excerpt || '',
        image: matterResult.data.image || null,
        tags: matterResult.data.tags || [],
        author: matterResult.data.author || 'نویسنده ناشناس',
        // ...matterResult.data, // Spread other frontmatter properties if any
      };
    });

  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (new Date(a.date) < new Date(b.date)) {
      return 1;
    } else {
      return -1;
    }
  });
}

export function getAllPostSlugs() {
  const fileNames = fs.readdirSync(postsDirectory);
  return fileNames
    .filter(fileName => fileName.endsWith('.md'))
    .map(fileName => {
      return {
        params: {
          slug: fileName.replace(/\.md$/, ''),
        },
      };
    });
}

export async function getPostData(slug: string): Promise<BlogPost> {
  const fullPath = path.join(postsDirectory, `${slug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');

  // Use gray-matter to parse the post metadata section
  const matterResult = matter(fileContents);

  // Use remark to convert markdown into HTML string
  const processedContent = await remark()
    .use(remarkGfm) // Add support for GitHub Flavored Markdown (tables, strikethrough, etc.)
    .use(html)
    .process(matterResult.content);
  const contentHtml = processedContent.toString();

  // Combine the data with the id and contentHtml
  return {
    slug,
    title: matterResult.data.title || 'بدون عنوان',
    date: matterResult.data.date || new Date().toISOString(),
    excerpt: matterResult.data.excerpt || '',
    image: matterResult.data.image || null,
    tags: matterResult.data.tags || [],
    author: matterResult.data.author || 'نویسنده ناشناس',
    content: contentHtml,
    // ...matterResult.data,
  };
}
