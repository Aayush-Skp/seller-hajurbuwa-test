import React from 'react';
import ProductManagement from '../components/productManagement';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';

function ProductManagementPage() {
  return (
    <div>
      <PageWrapper>
        <ProductManagement />
      </PageWrapper>
    </div>
  );
}

export default authenticatedRoute(ProductManagementPage);
