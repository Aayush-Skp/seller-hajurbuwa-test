import type { NextPage } from 'next';
import Head from 'next/head';
import Landing from '../components/onboarding/Landing';
import Intersection from '../components/onboarding/Intersection';
import Footer from '../components/onboarding/Footer';
import WhyHajurbuwa from '../components/onboarding/WhyHajurbuwa';
import { useEffect, useRef, useState } from 'react';

const Home: NextPage = () => {
  const [toggle, setToggle] = useState(false);

  const ref = useRef<any>(null);

  return (
    <div className="">
      <Head>
        <title>Sell on Hajurbuwa | Build Your Wholesale Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative overflow-hidden">
        <Landing ref={ref} toggle={toggle} setToggle={setToggle} />
        <Intersection toggle={toggle} />
        <WhyHajurbuwa ref={ref} toggle={toggle} />
        <Footer toggle={toggle} />
      </div>
    </div>
  );
};

export default Home;
