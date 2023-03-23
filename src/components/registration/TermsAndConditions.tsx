import Image from 'next/image';
import termsConditions from '/public/images/terms_conditions.svg';
import { BiArrowBack } from 'react-icons/bi';
import CheckboxInput from '../common/CheckboxInput';
import InputLabel from '../common/InputLabel';
import Button from '../common/Button';
import {
  SellerRegistrationDataType,
  SetRegistrationData,
} from './SellerRegistration';
import { ChangeEvent } from 'react';

type TermsAndConditionsProps = {
  setRegistrationData: SetRegistrationData;
  registrationData: SellerRegistrationDataType;
  submitRegistrationData: () => void;
  decStep: () => void;
  incStep: () => void;
};

export default function TermsAndConditions(props: TermsAndConditionsProps) {
  const {
    decStep,
    incStep,
    registrationData,
    setRegistrationData,
    submitRegistrationData,
  } = props;
  const {
    confirm_terms_and_conditions,
    confirm_business_name,
    receive_updates_on_whatsapp,
  } = registrationData;

  function handleOnChange(e: ChangeEvent<HTMLInputElement>) {
    const { name, checked } = e.target;
    setRegistrationData((prev) => {
      return {
        ...prev,
        [name]: checked,
      };
    });
  }

  function handleConsentConfirmation() {
    if (confirm_terms_and_conditions && confirm_business_name) {
      submitRegistrationData();
    }
  }

  return (
    <div>
      <form className="flex relative flex-col pt-14 px-10 pb-5 items-center xxs:justify-center md:justify-between text-black h-full w-full">
        <div className="absolute top-0 flex flex-col items-center justify-center translate-y-1/2">
          <span className="font-bold text-md capitalize mb-2">Consent</span>
        </div>
        <div className="cursor-pointer" onClick={decStep}>
          <BiArrowBack className="absolute inset-0 top-0 left-0 m-2 text-3xl cursor-pointer" />
        </div>

        <div className="flex flex-col px-10 pt-0 items-center justify-center w-full">
          <Image
            src={termsConditions}
            alt="Terms and Conditions Illustration"
            height={194}
            width={167}
          />
          <div className="flex flex-col items-center justify-center w-full">
            <div className="flex items-start justify-start w-full">
              <CheckboxInput
                id="confirm_business_name"
                onChange={handleOnChange}
                name="confirm_business_name"
                checked={confirm_business_name}
              />
              <InputLabel
                label="You confirm that the Business name is same as registered in PAN"
                htmlFor="confirm_business_name"
              />
            </div>
            <div className="flex items-start justify-start w-full">
              <CheckboxInput
                onChange={handleOnChange}
                name="receive_updates_on_whatsapp"
                id="receive_updates_on_whatsapp"
                checked={receive_updates_on_whatsapp}
              />
              <InputLabel
                label="Receive Order and account related updates on whatsapp"
                htmlFor="receive_updates_on_whatsapp"
              />
            </div>
            <div className="flex items-start justify-start w-full">
              <CheckboxInput
                onChange={handleOnChange}
                checked={confirm_terms_and_conditions}
                name="confirm_terms_and_conditions"
                id="confirm_terms_and_conditions"
              />
              <InputLabel
                label="Click here to indicate that you have read and agree to the Terms Of Use, Privacy Policy and Product Listing Policy."
                htmlFor="confirm_terms_and_conditions"
              />
            </div>
          </div>
        </div>
        <Button
          disabled={!(confirm_terms_and_conditions && confirm_business_name)}
          onClick={handleConsentConfirmation}
        >
          Next
        </Button>
      </form>
    </div>
  );
}
