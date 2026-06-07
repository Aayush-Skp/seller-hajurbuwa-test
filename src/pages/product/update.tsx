import React from 'react';
import ProductListing from '../../components/productListing';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';
import Head from 'next/head';

function ProductUpdatePage() {
  return (
    <>
      <Head>
        <title>Edit Product | Hajurbuwa Seller</title>
        <meta name="viewport" content="width=1360" />
      </Head>
      <PageWrapper>
        <ProductListing mode="edit" />
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(ProductUpdatePage);
