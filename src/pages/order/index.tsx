import React from 'react';
import OrderDetails from '../../components/orderManagement/OrderDetails';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';

function Orders() {
  return (
    <>
      <PageWrapper>
        <OrderDetails />
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(Orders);
