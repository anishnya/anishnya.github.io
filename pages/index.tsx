import { GetStaticProps, NextPage } from 'next';

import About from '../components/About';
import PublicationList from '../components/PublicationList';
import Teaching from '../components/Teaching';
import Education from '../components/Education';
import { getHeaderImages } from '../utils/headerImages';

interface IndexProps {
    headerImages: string[];
}

const Index: NextPage<IndexProps> = ({ headerImages }) => (
    <>
        <About headerImages={headerImages} />
        <PublicationList />
        <Teaching />
        <Education />
    </>
);

export const getStaticProps: GetStaticProps<IndexProps> = async () => {
    return {
        props: {
            headerImages: getHeaderImages(),
        },
    };
};

export default Index;
