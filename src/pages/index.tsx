import type { NextPage } from 'next';
import Head from 'next/head';
import Landing from '../components/onboarding/Landing';
import Intersection from '../components/onboarding/Intersection';
import Footer from '../components/onboarding/Footer';
import WhyHajurbuwa from '../components/onboarding/WhyHajurbuwa';
import { useRef, useState } from 'react';

const Home: NextPage = () => {
  const [toggle, setToggle] = useState(false);
  return (
    <div className="">
      <Head>
        <title>Sell on Hajurbuwa | Build Your Wholesale Store</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative overflow-hidden">
        <Landing toggle={toggle} setToggle={setToggle} />
        <Intersection toggle={toggle} />
        <WhyHajurbuwa toggle={toggle} />
        <Footer toggle={toggle} />
      </div>
    </div>
  )
}

export default Home;
