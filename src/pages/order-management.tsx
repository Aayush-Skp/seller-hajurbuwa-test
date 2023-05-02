import React from 'react';
import Orders from '../components/orderManagement';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';
import Header from '../components/Header';

function OrderManagement() {
  function handleSearch() {}

  return (
    <div>
      <PageWrapper>
        <div className="relative">
          <Header header="Order Management" />
          <Orders />
        </div>
      </PageWrapper>
    </div>
  );
}

export default authenticatedRoute(OrderManagement);
