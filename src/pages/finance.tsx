import AccountFinanceStatement from '../components/AccountFinanceStatement';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';

function Finance() {
  return (
    <>
      <PageWrapper>
        <AccountFinanceStatement />
      </PageWrapper>
      <div className="flex justify-center my-5">
        <p className="text-black">© 2023, Hajurbuwa.com</p>
      </div>
    </>
  );
}

export default authenticatedRoute(Finance);
