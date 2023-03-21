import type { NextPage } from 'next';
import Head from 'next/head';
import CategorySelection from '../components/CategorySelection';
import NavBar from '../components/NavBar';
import PageWrapper from '../components/PageWrapper';
import ProductListing from '../components/productListing';
import Sidebar from '../components/sidebar/Sidebar';

const Home: NextPage = () => {
  return (
    <PageWrapper>
      <div className="">
        <Head>
          <title>Hajurbuwa</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <NavBar />
        <div className="mt-28">
          <ProductListing />
        </div>
        {/* <Sidebar /> */}
      </div>
    </PageWrapper>
  );
};

export default Home;
