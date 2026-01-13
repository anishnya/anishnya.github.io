import Image from 'next/image';

interface BlogImageProps {
    src?: string;
    alt?: string;
    title?: string;
}

const BlogImage = ({
    src = '',
    alt = '',
    title,
}: BlogImageProps): JSX.Element => {
    // Validate src exists
    if (!src) {
        return (
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded">
                Image failed to load
            </div>
        );
    }

    // Detect external vs local URLs
    const isExternal = src.startsWith('http://') || src.startsWith('https://');

    return (
        <figure className="w-full max-w-2xl mx-auto my-6">
            <div className="relative w-full bg-gray-100 dark:bg-gray-800 rounded-lg overflow-hidden">
                <Image
                    src={src}
                    alt={alt || 'Blog image'}
                    width={800}
                    height={600}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 900px"
                    unoptimized={isExternal}
                    className="w-full h-auto"
                    loading="lazy"
                />
            </div>
            {title && (
                <figcaption className="text-sm text-gray-600 dark:text-gray-400 mt-2 text-center italic">
                    {title}
                </figcaption>
            )}
        </figure>
    );
};

export default BlogImage;
