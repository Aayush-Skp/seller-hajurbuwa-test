import React from 'react';
import ProductListing from '../../components/productListing';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';
import Head from 'next/head';

function ProductAddPage() {
  return (
    <>
      <Head>
        <title>Add Product | Hajurbuwa Seller</title>
        <meta name="viewport" content="width=1360" />
      </Head>
      <div className="w-full h-full">
        <PageWrapper>
          <ProductListing mode="add" />
        </PageWrapper>
      </div>
    </>
  );
}

export default authenticatedRoute(ProductAddPage);
