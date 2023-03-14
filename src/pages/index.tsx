import type { NextPage } from "next";
import Head from "next/head";

const Home: NextPage = () => {
  return (
    <div className="w-screen h-screen">
      <Head>
        <title>Hajurbuwa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <div className="text-green-500">Hajurbuwa.com</div>
      </main>
    </div>
  );
};

export default Home;
