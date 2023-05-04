import Image from 'next/image';
import hajurBuwaLogo from '../../../public/icons/hajurbuwa-logo.svg';
import { BiArrowBack } from 'react-icons/bi';
import Button from '../common/Button';
import Link from 'next/link';

export default function PasswordChangeSuccess() {
  return (
    <div className="relative w-full xs:w-full sm:w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 bg-white z-10 shadow-lg">
      <form className="px-6 py-4 w-full space-y-4 my-5">
        <div className="w-full">
          <div className="cursor-pointer" onClick={() => { }}>
            <BiArrowBack className="text-3xl cursor-pointer" />
          </div>
          <div className="w-full flex justify-center">
            <Image
              src={hajurBuwaLogo}
              alt="Register Phone Number Illustration"
            />
          </div>
        </div>
        <div className="space-y-2">
          <span className="text-3xl font-semibold">
            Password Successfully Changed.
          </span>
          <Button>
            <Link href="/login">
              <a className="">Proceed to Login</a>
            </Link>
          </Button>
        </div>
      </form>
    </div>
  );
}
