import { useRouter } from 'next/router';
import Link from 'next/link';

interface Props {
	title: string;
	shortTitle: string;
	href: string;
}

const NavLink = ({ title, shortTitle, href }: Props): JSX.Element => {
	const router = useRouter();

	return (
		<Link href={href}>
			<button
				type="button"
				className={`rounded-lg no-underline flex h-8 mr-0 px-3 sm:px-5
					items-center border-none cursor-pointer font-bold text-sm
					transition-all duration-300 
					${router.asPath === href ? 'bg-black dark:bg-white text-white dark:text-black' : 'bg-auto'}`}>
				<span className="hidden sm:inline">{title}</span>
				<span className="sm:hidden">{shortTitle}</span>
			</button>
		</Link>
	);
};

export default NavLink;
