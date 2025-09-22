'use server';

import fs from 'fs';
import path from 'path';

const blogsDirectory = path.join(process.cwd(), 'blogs');

export interface BlogPost {
    slug: string;
    title: string;
    date: string;
    content: string;
    excerpt?: string;
}

export function getAllBlogSlugs(): string[] {
    const fileNames = fs.readdirSync(blogsDirectory);
    return fileNames
        .filter(name => name.endsWith('.md'))
        .map(name => name.replace(/\.md$/, ''));
}

export function getBlogPostBySlug(slug: string): BlogPost | null {
    try {
        const fullPath = path.join(blogsDirectory, `${slug}.md`);
        const fileContents = fs.readFileSync(fullPath, 'utf8');

        // Extract title from the first # heading
        const titleMatch = fileContents.match(/^#\s+(.+)$/m);
        const title = titleMatch ? titleMatch[1] : slug;

        // Extract date from filename (assuming format YYYY-MM-DD)
        const dateMatch = slug.match(/^(\d{4}-\d{2}-\d{2})/);
        const date = dateMatch ? dateMatch[1] : '';

        // Remove the title line from content
        const contentWithoutTitle = fileContents.replace(/^#\s+.+$/m, '').trim();

        // Create excerpt from first paragraph (remove markdown formatting for excerpt only)
        const firstParagraph = fileContents
            .split('\n\n')[1] // Skip the title line
            ?.replace(/[#*`]/g, '') // Remove markdown formatting
            ?.substring(0, 200) || '';
        const excerpt = firstParagraph + (firstParagraph.length >= 200 ? '...' : '');

        return {
            slug,
            title,
            date,
            content: contentWithoutTitle, // Markdown content without the title
            excerpt,
        };
    } catch (error) {
        console.error(`Error reading blog post ${slug}:`, error);
        return null;
    }
}

export function getAllBlogPosts(): BlogPost[] {
    const slugs = getAllBlogSlugs();
    const posts = slugs
        .map(slug => getBlogPostBySlug(slug))
        .filter((post): post is BlogPost => post !== null)
        .sort((a, b) => {
            // Sort by date descending (newest first)
            return new Date(b.date).getTime() - new Date(a.date).getTime();
        });

    return posts;
}
