import { ReactNode } from 'react';
// import ExtLink from './ExtLink';
import IconImage from './IconImage';
import personalInfo from './data/personalInfo.json';
import Link from 'next/link';

interface BoxProps {
    href: string;
    label: string;
    onClick?: () => void;
    children: ReactNode;
}

const Box = ({ href, label, onClick, children }: BoxProps) => (
    <Link
        target="_blank"
        rel="noopener noreferrer"
        href={href}
        aria-label={label}
        className="items-center justify-center cursor-pointer transition-colors rounded-md select-none w-7 h-7"
        onClick={onClick}
    >
        {children}
    </Link>
);

const SupportingBox = (): JSX.Element => {
    return (
        <div className="flex justify-between w-44 dark:invert">
            <div className="flex justify-between w-44">
                <Box href="/cv.pdf" label="CV">
                    <IconImage path="/images/icons8-cv.svg" name="CV" />
                </Box>
                <Box href={personalInfo.socialMedia.LinkedIn} label="LinkedIn">
                    <IconImage
                        path="/images/icons8-linkedin.svg"
                        name="LinkedIn"
                    />
                </Box>
                <Box href="" label="GitHub">
                    <IconImage path="/images/icons8-github.svg" name="GitHub" />
                </Box>
                <Box
                    href={personalInfo.socialMedia.GoogleScholar}
                    label="GoogleScholar"
                >
                    <IconImage
                        path="/images/icons8-google-scholar.svg"
                        name="GoogleScholar"
                    />
                </Box>
            </div>
        </div>
    );
};

export default SupportingBox;
