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
      <div className="flex justify-center my-5">
        <p className="text-black">© 2023, Hajurbuwa.com</p>
      </div>
    </div>
  );
}

export default authenticatedRoute(OrderManagement);
