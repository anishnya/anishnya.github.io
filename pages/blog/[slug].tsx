import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import Link from 'next/link';
import ReactMarkdown from 'react-markdown';
import { ChevronLeft } from 'lucide-react';
import moment from 'moment';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import materialDark from 'react-syntax-highlighter/dist/esm/styles/prism/material-dark';
import {
    getAllBlogSlugs,
    getBlogPostBySlug,
    type BlogPost,
} from '../../utils/blog';

interface BlogPostPageProps {
    post: BlogPost;
}

const BlogPostPage: NextPage<BlogPostPageProps> = ({ post }) => {
    if (!post) {
        return <div>Blog post not found</div>;
    }

    return (
        <>
            <Head>
                <title>{`${post.title} | Anish N.`}</title>
                <meta
                    name="description"
                    content={`Blog post by Anish N. - ${post.title}`}
                />
            </Head>
            <article className="w-full">
                <nav className="mb-4">
                    <Link
                        href="/blog"
                        className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ChevronLeft size={16} className="mr-1" />
                        Back to Blog
                    </Link>
                </nav>

                <header className="mb-8">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        {post.title}
                    </h1>
                    {post.date && (
                        <time className="text-gray-600 dark:text-gray-400">
                            {moment(post.date).format('MMMM D, YYYY')}
                        </time>
                    )}
                </header>
                <div className="prose prose-lg max-w-none dark:prose-invert prose-headings:text-gray-900 dark:prose-headings:text-white prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-strong:text-gray-900 dark:prose-strong:text-white">
                    <ReactMarkdown
                        components={{
                            h1: ({ children }) => (
                                <h1 className="text-3xl font-bold mb-4">
                                    {children}
                                </h1>
                            ),
                            h2: ({ children }) => (
                                <h2 className="text-2xl font-semibold mb-3 mt-6">
                                    {children}
                                </h2>
                            ),
                            h3: ({ children }) => (
                                <h3 className="text-xl font-semibold mb-2 mt-4">
                                    {children}
                                </h3>
                            ),
                            p: ({ children }) => (
                                <p className="mb-4 leading-relaxed">
                                    {children}
                                </p>
                            ),
                            ul: ({ children }) => (
                                <ul className="mb-4 ml-6 list-disc">
                                    {children}
                                </ul>
                            ),
                            ol: ({ children }) => (
                                <ol className="mb-4 ml-6 list-decimal">
                                    {children}
                                </ol>
                            ),
                            li: ({ children }) => (
                                <li className="mb-1">{children}</li>
                            ),
                            a: ({ href, children }) => (
                                <Link
                                    href={href || '#'}
                                    className="text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 underline"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    {children}
                                </Link>
                            ),
                            blockquote: ({ children }) => (
                                <blockquote className="border-l-4 border-gray-300 dark:border-gray-600 pl-4 italic my-4">
                                    {children}
                                </blockquote>
                            ),
                            code: ({ className, children, ...props }: any) => {
                                const match = /language-(\w+)/.exec(
                                    className || '',
                                );
                                const language = match ? match[1] : '';
                                const inline = !match;

                                if (!inline && language) {
                                    return (
                                        <SyntaxHighlighter
                                            style={materialDark}
                                            language={language}
                                            PreTag="div"
                                            className="rounded-lg my-4"
                                            {...props}
                                        >
                                            {String(children).replace(
                                                /\n$/,
                                                '',
                                            )}
                                        </SyntaxHighlighter>
                                    );
                                }

                                return (
                                    <code
                                        className="bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded text-sm"
                                        {...props}
                                    >
                                        {children}
                                    </code>
                                );
                            },
                            pre: ({ children }) => (
                                <pre className="my-4">{children}</pre>
                            ),
                        }}
                    >
                        {post.content}
                    </ReactMarkdown>
                </div>
            </article>
        </>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    const slugs = getAllBlogSlugs();
    const paths = slugs.map((slug) => ({
        params: { slug },
    }));

    return { paths, fallback: false };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
    const { slug } = params as { slug: string };
    const post = getBlogPostBySlug(slug);

    if (!post) {
        return {
            notFound: true,
        };
    }

    return {
        props: {
            post,
        },
    };
};

export default BlogPostPage;
