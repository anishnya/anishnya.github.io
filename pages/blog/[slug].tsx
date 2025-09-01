import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout';

interface BlogPostProps {
    title: string;
    content: string;
}

const BlogPost: NextPage<BlogPostProps> = ({ title, content }) => {
    const router = useRouter();

    if (router.isFallback) {
        return <div>Loading...</div>;
    }

    return (
        <Layout>
            <h1>{title}</h1>
            <div dangerouslySetInnerHTML={{ __html: content }} />
        </Layout>
    );
};

export const getStaticPaths: GetStaticPaths = async () => {
    // Fetch the list of blog posts from your data source
    const posts = [{ slug: 'first-post' }, { slug: 'second-post' }];

    const paths = posts.map((post) => ({
        params: { slug: post.slug },
    }));

    return { paths, fallback: true };
};

export const getStaticProps: GetStaticProps = async () => {
    // const { slug: _slug } = params as { slug: string };

    // Fetch the blog post data from your data source
    const post = {
        title: 'Sample Blog Post',
        content: '<p>This is a sample blog post content.</p>',
    };

    return {
        props: {
            title: post.title,
            content: post.content,
        },
    };
};

export default BlogPost;
