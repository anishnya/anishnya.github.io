import { GetStaticProps, NextPage } from 'next';
import Link from 'next/link';
import moment from 'moment';
import { getAllBlogPosts, type BlogPost } from '../utils/blog';

interface BlogPageProps {
    posts: BlogPost[];
}

const BlogPage: NextPage<BlogPageProps> = ({ posts }) => {
    return (
        <>
            <div className="max-w-4xl mx-auto px-4">
                <header className="mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                        Blog
                    </h1>
                    <p className="text-lg text-gray-600 dark:text-gray-400">
                        Thoughtful thoughts, insightful insights, up-to-date
                        updates, and many (hopefully) interesting tidbits.
                    </p>
                </header>

                <div className="space-y-8">
                    {posts.length === 0 ? (
                        <p className="text-gray-600 dark:text-gray-400">
                            No blog posts available yet.
                        </p>
                    ) : (
                        posts.map((post) => (
                            <article
                                key={post.slug}
                                className="border-b border-gray-200 dark:border-gray-700 pb-8 last:border-b-0"
                            >
                                <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                                    <Link
                                        href={`/blog/${post.slug}`}
                                        className="hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                                    >
                                        {post.title}
                                    </Link>
                                </h2>

                                {post.date && (
                                    <time className="text-sm text-gray-600 dark:text-gray-400 mb-3 block">
                                        {moment(post.date).format(
                                            'MMMM D, YYYY',
                                        )}
                                    </time>
                                )}

                                {post.excerpt && (
                                    <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                                        {post.excerpt}
                                    </p>
                                )}

                                <Link
                                    href={`/blog/${post.slug}`}
                                    className="inline-block mt-4 text-blue-600 dark:text-blue-400 hover:underline font-medium"
                                >
                                    Read more →
                                </Link>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </>
    );
};

export const getStaticProps: GetStaticProps = async () => {
    const posts = getAllBlogPosts();

    return {
        props: {
            posts,
        },
    };
};

export default BlogPage;
