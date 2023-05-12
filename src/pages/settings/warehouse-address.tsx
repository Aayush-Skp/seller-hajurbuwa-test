import Link from 'next/link';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';
import WarehouseAddress from '../../components/settings/WarehouseAddress';
import Head from 'next/head';

function AccountInfoPage() {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=1360" />
      </Head>
      <PageWrapper>
        <div>
          <div className="flex space-x-10">
            <div className="w-24 h-screen border-r border-black"></div>
            <div className="mt-4">
              <div className="bg-gray-100 px-3 pt-3">
                <ul className="flex w-full space-x-20 text-xl">
                  <li className="cursor-pointer">
                    <Link href="/settings/account-info">
                      <a> Seller Info</a>
                    </Link>
                  </li>
                  <li className="cursor-pointer">
                    <Link href="/settings/bank-account">
                      <a>Bank Account</a>
                    </Link>
                  </li>
                  <li className="border-b-[5px] border-blue-700">
                    Warehouse Address
                  </li>
                </ul>
              </div>
              <div className="flex py-10">
                <WarehouseAddress />
              </div>
            </div>
          </div>
        </div>
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(AccountInfoPage);
