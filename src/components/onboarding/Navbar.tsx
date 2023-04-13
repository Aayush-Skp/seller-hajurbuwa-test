import Image from 'next/image';
import hajurbuwMobileLogo from '/public/images/hajurbuw_white_logo.svg';
import burger from '/public/icons/Burger.svg';

const Navbar = () => {
  return (
    <div className="pt-[66px] pb-[20px] md:px-[100px] lg:pt-[25px] px-8 flex justify-between items-center">
      <div className="flex justify-center items-center">
        <Image src={hajurbuwMobileLogo} alt={'Hajurbuwa MObile Logo'} />

        <div className="hidden md:flex font-extrabold text-white ml-2 leading-tight text-4xl">
          Hajurbuwa
        </div>
      </div>
      <div className="hidden xl:flex justify-end items-center lg:w-2/5 xl:w-1/3 ">
      <div className="flex flex-row ml-4 items-center justify-start bg-transparent whitespace-nowrap text-white px-[35px] py-[14px] my-1 rounded-full">
          <div className="text-[16px] font-medium">Login</div>
        </div>
        <div className="flex flex-row ml-4 items-center justify-start bg-transparent whitespace-nowrap text-white px-[35px] py-[14px] my-1 rounded-full border-white border-2">
          <div className="text-[16px] font-medium">Register</div>
        </div>
        
      </div>
      <div className="flex xl:hidden">
        <Image src={burger} alt={'Burger Icon'} />
      </div>
    </div>
  );
};

export default Navbar;
