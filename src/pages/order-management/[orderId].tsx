import OrderDescription from '../../components/orderManagement/OrderDescription';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';
import Head from 'next/head';

function OrderDescriptionPage() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=1360" />
      </Head>
      <PageWrapper>
        <OrderDescription />
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(OrderDescriptionPage);
