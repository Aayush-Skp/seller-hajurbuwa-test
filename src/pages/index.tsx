import type { NextPage } from 'next';
import Head from 'next/head';
import Landing from '../components/onboarding/Landing';
import Intersection from '../components/onboarding/Intersection';
import Footer from '../components/onboarding/Footer';
import WhyHajurbuwa from '../components/onboarding/WhyHajurbuwa';

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Hajurbuwa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="relative overflow-hidden">
        <Landing />
        <Intersection />
        <WhyHajurbuwa />
        <Footer />
      </div>
    </div>
  )
}

export default Home;
