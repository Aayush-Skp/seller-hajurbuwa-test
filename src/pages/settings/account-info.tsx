import Link from 'next/link';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';
import AccountInfo from '../../components/settings/AccountInfo';

function AccountInfoPage() {
  return (
    <div>
      <PageWrapper>
        <div>
          <div className="flex space-x-10">
            <div className="w-24 h-screen border-r border-black"></div>
            <div className="mt-4">
              <div className="bg-gray-100 px-3 pt-3">
                <ul className="flex w-full space-x-20 text-xl">
                  <li className="border-b-[5px] border-blue-700">
                    Seller Info
                  </li>
                  <li className="cursor-pointer">
                    <Link href="/settings/bank-account">
                      <a>Bank Account</a>
                    </Link>
                  </li>
                  <li className="cursor-pointer">
                    <Link href="/settings/warehouse-address">
                      <a>Warehouse Address</a>
                    </Link>
                  </li>
                </ul>
              </div>
              <div className="flex py-10">
                <AccountInfo />
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
      <div className="flex justify-center my-6">
        <p className="text-black">© 2023, Hajurbuwa.com</p>
      </div>
    </div>
  );
}

export default authenticatedRoute(AccountInfoPage);
