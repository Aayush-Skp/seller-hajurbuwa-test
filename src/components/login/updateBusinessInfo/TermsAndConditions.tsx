import Image from 'next/image';
import termsConditions from '/public/images/terms_conditions.svg';
import { BiArrowBack } from 'react-icons/bi';
import { ChangeEvent, useState } from 'react';
import { SellerRegistrationDataType, SetRegistrationData } from '.';
import CheckboxInput from '../../common/CheckboxInput';
import Button from '../../common/Button';
import { updatePersonalDetails } from '../../../services/profileService';
import Spinner from '../../loader/Spinner';
import Link from 'next/link';

type TermsAndConditionsProps = {
  setRegistrationData: SetRegistrationData;
  registrationData: SellerRegistrationDataType;
  decStep: () => void;
  incStep: () => void;
};

export default function TermsAndConditions(props: TermsAndConditionsProps) {
  const { decStep, incStep, registrationData, setRegistrationData } = props;

  const [apiResponse, setApiResponse] = useState({
    isLoading: false,
    isError: false,
    errorMsg: '',
  });

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

  function handleFormSubmit() {
    setApiResponse({
      ...apiResponse,
      isLoading: true,
    });

    updatePersonalDetails(registrationData)
      .then((res) => {
        incStep();
      })
      .catch((err) => {
        setApiResponse({
          isLoading: false,
          isError: true,
          errorMsg: '',
        });

        console.log(err);
      });
  }

  return (
    <div className="flex relative flex-col pt-14 px-10 pb-5 items-center justify-center md:justify-between text-black h-full w-full">
      <div className="cursor-pointer" onClick={decStep}>
        <BiArrowBack className="absolute inset-0 top-0 left-0 m-2 text-3xl cursor-pointer" />
      </div>
      <div className="absolute top-0 flex flex-col items-center justify-center translate-y-1/2">
        <span className="font-bold text-md capitalize mb-2">Consent</span>
      </div>

      <div className="flex flex-col pt-0 pb-5 items-center justify-center w-full pr-5">
        <Image
          src={termsConditions}
          alt="Terms and Conditions Illustration"
          height={194}
          width={167}
        />
        <div className="flex flex-col items-center pt-5 justify-center w-3/4 md:w-11/12">
          <div className="flex items-start justify-start w-full">
            <CheckboxInput
              id="confirm_business_name"
              name="confirm_business_name"
              onChange={handleOnChange}
              className="mr-2 mt-2"
              checked={confirm_business_name}
            />
            <label className="px-2" htmlFor="confirm_business_name">
              You confirm that the Business name is same as registered in PAN
            </label>
          </div>
          <div className="flex items-start justify-start w-full">
            <CheckboxInput
              id="receive_updates_on_whatsapp"
              name="receive_updates_on_whatsapp"
              onChange={handleOnChange}
              className="mr-2 mt-2"
              checked={receive_updates_on_whatsapp}
            />
            <label className="px-2" htmlFor="receive_updates_on_whatsapp">
              Receive Order and account related updates on whatsapp
            </label>
          </div>
          <div className="flex items-start justify-start w-full">
            <CheckboxInput
              name="confirm_terms_and_conditions"
              id="confirm_terms_and_conditions"
              onChange={handleOnChange}
              className="mr-2 mt-2"
              checked={confirm_terms_and_conditions}
            />
            <label className="px-2" htmlFor="agreed_terms_conditions">
              Click here to indicate that you have read and agree to the
              <Link href="https://www.hajurbuwa.com/policies/terms-of-use">
                <a target="_blank" className="text-accent-primary">
                  {' '}
                  Terms Of Use,
                </a>
              </Link>
              <Link href="https://www.hajurbuwa.com/policies/privacy-policy">
                <a target="_blank" className="text-accent-primary">
                  {' '}
                  Privacy Policy{' '}
                </a>
              </Link>
              and
              <Link href="https://www.hajurbuwa.com/policies/product-listing-policy">
                <a target="_blank" className="text-accent-primary">
                  {' '}
                  Product Listing Policy
                </a>
              </Link>
            </label>
          </div>
        </div>
      </div>
      <Button
        type="button"
        onClick={handleFormSubmit}
        disabled={!(confirm_terms_and_conditions && confirm_business_name)}
      >
        {apiResponse.isLoading ? (
          <div className="flex items-center justify-center space-x-2">
            <span>Please wait...</span>
            <Spinner />
          </div>
        ) : (
          'Continue'
        )}
      </Button>
    </div>
  );
}
