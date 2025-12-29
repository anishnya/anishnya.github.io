import Link from 'next/link';

interface Props {
    href: string;
    children: React.ReactNode;
}

const ExtLink = ({ href, children }: Props) => (
    <Link
        href={href}
        className="border-b-[1px] border-gray-600 transition hover:bg-gray-200 dark:hover:bg-gray-600 rounded-t-sm"
        target="_blank"
        rel="noopener noreferrer"
    >
        {children}
    </Link>
);

export default ExtLink;
