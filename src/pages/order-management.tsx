import React from 'react';
import Orders from '../components/orderManagement';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';
import Header from '../components/Header';

function OrderManagement() {
  return (
    <div>
      <PageWrapper>
        <Header header="Order Management" />
        <Orders />
      </PageWrapper>
    </div>
  );
}

export default authenticatedRoute(OrderManagement);
