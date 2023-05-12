import React from 'react';
import ProductListing from '../../components/productListing';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';
import Head from 'next/head';

function ProductUpdatePage() {
  return (
    <>
    <Head>
        <meta name="viewport" content="width=1360" />
      </Head>
      <PageWrapper>
        <ProductListing />
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(ProductUpdatePage);
