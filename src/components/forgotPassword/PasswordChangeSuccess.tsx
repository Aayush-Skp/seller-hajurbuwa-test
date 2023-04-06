import Image from 'next/image';
import hajurBuwaLogo from '../../../public/icons/hajurbuwa-logo.svg';
import { BiArrowBack } from 'react-icons/bi';
import Button from '../common/Button';
import Link from 'next/link';

export default function PasswordChangeSuccess() {
  return (
    <div className="bg-gray-150 h-screen w-full flex justify-center items-center">
      <div className="h-full w-full xs:h-full xs:w-full sm:h-full sm:w-full  md:w-1/2 lg:w-1/3 2xl:w-1/4 bg-white">
        <form className="px-6 py-4 w-full space-y-4 my-5">
          <div className="w-full">
            <div className="cursor-pointer" onClick={() => {}}>
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
            <div className="space-y-2">
              <span className="text-xs">Proceed to Login?</span>
              <Button>
                <Link href="">
                  <a className="">Continue</a>
                </Link>
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
