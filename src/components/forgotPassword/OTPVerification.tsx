import Image from 'next/image';
import hajurBuwaLogo from '../../../public/icons/hajurbuwa-logo.svg';
import OtpInput from 'react-otp-input';
import { BiArrowBack } from 'react-icons/bi';
import Button from '../common/Button';
import Link from 'next/link';
import { useState } from 'react';
import { validateOTP } from '../../services/forgotPasswordService';
import ErrorMessage from '../common/ErrorMessage';

type OPTVerificationProps = {
  incStep: () => void;
  decStep: () => void;
  otp: string;
  handleOTPChange: (opt: string) => void;
};

export default function OPTVerification(props: OPTVerificationProps) {
  const [isOTPValid, setIsOTPValid] = useState(true);
  const { incStep, decStep, handleOTPChange, otp } = props;

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    validateOTP(otp)
      .then((res) => {
        incStep();
      })
      .catch((err) => setIsOTPValid(false));
  }

  return (
    <div className="bg-gray-150 h-screen w-full flex justify-center items-center">
      <div className="h-full w-full xs:h-full xs:w-full sm:h-full sm:w-full  md:w-1/2 lg:w-1/3 2xl:w-1/4 bg-white">
        <form
          onSubmit={handleSubmit}
          className="px-6 py-4 w-full space-y-4 my-5"
        >
          <div className="w-full">
            <div className="cursor-pointer" onClick={decStep}>
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
              Verification Required
            </span>
            <div className="space-x-1 text-xs">
              <span>We have sent a One-Time-Password (OTP) to</span>
              <span>
                <Link href="">
                  <a className="text-accent-primary">
                    asdfasfdasfasdf@gmail.com
                  </a>
                </Link>
              </span>
            </div>
            <div>
              <span className="text-gray-500 text-sm">Enter OTP code</span>
            </div>
          </div>

          <div className="flex flex-col w-full space-y-5">
            <div className="mb-5 flex flex-col">
              <OtpInput
                className="border-b-2 outline-none border-black text-gray-875 h-10 px-4 w-11/12 mr-2 mt-2"
                containerStyle={`border-2 border-gray-275 rounded-md p-4 `}
                inputStyle={`outline-none`}
                numInputs={4}
                separator={<span></span>}
                onChange={handleOTPChange}
                value={otp}
              />
              {!isOTPValid ? (
                <ErrorMessage message={'Invalid OTP code. Please try again.'} />
              ) : null}
            </div>
            <div>
              <Button type="submit">Continue</Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="w-full h-[1px] bg-black" />
              <p className="whitespace-nowrap">New to Hajurbuwa?</p>
              <div className="w-full h-[1px] bg-black" />
            </div>
            <button className="bg-white text-accent-primary border border-accent-primary rounded px-3 py-2">
              Register as Hajurbuwa seller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
