import { Dispatch, SetStateAction, useState } from 'react';
import PhoneValidation from './PhoneValidation';
import SellerDetails from './SellerDetails';
import BusinessDetails from './BusinessDetails';
import PhoneVerification from './PhoneVerification';
import TermsAndConditions from './TermsAndConditions';
import PanOrVatUpload from './PanOrVatUpload';
import ChangePanOrVat from './ChangePanOrVat';

export type SellerRegistrationDataType = {
  phone_number: string;
  first_name: string;
  last_name: string;
  pan_number: string;
  business_name: string;
};

export type SetRegistrationData = Dispatch<
  SetStateAction<SellerRegistrationDataType>
>;

export default function SellerRegistration() {
  const [registrationData, setRegistrationData] =
    useState<SellerRegistrationDataType>({
      phone_number: '',
      first_name: '',
      last_name: '',
      pan_number: '',
      business_name: '',
    });

  const [step, setStep] = useState<number>(1);

  function incStep() {
    if (step >= 6) return;
    setStep((prev) => prev + 1);
  }

  function decStep() {
    if (step <= 1) return;
    setStep((prev) => prev - 1);
  }

  return (
    <div className="bg-gray-150 h-screen w-full overflow-hidden flex justify-center items-center">
      <div className="relative bg-white xxl:h-3/5 xxl:w-1/4 xl:h-3/5 xl:w-1/3 lg:h=3/5 lg:w-1/3 md:h-3/5 md:w-1/2 sm:h-3/5 sm:w-2/3 xs:h-full xs:w-full xxs:h-full xxs:">
        {step === 1 ? (
          <PhoneValidation
            setRegistrationData={setRegistrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 2 ? (
          <SellerDetails />
        ) : step === 3 ? (
          <BusinessDetails />
        ) : step === 4 ? (
          <PhoneVerification />
        ) : step === 5 ? (
          <TermsAndConditions />
        ) : step === 6 ? (
          <PanOrVatUpload />
        ) : step === 7 ? (
          <ChangePanOrVat />
        ) : step == 8 ? (
          <TermsAndConditions />
        ) : null}
      </div>
    </div>
  );
}
