import { AppProps } from 'next/app';
import Head from 'next/head';
import { ThemeProvider } from '../components/theme-provider';
import '../styles/globals.css';

import Layout from '../components/Layout';
import personalInfo from '../components/data/personalInfo.json';
// import GoogleTag from '../components/GoogleTag';

const App = ({ Component, pageProps }: Readonly<AppProps>): JSX.Element => {
    return (
        <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem={true}
        >
            {/* <GoogleTag/> */}
            <Head>
                <title>{personalInfo.title}</title>
                <link rel="canonical" href={personalInfo.domain} />
                <link rel="icon" href="/favicon/favicon.ico" />
                <meta
                    name="description"
                    content={personalInfo.name + "'s personal website"}
                />
                <meta
                    property="og:description"
                    content={personalInfo.name + "'s personal website"}
                />
                <meta property="og:image" content="/favicon/favicon.ico" />
                <meta property="og:locale" content="en_US" />
                <meta property="og:type" content="website" />
            </Head>
            <Layout>
                <main className="flex flex-col m-auto leading max-w-4xl items-start p-5">
                    <Component {...pageProps} />
                </main>
            </Layout>
        </ThemeProvider>
    );
};

export default App;
