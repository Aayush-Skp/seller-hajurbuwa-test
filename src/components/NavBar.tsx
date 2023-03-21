import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';
import logo from '../../public/icons/logo.svg';
import nepalFlag from '../../public/icons/NP.svg';
// import { IoNotificationsOutline } from 'react-icons/io5';
// import { BiCog } from 'react-icons/bi';
import Image from 'next/image';
import Dropdown from './Dropdown';

const Navbar = ({ pageName }: any) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const isActive = (pathname: string) => {
    return router.pathname === pathname
      ? 'bg-gray-100 text-gray-900'
      : 'text-gray-700';
  };
  isOpen;

  return (
    <nav className="fixed top-0 left-0 z-20 w-full h-28 bg-white text-black border-accent-primary border-2">
      <div className="w-full mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between mt-1">
          <div className="flex items-center justify-start">
            <div className="flex-shrink-0 border-r-2 border-black mr-2">
              <Link href="/">
                <a>
                  <Image
                    src={logo}
                    alt="Hajurbuwa Logo"
                    width={200}
                    height={50}
                  />
                </a>
              </Link>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center px-10 text-lg shadow-md h-7 w-28">
              <Link href="/">
                <a className="font-bold text-sm whitespace-nowrap">XYZ shop</a>
              </Link>
            </div>
            <div>
              <Link href="/">
                <a>
                  <Image
                    src={nepalFlag}
                    alt="Nepal Flag"
                    width={100}
                    height={50}
                  />
                </a>
              </Link>
            </div>
          </div>
          <div className="flex flex-2 justify-center items-center">
            <div className="flex-shrink-0 flex items-center justify-center px-5 text-lg">
              <Link href="/">
                <a className="font-bold text-xxxl">
                  {/* <IoNotificationsOutline /> */}
                </a>
              </Link>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center px-5 text-lg">
              <Link href="/">
                <a className="font-bold text-xxxl">{/* <BiCog /> */}</a>
              </Link>
            </div>
            <div className="flex-shrink-0 flex items-center justify-center px-5 text-lg">
              <Link href="/">
                <a className="font-bold text-lg">Help</a>
              </Link>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-center">
          <div className="ml-5 flex-shrink-0">
            <Link href="/">
              <a className="font-bold text-lg">Dashboard</a>
            </Link>
          </div>
          <div className=" flex items-center">
            <Dropdown
              title="Users Management"
              links={['Buyer Verification', 'Seller Verification']}
            />
            <Dropdown
              title="Accounts"
              links={['Commission Manager', 'Payment']}
            />
            <Dropdown
              title="Site Management"
              links={[
                'Slider Image',
                'Blog Management',
                'Navigation Page',
                'Customer Queries',
              ]}
            />
            <Dropdown
              title="Product Management"
              links={[
                'Product Listing',
                'Product Requests Listing',
                'Category and Subcategory',
                'Product Units',
                'Product Variations',
                'Brand',
              ]}
            />
            <Dropdown
              title="Order Manager"
              links={['View Order', 'View Cart Data', 'Cancelled Order']}
            />
            <Dropdown
              title="Logistics"
              links={['Delivery Area', 'Shipping Zone']}
            />
            <Dropdown title="Other Sections" links={['Feedbacks', 'Issues']} />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
