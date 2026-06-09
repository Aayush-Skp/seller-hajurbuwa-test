import React from 'react';
import ProductListing from '../../components/productListing';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';
import Head from 'next/head';

function ProductDuplicatePage() {
  return (
    <>
      <Head>
        <title>Duplicate Product | Hajurbuwa Seller</title>
        <meta name="viewport" content="width=1360" />
      </Head>
      <PageWrapper>
        <ProductListing mode="duplicate" />
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(ProductDuplicatePage);
