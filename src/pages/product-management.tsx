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
    </div>
  );
}

export default authenticatedRoute(ProductManagementPage);
