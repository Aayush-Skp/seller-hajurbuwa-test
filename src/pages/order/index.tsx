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
      <div className="flex justify-center my-6">
        <p className="text-black">© 2023, Hajurbuwa.com</p>
      </div>
    </>
  );
}

export default authenticatedRoute(Orders);
