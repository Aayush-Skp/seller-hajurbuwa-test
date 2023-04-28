import Image from 'next/image';
import hajurbuwMobileLogo from '/public/images/hajurbuw_white_logo.svg';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { AnimatePresence, motion } from 'framer-motion';

const Navbar = ({ toggle, setToggle }: { toggle: boolean, setToggle: React.Dispatch<React.SetStateAction<boolean>> }) => {
  const router = useRouter();
  const handleToggle = () => {
    setToggle(!toggle)
  }
  return (
    <><div className="pt-[66px] pb-[20px] lg:px-[100px] lg:pt-[25px] px-8 flex justify-between items-center">
      <div
        onClick={() => router.push('/')}
        className="flex justify-center items-center cursor-pointer z-40"
      >
        <Image src={hajurbuwMobileLogo} alt={'Hajurbuwa MObile Logo'} />

        <div className={`${!toggle ? "hidden" : "flex text-xl"} md:flex z-40 font-extrabold text-white ml-2 leading-tight text-4xl`}>
          Hajurbuwa
        </div>
      </div>
      <div className="hidden xl:flex justify-end items-center lg:w-2/5 xl:w-1/3 ">
        <Link href="/login">
          <a className="flex flex-row ml-4 text-[16px] font-medium items-center justify-start bg-transparent whitespace-nowrap text-white px-[35px] hover:text-black hover:bg-white rounded-full py-[14px] my-1 cursor-pointer">
            Login
          </a>
        </Link>
        <Link href="/register">
          <a className="flex flex-row ml-4 text-[16px] font-medium items-center justify-start bg-transparent whitespace-nowrap text-white px-[35px] py-[14px] my-1 rounded-full border-white border-2 cursor-pointer hover:bg-black hover:text-white">
            Register
          </a>
        </Link>
      </div>
      <div className="z-40 menu-bar flex md:hidden cursor-pointer ">
        <div className={`flex flex-col justify-between z-30 w-8  h-5 ${toggle ? 'open' : ''}`} onClick={handleToggle}>
          <div className="hamburger-line h-0.5 w-full ease-in duration-300 bg-white"></div>
          <div className={`hamburger-line h-0.5 w-full  transition delay-300 duration-300 ease-in-out bg-white ${toggle ? 'hidden' : ''}`}></div>
          <div className="hamburger-line h-0.5 w-full ease-in duration-300 bg-white"></div>

        </div>
      </div>

    </div><div className={`z-30 flex md:hidden ${toggle ? "left-0" : "left-[120vw] absolute"}`}>
        <AnimatePresence>
          {toggle &&
            <motion.div
              initial={{ x: '100vw', opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{ x: '100vw', opacity: 0 }}
              variants={{
                enter: { x: 0, opacity: 1 },
                exit: { x: '100vw', opacity: 0 }
              }}
              transition={{ duration: .3, delay: .3 }}
              className='menu-item absolute top-0 bg-blue-800 z-30  right-0 w-full h-full '>
              <div
                className='flex justify-center items-center flex-col h-full w-full'>
                <h1 className='text-xl text-white py-[17px]'><Link href="/login"><a> Login</a></Link> </h1>
                <h1 className='text-xl text-white py-[17px]'><Link href="/register"><a> Register</a></Link> </h1>
              </div>
            </motion.div>}
        </AnimatePresence>
      </div></>
  );
};

export default Navbar;
