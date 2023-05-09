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
    <>
      <Head>
        <title>Sell on Hajurbuwa | Build Your Wholesale Store</title>
        <meta name="description" content="Discover a new way to sell your products online with Hajurbuwa's B2B ecommerce marketplace. Sell to a wider audience and enjoy hassle-free transactions. Register as a Hajurbuwa Seller now!" />
        <meta name="keywords" content="B2B, ecommerce, platform, Nepal, online marketplace, bulk order, wholesale, grocery, clothing, electronics, small businesses, farmers, convenience, shopping" />
        <meta name="author" content="Hajurbuwa" />
        <link rel="canonical" href="https://sell.hajurbuwa.com/" />
        <meta property="og:title" content="Sell on Hajurbuwa | Build Your Wholesale Store" />
        <meta property="og:description" content="Discover a new way to sell your products online with Hajurbuwa's B2B ecommerce marketplace. Sell to a wider audience and enjoy hassle-free transactions. Register as a Hajurbuwa Seller now!" />
        <meta property="og:image" content="https://hajurbuwa-s3-bucket.s3.ap-south-1.amazonaws.com/public/og_image.png" />
        <meta property="og:url" content="https://sell.hajurbuwa.com/" />
        <meta property="og:type" content="website" />
        <meta name="twitter:title" content="Sell on Hajurbuwa | Build Your Wholesale Store" />
        <meta name="twitter:description" content="Discover a new way to sell your products online with Hajurbuwa's B2B ecommerce marketplace. Sell to a wider audience and enjoy hassle-free transactions. Register as a Hajurbuwa Seller now!" />
        <meta name="twitter:image" content="https://hajurbuwa-s3-bucket.s3.ap-south-1.amazonaws.com/public/og_image.png" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative overflow-hidden">
        <Landing ref={ref} toggle={toggle} setToggle={setToggle} />
        <Intersection toggle={toggle} />
        <WhyHajurbuwa ref={ref} toggle={toggle} />
        <Footer toggle={toggle} />
      </div>
    </>
  );
};

export default Home;
