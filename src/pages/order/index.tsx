import React from 'react';
import OrderDetails from '../../components/orderManagement/OrderDetails';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';
import Head from 'next/head';

function Orders() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=1360" />
      </Head>
      <PageWrapper>
        <OrderDetails />
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(Orders);
