import type { NextPage } from 'next';
import Head from 'next/head';
import Sidebar from '../components/sidebar/Sidebar';

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen bg-gray-200">
      <Head>
        <title>Hajurbuwa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main></main>
    </div>
  );
};

export default Home;
