import { Dispatch, SetStateAction, useState } from 'react';
import PhoneValidation from './PhoneValidation';
import SellerDetails from './SellerDetails';
import BusinessDetails from './BusinessDetails';
import PhoneVerification from './PhoneVerification';
import TermsAndConditions from './TermsAndConditions';
import PanOrVatUpload from './PanOrVatUpload';
import ChangePanOrVat from './ChangePanOrVat';
import Success from './Success';
import EmailVerification from './EmailVerification';
import formBackground from '/public/images/form_background.svg';

export type SellerRegistrationDataType = {
  phone: string;
  first_name: string;
  last_name: string;
  password: string;
  email: string;
  pan_number: string;
  business_name: string;
  pan_image: File | null;
  confirm_terms_and_conditions: boolean;
  receive_updates_on_whatsapp: boolean;
  confirm_business_name: boolean;
  phoneOtp: string;
  emailOtp: string;
};

export type SetRegistrationData = Dispatch<
  SetStateAction<SellerRegistrationDataType>
>;

export type RegistrationProps = {
  setRegistrationData: SetRegistrationData;
  incStep: () => void;
  decStep: () => void;
};

export type PhoneVerificationProps = {
  registrationData: SellerRegistrationDataType;
  setRegistrationData: SetRegistrationData;
  incStep: () => void;
  decStep: () => void;
};

export default function SellerRegistration() {
  const [registrationData, setRegistrationData] =
    useState<SellerRegistrationDataType>({
      phone: '',
      first_name: '',
      last_name: '',
      email: '',
      pan_number: '',
      business_name: '',
      password: '',
      pan_image: null,
      confirm_terms_and_conditions: false,
      receive_updates_on_whatsapp: true,
      confirm_business_name: false,
      phoneOtp: '',
      emailOtp: '',
    });

  const [step, setStep] = useState<number>(1);

  function incStep() {
    if (step >= 9) return;
    setStep((prev) => prev + 1);
  }

  function decStep() {
    if (step <= 1) return;
    setStep((prev) => prev - 1);
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
      <div className="relative h-full w-full xs:h-full xs:w-full sm:h-full sm:w-full  md:h-4/5 md:w-1/2 lg:w-1/3  2xl:h-3/5 2xl:w-1/4  bg-white z-10 shadow-lg">
        {step === 1 ? (
          <PhoneValidation
            setRegistrationData={setRegistrationData}
            registrationData={registrationData}
            incStep={incStep}
          />
        ) : step === 2 ? (
          <SellerDetails
            setRegistrationData={setRegistrationData}
            incStep={incStep}
            registrationData={registrationData}
            decStep={decStep}
          />
        ) : step === 3 ? (
          <EmailVerification
            registrationData={registrationData}
            setRegistrationData={setRegistrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 4 ? (
          <BusinessDetails
            setRegistrationData={setRegistrationData}
            incStep={incStep}
            registrationData={registrationData}
            decStep={decStep}
          />
        ) : step === 5 ? (
          <PanOrVatUpload
            setRegistrationData={setRegistrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 6 ? (
          <ChangePanOrVat
            registrationData={registrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 7 ? (
          <TermsAndConditions
            setRegistrationData={setRegistrationData}
            registrationData={registrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 8 ? (
          <PhoneVerification
            registrationData={registrationData}
            setRegistrationData={setRegistrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 9 ? (
          <Success />
        ) : null}
      </div>
    </div>
  );
}
