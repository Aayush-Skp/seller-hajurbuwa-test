import Navbar from '../components/onboarding/Navbar';

const NetworkErrorPage = () => {
  return (
    <div className="h-screen w-screen relative bg-blue-900">
      <Navbar />
      <div className="w-full flex justify-center items-center lg:justify-start">
        <div className="flex justify-center lg:justify-start lg:items-start lg:w-2/3 2xl:w-1/2 items-center flex-col text-center lg:text-left mt-20 px-8 md:px-[100px] lg:px-[50px] xl:px-[100px] 3xl:px-[200px]">
          <div className="font-bold text-[20px] md:text-[30px] text-white leading-none my-2">
          Hajurbuwa is trying to reach you.
          </div>
          <div className="font-bold text-[40px] md:text-[60px] lg:text-[75px] text-white leading-none my-2">
          Network error.
          </div>
          <div className="text-[12px] md:text-[16px] lg:text-[20px] text-white my-2 leading-normal tracking-wide">
          Looks like the internet elves have gone on strike and left us with a network error. It&apos;s like trying to communicate with a teenager who&apos;s got their headphones on - you just can&apos;t get through!
          </div>
          <div className="flex flex-row items-center justify-start bg-black text-white px-[35px] py-[14px] mt-4 lg:mt-8 rounded-full border-white border-2">
            <div className="flex flex-col px-4">
              <div className="text-[20px] font-medium">Refresh</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetworkErrorPage;
