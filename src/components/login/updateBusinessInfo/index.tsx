import { Dispatch, SetStateAction, useEffect, useState } from 'react';
import Success from './Success';
import TermsAndConditions from './TermsAndConditions';
import ChangePanOrVat from './ChangePanOrVat';
import BusinessDetails from './BusinessDetailsUpdate';
import formBackground from '../../../../public/images/form_background.svg';
import { useRouter } from 'next/router';

export type SellerRegistrationDataType = {
  phone: string;
  email: string;
  first_name: string;
  last_name: string;
  pan_number: string;
  business_name: string;
  pan_image: File | null | string;
  confirm_terms_and_conditions: boolean;
  receive_updates_on_whatsapp?: boolean;
  confirm_business_name?: boolean;
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

export default function UpdateBusinessDetails() {
  const router = useRouter();

  const [registrationData, setRegistrationData] =
    useState<SellerRegistrationDataType>({
      first_name: '',
      last_name: '',
      pan_number: '',
      phone: '',
      email: '',
      business_name: '',
      pan_image: null,
      confirm_terms_and_conditions: false,
      receive_updates_on_whatsapp: true,
      confirm_business_name: false,
    });

  useEffect(() => {
    setRegistrationData({
      email: '',
      phone: '',
      first_name: 'Bishal',
      last_name: 'kandel',
      pan_number: '123456789',
      business_name: 'Bishal Cosmetics',
      pan_image:
        'https://dipencompany.com/images/company-registration-certificate-of-nepal.webp',
      confirm_terms_and_conditions: false,
      receive_updates_on_whatsapp: true,
      confirm_business_name: false,
    });
  }, []);

  const [step, setStep] = useState<number>(1);

  function incStep() {
    if (step >= 4) return;
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
          <BusinessDetails
            setRegistrationData={setRegistrationData}
            incStep={incStep}
            registrationData={registrationData}
            decStep={decStep}
          />
        ) : step === 2 ? (
          <ChangePanOrVat
            registrationData={registrationData}
            setRegistrationData={setRegistrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 3 ? (
          <TermsAndConditions
            setRegistrationData={setRegistrationData}
            registrationData={registrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step === 4 ? (
          <Success />
        ) : null}
      </div>
    </div>
  );
}
