import React from 'react';
import ProductListing from '../../components/productListing';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';

function ProductUpdatePage() {
  return (
    <div>
      <PageWrapper>
        <ProductListing />
      </PageWrapper>
    </div>
  );
}

export default authenticatedRoute(ProductUpdatePage);
