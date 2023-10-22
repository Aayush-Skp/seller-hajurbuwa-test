import Link from 'next/link';
import logo from '../../public/icons/logo.svg';
import nepalFlag from '../../public/icons/NP.svg';
import notificationIcon from '../../public/icons/notificationIcon.svg';
import settingIcon from '../../public/icons/settingIcon.svg';
import Image from 'next/image';
import Dropdown from './Dropdown';

import { useClickAwayListener } from '../hooks/useClickAwayListener';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const Navbar = () => {
  const { isNodeVisible, nodeRef, setIsNodeVisible } = useClickAwayListener();
  const router = useRouter();

  const [sellerDetails, setSellerDetails] = useState<any>({});

  useEffect(() => {
    try {
      const details = localStorage.getItem('userDetails');

      if (typeof details === 'string') {
        setSellerDetails(JSON.parse(details));
      }
    } catch (err) {
      console.log(err);
    }
  }, []);

  function handleLogoutAction() {
    try {
      localStorage.removeItem('userDetails');
      router.reload();
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <nav className="fixed top-0 left-0 z-20 w-full h-28 bg-white text-black border-accent-primary border-2">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center justify-start">
            <div className="flex-shrink-0 border-r-2 border-black mr-2">
              <Link href="/dashboard">

                <Image
                  src={logo}
                  alt="Hajurbuwa Logo"
                  width={200}
                  height={50}
                />

              </Link>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center px-10 text-lg shadow-xl h-7">
              <span className="font-bold text-sm whitespace-nowrap">
                {sellerDetails?.business_name}
              </span>
            </div>
            <div>
              <span>
                <Image
                  src={nepalFlag}
                  alt="Nepal Flag"
                  width={46}
                  height={31}
                />
              </span>
            </div>
          </div>
          <ul className="flex flex-2 justify-center items-center">
            <li className="flex-shrink-0 flex items-center justify-center px-5 text-lg">
              <Image src={notificationIcon} alt="notification" />
            </li>
            <li
              ref={nodeRef}
              onClick={() => setIsNodeVisible((prev) => !prev)}
              className="relative flex-shrink-0 flex items-center justify-center px-5 text-lg cursor-pointer"
            >
              <Image src={settingIcon} alt="settings" />
              {isNodeVisible ? (
                <ul className="absolute flex flex-col top-10 px-5 py-2 shadow-2xl space-y-1 justify-center bg-white whitespace-nowrap">
                  <li>
                    <Link href="/settings/account-info">
                      Account Info
                    </Link>
                  </li>
                  <li onClick={handleLogoutAction}>Logout?</li>
                </ul>
              ) : null}
            </li>
          </ul>
        </div>
        <ul className="flex items-center justify-center space-x-5">
          <li className="">
            <Link href="/dashboard" className="font-bold text-lg">
              Dashboard
            </Link>
          </li>
          <li className=" flex items-center">
            <Dropdown
              title="Product Manager"
              links={[
                { title: 'Add Products', link: '/product/add' },
                { title: 'Manage Products', link: '/product-management' },
              ]}
            />
          </li>
          <li>
            <Dropdown
              title="Order And Reviews"
              links={[
                { title: 'Manage Orders', link: '/order-management' },
                { title: 'Manage Reviews', link: '/review-management' },
              ]}
            />
          </li>
          {/* <li className="">
            <Link href="/#">
              <a className="font-bold text-lg">Voucher Manager</a>
            </Link>
            <span className="font-bold text-lg cursor-pointer">
              Voucher Manager
            </span>
          </li> */}
          <li className="">
            <Link href="/finance" className="font-bold text-lg">
              Finance
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
