import React from 'react';
import ProductManagement from '../components/productManagement';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';
import Header from '../components/Header';

function ProductManagementPage() {
  return (
    <div>
      <PageWrapper>
        <Header header="Product Management" />
        <ProductManagement />
      </PageWrapper>
      <div className="flex justify-center my-5">
        <p className="text-black">© 2023, Hajurbuwa.com</p>
      </div>
    </div>
  );
}

export default authenticatedRoute(ProductManagementPage);
