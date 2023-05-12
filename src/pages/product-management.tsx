import React from 'react';
import ProductManagement from '../components/productManagement';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';
import Header from '../components/Header';
import Head from 'next/head';

function ProductManagementPage() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=1360" />
      </Head>
      <PageWrapper>
        <section className="relative flex flex-col justify-center items-center w-full">
          <div className="flex items-end w-full bg-white h-[82px] px-4 pt-2 text-2xl border-b-[3px] border-gray-150">
            <span className="">Product Management</span>
          </div>
          <div className="w-4/5">
            <ProductManagement />
          </div>
        </section>
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(ProductManagementPage);
