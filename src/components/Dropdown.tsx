import Link from 'next/link';
import { useState } from 'react';
import { useRouter } from 'next/router';

type DropdownProps = {
  title: string;
  links: string[];
  mobile?: boolean;
};

const Dropdown: React.FC<DropdownProps> = ({ title, links, mobile }) => {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const dropdownClasses = mobile
    ? 'block px-2 py-2 text-lg font-bold'
    : 'ml-4 px-2 py-2 text-lg font-bold';

  const isActive = (pathname: string) => {
    return router.pathname === pathname
      ? 'bg-white text-black'
      : 'bg-white text-accent-primary hover:border-accent-primary hover:text-accent-primary hover:border-l-4';
  };

  return (
    <div className="relative">
      <button
        type="button"
        className={`${dropdownClasses} ${isActive(router.pathname)} ${
          isOpen && ''
        }`}
        onClick={toggleDropdown}
      >
        <span className="text-lg">{title}</span>
      </button>

      <div
        className={`${
          isOpen ? 'block' : 'hidden'
        } absolute z-10 mt-2 bg-white text-accent-primary rounded-md shadow-lg`}
      >
        <div className={'py-1 sm:py-2 sm:px-3 flex flex-col'}>
          {links.map((link) => (
            <Link key={link} href={`/${link.toLowerCase().replace(' ', '-')}`}>
              <a
                className={` "text-lg px-3 py-2 text-lg font-medium ${isActive(
                  `/${link.toLowerCase().replace(' ', '-')}`
                )}`}
              >
                {link}
              </a>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dropdown;
