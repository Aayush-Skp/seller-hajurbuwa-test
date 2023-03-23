import Image from 'next/image';
import otp from '/public/images/otp.svg';
import OtpInput from 'react-otp-input';
import { BiArrowBack } from 'react-icons/bi';
import { useState } from 'react';
import type { PhoneVerificationProps } from './SellerRegistration';
import ErrorMessage from '../common/ErrorMessage';
import Button from '../common/Button';

export default function PhoneVerification(props: PhoneVerificationProps) {
  const { registrationData, setRegistrationData, incStep, decStep } = props;
  console.log(registrationData);
  const [otpCode, setOptCode] = useState();
  const handleSubmit = (data: any) => {
    console.log(otpCode);
    setRegistrationData((prev) => {
      return {
        ...prev,
        ...data
      };
    });
    incStep();
  };

  return (
      <form onSubmit={handleSubmit} className="flex relative flex-col pt-14 px-10 pb-5 items-center justify-center  text-black h-full w-full">
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
              <span className="text-sm capitalize my-1 text-center">
                Enter Verification code sent to: <br/>+977-{registrationData.phone}
              </span>
            </div>
            <div className="mb-5 flex flex-col">
              <OtpInput
                className={`border-b-2 outline-none border-black
             text-gray-875 h-10 px-4 w-11/12 mr-2 mt-2`}
                containerStyle={`border-2 border-gray-275 rounded-md p-4 `}
                inputStyle={`outline-none`}
                numInputs={4}
                separator={<span></span>}
              />
              {/* {otpCode !== registrationData.otp && (
                <ErrorMessage message={'Invalid OTP'} />
              )} */}
            </div>
          </div>
        </div>
        <Button className="my-2" type="submit">
          Next
        </Button>
      </form>
  );
}
