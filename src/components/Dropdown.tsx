import Link from 'next/link';
import { useClickAwayListener } from '../hooks/useClickAwayListener';

type DropdownProps = {
  title: string;
  links: {
    title: string;
    link: string;
  }[];
};

const Dropdown: React.FC<DropdownProps> = ({ title, links }) => {
  const { isNodeVisible, setIsNodeVisible, nodeRef } = useClickAwayListener();

  return (
    <div
      ref={nodeRef}
      onClick={() => setIsNodeVisible((prev) => !prev)}
      className="relative max-w-max"
    >
      <button type="button" className="text-lg font-bold">
        <span className="text-lg">{title}</span>
      </button>

      {isNodeVisible ? (
        <div className="absolute flex items-center justify-center max-w-max mt-2 bg-white text-accent-primary rounded-md shadow-lg">
          <ul className="py-1 sm:py-2 sm:px-3 flex flex-col max-w-max">
            {links.map((link) => (
              <li key={link.link}>
                <Link
                  href={link.link}
                  className="text-sm px-3 py-2 max-w-max whitespace-nowrap font-medium hover:underline hover:decoration-accent-primary hover:underline-offset-4">

                  {link.title}

                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default Dropdown;
