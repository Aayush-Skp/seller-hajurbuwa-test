import Image from 'next/image';
import registerPhoneNumber from '../../../public/images/register_phone_number.svg';
import searchIcon from '../../../public/icons/searchIcon.svg';
import TextInput from '../common/TextInput';

export default function SearchAndAddProductDirectly() {
  return (
    <section className="px-[127px]">
      <div className="flex items-center justify-center h-[284px] space-x-[42px]">
        <div className="flex items-center justify-center">
          <Image
            src={registerPhoneNumber}
            width={223}
            height={284}
            alt="Register Phone Number Illustration"
          />
        </div>
        <div className="w-full">
          <div className="flex flex-col space-y-4 h-[87px]">
            <span className="text-xs whitespace-nowrap">
              You can easily search the products already available on Hajurbuwa
              and sell it on your pricing.
            </span>
            <span className="whitespace-nowrap">
              Begin adding your products now to build successful wholesale
              store.
            </span>
          </div>
          <div className="relative max-w-[764px]">
            <TextInput placeholder="Product name or product id" />
            <div className="absolute top-3 right-3 flex items-center justify-end">
              <Image src={searchIcon} alt="search icon" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
