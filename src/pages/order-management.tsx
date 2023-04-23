import React from 'react';
import Orders from '../components/orderManagement';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';
import Header from '../components/Header';

function OrderManagement() {
  return (
    <PageWrapper>
      <Header header="Order Management" />
      <Orders />
    </PageWrapper>
  );
}

export default authenticatedRoute(OrderManagement);
