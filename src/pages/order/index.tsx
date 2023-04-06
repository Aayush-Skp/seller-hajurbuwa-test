import React from 'react';
import OrderDetails from '../../components/orderManagement/OrderDetails';
import PageWrapper from '../../components/PageWrapper';

export default function Orders() {
  return (
    <div>
      <PageWrapper>
        <OrderDetails />
      </PageWrapper>
    </div>
  );
}
