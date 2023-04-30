// import React from 'react';
// import PageWrapper from '../../components/PageWrapper';
// import WarehouseAddress from '../../components/settings/WarehouseAddress';
// import authenticatedRoute from '../../components/WithAuth';
// import Link from 'next/link';

// function WarehouseAddressPage() {
//   return (
//     <div>
//       <PageWrapper>
//         <div className="border-l border-black max-h-max">
//           <div className="pl-24">
//             <div className="w-3/4">
//               <div className="bg-gray-100 px-3 pt-3">
//                 <ul className="flex w-full space-x-20 text-xl">
//                   <li className="cursor-pointer">
//                     <Link href="/settings/account-info">
//                       <a> Seller Info</a>
//                     </Link>
//                   </li>
//                   <li className="cursor-pointer">
//                     <Link href="/settings/bank-account">
//                       <a>Bank Account</a>
//                     </Link>
//                   </li>
//                   <li className="border-b-[5px] border-blue-700">
//                     Warehouse Address
//                   </li>
//                 </ul>
//               </div>
//             </div>
//             <div className="flex border-l border-black py-5 px-16">
//               <WarehouseAddress />
//             </div>
//           </div>
//         </div>
//       </PageWrapper>
//       <div className="flex justify-center my-6">
//         <p className="text-black">© 2023, Hajurbuwa.com</p>
//       </div>
//     </div>
//   );
// }

// export default authenticatedRoute(WarehouseAddressPage);

import Link from 'next/link';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';
import AccountInfo from '../../components/settings/AccountInfo';
import WarehouseAddress from '../../components/settings/WarehouseAddress';

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
    </div>
  );
}

export default authenticatedRoute(AccountInfoPage);
