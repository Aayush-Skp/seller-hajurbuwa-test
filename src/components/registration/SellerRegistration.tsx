import { Dispatch, SetStateAction, useState } from 'react';
import PhoneValidation from './PhoneValidation';
import SellerDetails from './SellerDetails';
import BusinessDetails from './BusinessDetails';
import PhoneVerification from './PhoneVerification';
import TermsAndConditions from './TermsAndConditions';
import PanOrVatUpload from './PanOrVatUpload';
import ChangePanOrVat from './ChangePanOrVat';
import { registrationService } from '../../services/registrationService';

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
};

export type SetRegistrationData = Dispatch<
  SetStateAction<SellerRegistrationDataType>
>;

export default function SellerRegistration() {
  const [step, setStep] = useState<number>(1);

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
    });

  function incStep() {
    if (step >= 7) return;
    setStep((prev) => prev + 1);
  }

  function decStep() {
    if (step <= 1) return;
    setStep((prev) => prev - 1);
  }

  function submitRegistrationData() {
    const formData = new FormData();

    formData.append('first_name', registrationData.first_name);
    formData.append('last_name', registrationData.last_name);
    formData.append('pan_number', registrationData.pan_number);
    formData.append('password', registrationData.password);
    formData.append('email', registrationData.email);
    formData.append('business_name', registrationData.business_name);
    formData.append('pan_image', registrationData.pan_image!);
    formData.append(
      'confirm_terms_and_conditions',
      registrationData.confirm_terms_and_conditions ? '1' : '0'
    );
    formData.append(
      'receive_updates_on_whatsapp',
      registrationData.receive_updates_on_whatsapp ? '1' : '0'
    );

    registrationService(formData)
      .then((res) => console.log(res))
      .then((err) => console.log(err));
  }

  return (
    <div className="bg-gray-150 h-screen w-full overflow-hidden flex justify-center items-center">
      <div className="relative bg-white xxl:h-3/5 xxl:w-1/4 xl:h-3/5 xl:w-1/3 lg:h=3/5 lg:w-1/3 md:h-3/5 md:w-1/2 sm:h-3/5 sm:w-2/3 xs:h-full xs:w-full xxs:h-full xxs:">
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
          <BusinessDetails
            setRegistrationData={setRegistrationData}
            incStep={incStep}
            registrationData={registrationData}
            decStep={decStep}
          />
        ) : step === 4 ? (
          <PhoneVerification
            setRegistrationData={setRegistrationData}
            incStep={incStep}
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
            setRegistrationData={setRegistrationData}
            registrationData={registrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : step == 7 ? (
          <TermsAndConditions
            setRegistrationData={setRegistrationData}
            registrationData={registrationData}
            submitRegistrationData={submitRegistrationData}
            incStep={incStep}
            decStep={decStep}
          />
        ) : null}
      </div>
    </div>
  );
}
