import Image from 'next/image';
import otp from '/public/images/otp.svg';
import OtpInput from 'react-otp-input';
import { BiArrowBack } from 'react-icons/bi';
import { useState } from 'react';
import { SetRegistrationData } from './SellerRegistration';

type PhoneVerificationProps = {
  setRegistrationData: SetRegistrationData;
  incStep: () => void;
  decStep: () => void;
};

export default function PhoneVerification(props: PhoneVerificationProps) {
  const { incStep, decStep } = props;
  const [otpCode, setOptCode] = useState();
  return (
    <div>
      <div className="flex relative flex-col pt-14 px-10 pb-5 items-center xxs:justify-center md:justify-between text-black h-full w-full">
        <div className="absolute top-0 flex flex-col items-center justify-center translate-y-1/2">
          <span className="font-bold text-md capitalize mb-2">
            Verification
          </span>
        </div>
        <div className="cursor-pointer" onClick={decStep}>
          <BiArrowBack className="absolute inset-0 top-0 left-0 m-2 text-3xl cursor-pointer" />
        </div>
        <div className="flex flex-col px-10 pt-0 items-center justify-center w-full">
          <Image src={otp} alt="OTP Verification" height={155} width={258} />
          <div className="flex flex-col items-center justify-center w-full">
            <div className="my-3 flex justify-start">
              <span className="font-bold text-md capitalize mt-1">
                Verify Mobile Number
              </span>
            </div>
            <div className="mb-5 flex items-start">
              <span className="text-sm capitalize my-1 text-left">
                Enter Verification code sent to +977-{''}
              </span>
            </div>
            <div className="mb-5 flex">
              <OtpInput
                // value={otp}
                // onChange={(e: any) => setOpt(e.target.value)}
                className={`border-b-2 outline-none border-black
             text-gray-875 h-10 px-4 w-11/12 mr-2 mt-2`}
                containerStyle={`border-2 border-gray-275 rounded-md p-4 `}
                inputStyle={`outline-none`}
                numInputs={4}
                separator={<span></span>}
              />
            </div>
          </div>
        </div>
        <button className="bg-accent-tertiary text-white rounded-sm uppercase w-3/4 h-10 mt-4">
          Next
        </button>
      </div>
    </div>
  );
}
