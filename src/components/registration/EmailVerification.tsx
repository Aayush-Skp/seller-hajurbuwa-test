import Image from 'next/image';
import otp from '/public/images/otp.svg';
import OtpInput from 'react-otp-input';
import { BiArrowBack } from 'react-icons/bi';
import { useState } from 'react';
import {
  SellerRegistrationDataType,
  SetRegistrationData,
} from './SellerRegistration';
import Button from '../common/Button';
import { verifyOTPSentToEmail } from '../../services/emailVerificationService';
import ErrorMessage from '../common/ErrorMessage';

type PhoneVerificationProps = {
  setRegistrationData: SetRegistrationData;
  registrationData: SellerRegistrationDataType;
  incStep: () => void;
  decStep: () => void;
};

export default function EmailVerification(props: PhoneVerificationProps) {
  const { setRegistrationData, incStep, decStep, registrationData } = props;

  const [otpValidation, setOtpValidation] = useState({
    status: true,
    message: '',
  });

  function handleSubmit() {
    verifyOTPSentToEmail(registrationData.emailOtp)
      .then((res) => {
        console.log(res);
        incStep();
      })
      .catch(() => {
        setOtpValidation({
          status: false,
          message: '',
        });
      });
  }

  return (
    <div className="flex relative flex-col pt-14 px-10 pb-5 items-center justify-center  text-black h-full w-full">
      <div className="flex items-center w-full space-x-24">
        <div className="cursor-pointer" onClick={decStep}>
          <BiArrowBack className="text-3xl cursor-pointer" />
        </div>
        <p className="font-bold text-md capitalize mb-2">Email verification</p>
      </div>
      <div className="flex flex-col px-10 pt-0 items-center justify-center w-full">
        <Image src={otp} alt="OTP Verification" height={155} width={258} />
        <div className="flex flex-col items-center justify-center w-full">
          <div className="my-3 flex justify-start">
            <span className="font-bold text-md capitalize mt-1">
              Verify your Email
            </span>
          </div>
          <div className="w-full text-sm">
            We have sent a One-Time-Password (OTP) to
            <p className="text-accent-primary">{registrationData.email}</p>
          </div>
          <div className="mb-5 mt-4 flex flex-col">
            <OtpInput
              className={`border-b-2 outline-none border-black
             text-gray-875 h-10 px-4 w-11/12 mr-2 mt-2`}
              containerStyle={`border-2 border-gray-275 rounded-md p-4 `}
              inputStyle={`outline-none`}
              numInputs={4}
              separator={<span></span>}
              onChange={(value: string) =>
                setRegistrationData((prev) => {
                  return {
                    ...prev,
                    emailOtp: value,
                  };
                })
              }
              value={registrationData.emailOtp}
            />
            {!otpValidation.status ? (
              <ErrorMessage message={otpValidation.message} />
            ) : (
              <p>{otpValidation.message}</p>
            )}
          </div>
        </div>
      </div>
      <Button className="my-2" onClick={handleSubmit}>
        Continue
      </Button>
    </div>
  );
}
