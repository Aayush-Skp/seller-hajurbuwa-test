import Head from 'next/head';
import AccountFinanceStatement from '../components/AccountFinanceStatement';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';

function Finance() {
  return (
    <>
    <Head>
        <meta name="viewport" content="width=1360" />
      </Head>
      <PageWrapper>
        <AccountFinanceStatement />
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(Finance);
