import { useScrollPosition } from '@n8tb1t/use-scroll-position';
import { useState } from 'react';

// import ExtLink from './ExtLink';
import Footer from './Footer';
import Header from './Header';

interface Props {
    children: React.ReactNode;
}

const Layout = ({ children }: Props): JSX.Element => {
    const [scrolled, setScrolled] = useState(false);

    useScrollPosition(
        ({ currPos }: { currPos: { y: number } }) => {
            if (currPos.y <= -20) {
                setScrolled(true);
            } else {
                setScrolled(false);
            }
        },
        [scrolled]
    );

    return (
        <>
            <Header scrolled={scrolled} />
            <main>{children}</main>
            <Footer />
        </>
    );
};

export default Layout;
