'use client';

import Link from 'next/link';
import Image from 'next/image';
import NavLink from './NavLink';
import { Sun, Moon } from 'lucide-react';
import { useTheme } from 'next-themes';

interface HeaderProps {
    scrolled: boolean;
}
const Header = ({ scrolled }: HeaderProps): JSX.Element => {
    const { resolvedTheme, setTheme } = useTheme();

    return (
        <header
            className={`z-10 pt-10 pb-1 pl-0 top-0 right-0 left-0 transition border-b ${scrolled ? 'border-gray-400' : 'bg-transparent border-transparent'} sticky w-screen backdrop-filter backdrop-blur-md`}
        >
            <div className="h-0 pb-9 px-5 max-w-4xl w-full flex items-center justify-between m-auto">
                <Link href="/" className="flex items-center">
                    <Image
                        className="cursor-pointer transition-colors !p-1 rounded-full mr-3 hover:bg-gray-300 text-lg dark:filter"
                        src="/images/anish-alt.jpg"
                        width={40}
                        height={40}
                        alt="favicon"
                    />
                    <span className="text-lg">Anish N.</span>
                </Link>
                <nav className="flex items-center justify-between">
                    <NavLink title="About" shortTitle="About" href="/#about" />
                    <NavLink
                        title="Publications"
                        shortTitle="Pubs"
                        href="/#publications"
                    />
                    <NavLink title="Blog" shortTitle="Blog" href="/blog" />
                    <NavLink
                        title="Contact"
                        shortTitle="Contact"
                        href="/#contact"
                    />
                    <NavLink title="CV" shortTitle="CV" href="/#cv" />
                    <NavLink title="Misc" shortTitle="Misc" href="/misc" />
                    <button
                        type="button"
                        aria-label="Change theme"
                        className="cursor-pointer hover:bg-gray-300 px-3 sm:px-5 mr-0 h-8 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-inset focus:border-blue-30 rounded-lg flex items-center justify-center min-w-[2rem] transition-all duration-300"
                        onClick={() => {
                            setTheme(
                                resolvedTheme === 'light' ? 'dark' : 'light'
                            );
                        }}
                    >
                        <abbr title="Switch theme">
                            {resolvedTheme === 'light' ? (
                                <Moon size={20} aria-label="Moon" />
                            ) : (
                                <Sun size={20} aria-label="Sun" />
                            )}
                        </abbr>
                    </button>
                </nav>
            </div>
        </header>
    );
};

export default Header;
