import { useRouter } from 'next/router';

const CTA = () => {
  const router = useRouter();
  return (
    <div
      onClick={() => router.push('/register')}
      className="flex flex-row items-center justify-start bg-black text-white px-[35px] py-[14px] mt-2 lg:mt-4 rounded-full border-white border-2 cursor-pointer"
    >
      <div className="flex flex-col px-4">
        <div className="text-[20px] font-medium">Start Selling</div>
      </div>
    </div>
  );
};

export default CTA;
