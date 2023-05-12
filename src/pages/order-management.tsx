import React from 'react';
import Orders from '../components/orderManagement';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';
import Header from '../components/Header';
import Head from 'next/head';

function OrderManagement() {
  function handleSearch() {}

  return (
    <>
    <Head>
        <meta name="viewport" content="width=1360" />
      </Head>
      <PageWrapper>
        <div className="relative">
          <Header header="Order Management" />
          <Orders />
        </div>
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(OrderManagement);
