import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';
import AccountInfo from '../../components/settings/AccountInfo';

function AccountInfoPage() {
  return (
    <PageWrapper>
      <div>
        <div className="flex space-x-10">
          <div className="w-24 h-screen border-r border-black"></div>
          <div className="mt-4">
            <div className="bg-gray-200 p-3">
              <ul className="flex w-full space-x-20 text-3xl">
                <li className="border-b-[5px] border-accent-primary">
                  Seller Info
                </li>
                <li>Bank Account</li>
                <li>Warehouse Address</li>
              </ul>
            </div>
            <div className="flex py-10">
              <AccountInfo />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
}

export default authenticatedRoute(AccountInfoPage);
