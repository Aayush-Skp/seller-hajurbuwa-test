import React from 'react';
import PageWrapper from '../components/PageWrapper';
import ProductManagement from '../components/productManagement';
import ProductManagementTable from '../components/productManagement/ProductManagementTable';
import { buyers } from '../constants/buyerData';

export default function ProductManagementPage() {
  return (
    <div>
      <PageWrapper>
        <ProductManagement />
      </PageWrapper>
    </div>
  );
}
