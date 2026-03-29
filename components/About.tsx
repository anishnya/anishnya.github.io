'use client';
// import Image from 'next/image';
// import ExtLink from './ExtLink';
import ProfileImage from './ProfileImage';
import HeaderBackground, { HEADER_BG_INTERVAL_MS } from './HeaderBackground';
import personalInfo from './data/personalInfo.json';

interface AboutProps {
    headerImages: string[];
}

const About = ({ headerImages }: AboutProps): JSX.Element => {
    return (
        <section
            className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] overflow-hidden pt-28 pb-8 text-white"
            id="about"
        >
            <HeaderBackground images={headerImages} />
            <div
                aria-hidden="true"
                className="pointer-events-none absolute right-0 bottom-0 left-0 z-40 h-2 overflow-hidden bg-black/70"
            >
                <div
                    className="header-bg-progress-fill h-full w-full"
                    style={{
                        animation: `header-bg-pulse ${HEADER_BG_INTERVAL_MS}ms linear infinite`,
                    }}
                />
            </div>
            {/* Content */}
            <div className="relative z-10 isolate mx-auto flex w-full max-w-4xl flex-col justify-between gap-2 px-8 py-4 sm:flex-row sm:gap-8">
                <div
                    aria-hidden="true"
                    className="pointer-events-none absolute inset-0 -z-10 rounded-3xl border border-white/5 shadow-[0_8px_30px_rgba(0,0,0,0.2)] backdrop-blur-md"
                    style={{
                        background:
                            'radial-gradient(120% 100% at 50% 50%, rgba(255,255,255,0.20) 0%, rgba(255,255,255,0.12) 28%, rgba(0,0,0,0.10) 52%, rgba(0,0,0,0.02) 74%, rgba(0,0,0,0.00) 100%)',
                        WebkitMaskImage:
                            'radial-gradient(120% 100% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 82%, rgba(0,0,0,0) 90%)',
                        maskImage:
                            'radial-gradient(120% 100% at 50% 50%, rgba(0,0,0,1) 0%, rgba(0,0,0,1) 52%, rgba(0,0,0,0.6) 70%, rgba(0,0,0,0.2) 82%, rgba(0,0,0,0) 90%)',
                    }}
                />
                <div className="self-center flex-shrink-0 scale-[0.90] transform-gpu origin-center -translate-y-[5%] rounded-md transition-transform duration-200 sm:self-auto sm:translate-y-0 sm:scale-100">
                    <ProfileImage />
                </div>
                <div className="flex w-full max-w-xl flex-col items-center justify-center gap-4 sm:items-start">
                    <h1 className="text-4xl font-bold">{personalInfo.name}</h1>
                    {/* Bio Section */}
                    <div>
                        <p>Under Construction...</p>
                        <p>
                            However for the curious, I enjoy <i>Leading</i> with
                            #Dignity ✅🫡
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
