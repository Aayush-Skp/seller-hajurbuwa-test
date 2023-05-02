import React, { useState } from 'react';
import CreateNewPassword from './CreateNewPassword';
import EnterEmailOrPassword from './EnterEmailOrPhone';
import OPTVerification from './OTPVerification';
import PasswordChangeSuccess from './PasswordChangeSuccess';

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
    <div>
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
    </div>
  );
}
