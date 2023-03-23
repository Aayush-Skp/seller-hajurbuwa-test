import { Dispatch, SetStateAction, useState } from 'react';
import PhoneValidation from './PhoneValidation';
import SellerDetails from './SellerDetails';
import BusinessDetails from './BusinessDetails';
import PhoneVerification from './PhoneVerification';
import TermsAndConditions from './TermsAndConditions';
import PanOrVatUpload from './PanOrVatUpload';
import ChangePanOrVat from './ChangePanOrVat';
import Success from './Success';

export type SellerRegistrationDataType = {
  phone: string;
  first_name: string;
  last_name: string;
  pan_number: string;
  business_name: string;
  otp: string;
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
      pan_number: '',
      business_name: '',
      otp: '',
    });

  const [step, setStep] = useState<number>(8);
  const [panImageUrl, setPanImageUrl] = useState<string>('');
  const [panImage, setPanImage] = useState<File | null>(null);
  function incStep() {
    if (step >= 7) return;
    setStep((prev) => prev + 1);
  }

  function decStep() {
    if (step <= 1) return;
    setStep((prev) => prev - 1);
  }

  return (
    <div className="bg-gray-150 h-screen w-full overflow-hidden flex justify-center items-center">
      <div className="relative h-full w-full xs:h-full xs:w-full sm:h-full sm:w-full  md:h-4/5 md:w-1/2 lg:w-1/3  2xl:h-3/5 2xl:w-1/4  bg-white">
        {step === 1 ? (
          <PhoneValidation
            setRegistrationData={setRegistrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 2 ? (
          <SellerDetails
            setRegistrationData={setRegistrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 3 ? (
          <BusinessDetails
            setRegistrationData={setRegistrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 4 ? (
          <PanOrVatUpload
            setPanImageUrl={setPanImageUrl}
            setPanImage={setPanImage}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 5 ? (
          <ChangePanOrVat
            panImageUrl={panImageUrl}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 6 ? (
          <TermsAndConditions
            setRegistrationData={setRegistrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 7 ? (
          <PhoneVerification
            registrationData={registrationData}
            setRegistrationData={setRegistrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 8 ? (
          <Success />
        ) : null}
      </div>
    </div>
  );
}
