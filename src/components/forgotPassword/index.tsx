import React, { useState } from 'react';
import CreateNewPassword from './CreateNewPassword';
import EnterEmailOrPassword from './EnterEmailOrPhone';
import OPTVerification from './OTPVerification';
import PasswordChangeSuccess from './PasswordChangeSuccess';
import formBackground from '/public/images/form_background.svg';

export default function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [otp, setOtp] = useState('');
  const [email, setEmail] = useState('');

  function handleOTPChange(value: string) {
    setOtp(value);
  }

  function incStep() {
    step <= 2 && setStep((prev) => prev + 1);
  }

  function decStep() {
    step >= 1 && setStep((prev) => prev - 1);
  }

  return (
    <div className=" h-screen flex justify-center items-center relative w-full overflow-hidden">
      <div
        className="absolute h-full w-full z-0 opacity-20"
        style={{
          backgroundImage: `url(${formBackground.src})`,
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></div>
      <>
      {step === 1 ? (
        <EnterEmailOrPassword
          incStep={incStep}
          decStep={decStep}
          setEmail={setEmail}
        />
      ) : step === 2 ? (
        <OPTVerification
          email={email}
          otp={otp}
          handleOTPChange={handleOTPChange}
          incStep={incStep}
          decStep={decStep}
        />
      ) : step === 3 ? (
        <CreateNewPassword incStep={incStep} decStep={decStep} otp={otp} />
      ) : step === 4 ? (
        <PasswordChangeSuccess />
      ) : null}
      </>
      <div className="absolute justify-center bottom-4">
        <p className="text-black">© 2023, Hajurbuwa.com</p>
      </div>
    </div>
  );
}
