import Orders from '../../components/orderManagement';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';
import Head from 'next/head';

function OrderManagementPage() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=1360" />
      </Head>
      <PageWrapper>
        <Orders />
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(OrderManagementPage);
