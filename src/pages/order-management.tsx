import React from 'react';
import Orders from '../components/orderManagement';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';

function OrderManagement() {
  return (
    <div>
      <PageWrapper>
        <Orders />
      </PageWrapper>
    </div>
  );
}

export default authenticatedRoute(OrderManagement);
