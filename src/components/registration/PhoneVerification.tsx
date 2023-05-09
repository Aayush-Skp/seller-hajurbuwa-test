import Image from 'next/image';
import otp from '/public/images/otp.svg';
import OtpInput from 'react-otp-input';
import { BiArrowBack } from 'react-icons/bi';
import { useEffect, useState } from 'react';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import {
  SellerRegistrationDataType,
  SetRegistrationData,
} from './SellerRegistration';
import {
  sendOTPToPhone,
  verifyOTPSentToPhone,
} from '../../services/phoneVerificationService';
import Spinner from '../loader/Spinner';

type PhoneVerificationProps = {
  setRegistrationData: SetRegistrationData;
  registrationData: SellerRegistrationDataType;
  incStep: () => void;
  decStep: () => void;
};

export default function PhoneVerification(props: PhoneVerificationProps) {
  const { setRegistrationData, incStep, decStep, registrationData } = props;
  const [otpTimeout, setOtpTimeout] = useState(59);
  const [otpValidation, setOtpValidation] = useState({
    isValid: true,
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    if (otpTimeout !== 0) {
      timeout = setTimeout(() => setOtpTimeout((prev) => prev - 1), 1000);
    }

    return () => clearTimeout(timeout);
  }, [otpTimeout]);

  const handleSubmit = () => {
    setIsLoading(true);

    verifyOTPSentToPhone(registrationData.phone, registrationData.phoneOtp)
      .then((res) => {
        if (res.status === 'error') {
          setOtpValidation({
            isValid: false,
            message: 'invalid otp',
          });
        } else {
          incStep();
        }
      })
      .catch((err) => {
        setOtpValidation({
          isValid: false,
          message: 'invalid otp',
        });
        setIsLoading(false);
      });
  };

  function handleOtpChange(value: string) {
    setRegistrationData((prev) => {
      return {
        ...prev,
        phoneOtp: value,
      };
    });

    setOtpValidation({
      isValid: true,
      message: '',
    });
  }

  function handleSendOTP() {
    setOtpTimeout(59);
    sendOTPToPhone(registrationData.phone).catch(console.log);
  }

  return (
    <div className="flex relative flex-col pt-14 px-10 pb-5 items-center justify-center  text-black h-full w-full">
      <div className="absolute top-0 flex flex-col items-center justify-center translate-y-1/2">
        <span className="font-bold text-md capitalize mb-2">Verification</span>
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
              Enter Verification code sent to: <br />
              +977-{registrationData.phone}
            </span>
          </div>
          <div className="mb-5 flex flex-col">
            <OtpInput
              className={`border-b-2 outline-none border-black
             text-gray-875 h-10 px-4 w-11/12 mr-2 mt-2`}
              containerStyle={`border-2 border-gray-275 rounded-md p-4 `}
              inputStyle={`outline-none`}
              numInputs={6}
              value={registrationData.phoneOtp}
              onChange={handleOtpChange}
              separator={<span></span>}
            />
            <span>
              <ErrorMessage message={otpValidation.message} />
            </span>
            <div className="text-xs text-accent-primary flex justify-between">
              <button onClick={decStep}>Change Phone Number</button>
              <button
                className={`${
                  !!otpTimeout ? 'text-gray-400 cursor-not-allowed' : ''
                }`}
                disabled={otpTimeout === 0 ? false : true}
                onClick={handleSendOTP}
              >
                Resend OTP {!!otpTimeout ? `(${otpTimeout} seconds)` : ''}
              </button>
            </div>
          </div>
        </div>
      </div>
      <Button
        type="submit"
        onClick={handleSubmit}
        disabled={registrationData.emailOtp === ''}
      >
        {isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <span>Please wait...</span>
            <Spinner />
          </div>
        ) : (
          'Next'
        )}
      </Button>
    </div>
  );
}
