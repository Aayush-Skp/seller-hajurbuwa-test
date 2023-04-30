import React from 'react';
import ProductListing from '../../components/productListing';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';

function ProductAddPage() {
  return (
    <div className="w-full h-full">
      <PageWrapper>
        <ProductListing />
      </PageWrapper>
    </div>
  );
}

export default authenticatedRoute(ProductAddPage);
