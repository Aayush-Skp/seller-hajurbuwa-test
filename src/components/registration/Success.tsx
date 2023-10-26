import Image from 'next/image';
import successImage from '/public/images/success.svg';
import Link from 'next/link';

const Success = () => {
  return (
    <div className="flex relative flex-col pt-14 px-10 pb-5 items-center justify-center text-black h-full w-full">
      <div className="absolute top-0 flex flex-col items-center justify-center translate-y-1/2">
        <span className="font-bold text-md capitalize mb-2">Verification</span>
      </div>
      <Image src={successImage} alt="Register Phone Number Illustration" />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-lg mt-2 font-bold text-black2">
          Account Created Successfully
        </h1>
        <p className="text-sm p-6 text-gray-850 text-center">
          Your account has been successfully created as a seller in
          Hajurbuwa.com. It may take 1-2 days to review and verify your account.
          Meanwhile please check provided email or try logging in your account
          in next 1-2 days. Thank you.
        </p>
      </div>
      <Link
        href="/login"
        className="w-full text-white text-center px-4 py-2 bg-blue-700 rounded hover:opacity-80 transition-opacity">
        
          OK
        
      </Link>
    </div>
  );
};

export default Success;
