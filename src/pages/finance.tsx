import AccountFinanceStatement from '../components/AccountFinanceStatement';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';

function Finance() {
  return (
    <>
      <PageWrapper>
        <AccountFinanceStatement />
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(Finance);
