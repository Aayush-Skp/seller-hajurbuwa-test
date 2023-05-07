import Image from 'next/image';
import hajurBuwaLogo from '../../../public/icons/hajurbuwa-logo.svg';
import OtpInput from 'react-otp-input';
import { BiArrowBack } from 'react-icons/bi';
import Button from '../common/Button';
import { useEffect, useState } from 'react';
import {
  forgotPasswordService,
  validateOTP,
} from '../../services/forgotPasswordService';
import ErrorMessage from '../common/ErrorMessage';

type OPTVerificationProps = {
  email: string;
  incStep: () => void;
  decStep: () => void;
  otp: string;
  handleOTPChange: (opt: string) => void;
};

export default function OPTVerification(props: OPTVerificationProps) {
  const [isOTPValid, setIsOTPValid] = useState(true);
  const { incStep, decStep, handleOTPChange, otp, email } = props;

  const [validOTPTime, setValidOTPTime] = useState(60);

  useEffect(() => {
    if (validOTPTime !== 0) {
      const counter = setTimeout(() => {
        setValidOTPTime((prev) => prev - 1);
      }, 1000);

      return () => clearTimeout(counter);
    }
  }, [validOTPTime]);

  function handleResendOTP() {
    setValidOTPTime(59);
    forgotPasswordService({ email }).catch(console.log);
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    validateOTP(otp)
      .then((res) => {
        incStep();
      })
      .catch((err) => setIsOTPValid(false));
  }

  return (
    <div className="relative w-full xs:w-full sm:w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 bg-white z-10 shadow-lg">
      <form onSubmit={handleSubmit} className="px-6 py-4 w-full space-y-4 my-5">
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
          <span className="text-3xl font-semibold">Verification Required</span>
          <div className="space-x-1 text-xs">
            <span className="">
              If your email address has been registered with Hajurbuwa,
            </span>
            <span>you will get One-Time-Password (OTP) to</span>
            <span className="text-accent-primary">{email}.</span>
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
          <div className="space-y-1">
            <div>
              <Button type="submit">Continue</Button>
            </div>
            <div className="w-full flex justify-between text-blue-700 text-sm">
              <span className="cursor-pointer" onClick={decStep}>
                Change email
              </span>
              <button
                type="button"
                disabled={validOTPTime !== 0}
                onClick={handleResendOTP}
                className={`${!!validOTPTime ? 'cursor-not-allowed' : ''}`}
              >
                Resend OTP {!!validOTPTime ? `(${validOTPTime})` : ''}
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
