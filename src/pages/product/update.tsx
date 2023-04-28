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
      <div className="flex justify-center w-full h-full mt-56 mb-5">
        <p className="text-black">© 2023, Hajurbuwa.com</p>
      </div>
    </div>
  );
}

export default authenticatedRoute(ProductUpdatePage);
