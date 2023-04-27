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
      <div className="flex justify-center w-full h-full mt-56 mb-5">
        <p className="text-black">© 2023, Hajurbuwa.com</p>
      </div>
    </div>
  );
}

export default authenticatedRoute(ProductAddPage);
