//  initialize a typescript react component
import React from 'react';
import Image from 'next/image';
import heroImage from '/public/hero.svg';
import { useRouter } from 'next/router';

export default function Hero() {
  const router = useRouter();
  return (
    <>
      <div className="w-full flex h-full flex-col xxl:pt-6 xxl:pl-20 xxl:pr-10 xl:pt-6 xl:pl-20 xl:pr-10 lg:pt-6 lg:pl-20 lg:pr-10 md:pt-6 md:pl-10 md:pr-5 sm:pt-6 sm:pl-10 sm:pr-5 xs:pt-6 xs:pl-5 xs:pr-2">
        <div
          className="flex justify-between items-center rounded-md px-4 p-2 mr-12 xs:ml-10 md:ml-0"
          style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)' }}
        >
          <div className="flex justify-start items-center">
            <div className="flex-shrink-0  xs:text-xs md:text-md">
              Sell on Hajurbuwa.com
            </div>
          </div>
          <button
            onClick={() => router.push('/register')}
            className="bg-brand-600 md:px-4 md:py-2 md:text-md xs:px-2 xs:py-1 xs:text-xs text-white rounded-md"
          >
            Start Selling
          </button>
        </div>
        <div className="grid lg:grid-cols-2 xl:grid-cols-2 xxl:grid-cols-2 p-4 md:grid-cols-1 sm:grid-cols-1 xs:grid-cols-1 xxs:grid-cols-1">
          <div className="flex flex-col justify-center items-start h-full w-full">
            <h1 className="text-xxl p-4 pt-0 ">
              Make your products available to lakhs of customers & businesses
              24x7.
            </h1>
            <p className="text-md p-4 xxl:flex 3xl:flex xl:flex lg:flex md:hidden sm:hidden xs:hidden flex-col justify-between">
              <span className="mt-1">
                Are you a seller looking for a platform to showcase your
                products and reach a wider audience and sell your products on
                bulk, wholesale business price?
              </span>
              <br />
              <span className="mt-1">
                Look no further than Hajurbuwa! With our user-friendly interface
                and extensive customer base, we make it easy for you to start
                selling and increase your profits. Plus, our secure payment and
                delivery options ensure a seamless buying and selling experience
                for all parties involved.
              </span>
              <br />
              <span className="mt-1">
                Join the Hajurbuwa community today and watch your business grow!
              </span>
            </p>
            <button
              onClick={() => router.push('/register')}
              className="bg-brand-600 mx-4 = px-8 py-4 text-white rounded-md"
            >
              Start Selling
            </button>
          </div>
          <div className="flex flex-col h-3/4  md:row-start-1 sm:row-start-1 xs:row-start-1 lg:col-start-2 xl:col-start-2 xxl:col-start-2 3xl:col-start-2 4xl:col-start-2 w-full">
            <Image
              src={heroImage}
              alt="Hero Image"
              className="w-full h-full mt-10"
            />
          </div>
        </div>
      </div>
    </>
  );
}
