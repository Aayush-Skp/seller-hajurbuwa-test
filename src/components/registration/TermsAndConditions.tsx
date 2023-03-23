import Image from 'next/image';
import termsConditions from '/public/images/terms_conditions.svg';
import { BiArrowBack } from 'react-icons/bi';
import { termsAndConditionsSchema } from '../../validation/sellerRegistrationSchema';
import useFormValidation from '../../hooks/useFormValidation';
import CheckboxInput from '../common/CheckboxInput';
import InputLabel from '../common/InputLabel';
import Button from '../common/Button';
import type { RegistrationProps } from './SellerRegistration';
import { ZodDefault } from 'zod';

export default function TermsAndConditions(props: RegistrationProps) {
  const { setRegistrationData, incStep, decStep } = props;
  const { register, handleSubmit, errors } = useFormValidation(
    termsAndConditionsSchema
  );

  function handleFormSubmit(data: typeof termsAndConditionsSchema) {
    setRegistrationData((prev) => {
      console.log(data);
      return {
        ...prev,
        ...data,
      };
    });
    incStep();
  }
  errors && console.log(errors);

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex relative flex-col pt-14 px-10 pb-5 items-center justify-center md:justify-between text-black h-full w-full"
    >
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
              {...register('confirm_business_name')}
              className="mr-2 mt-2"
            />
            <label className="px-2" htmlFor="confirm_business_name">
              You confirm that the Business name is same as registered in PAN
            </label>
          </div>
          <div className="flex items-start justify-start w-full">
            <CheckboxInput
              id="receive_updates_on_whatsapp"
              {...register('receive_updates_on_whatsapp')}
              className="mr-2 mt-2"
            />
            <label className="px-2" htmlFor="receive_updates_on_whatsapp">
              Receive Order and account related updates on whatsapp
            </label>
          </div>
          <div className="flex items-start justify-start w-full">
            <CheckboxInput
              id="agreed_terms_conditions"
              {...register('agreed_terms_conditions')}
              className="mr-2 mt-2"
            />
            <label className="px-2" htmlFor="agreed_terms_conditions">
              Click here to indicate that you have read and agree to the
              <a className="text-accent-primary"> Terms Of Use</a>,
              <a className="text-accent-primary"> Privacy Policy</a> and
              <a className="text-accent-primary"> Product Listing Policy</a>
            </label>
          </div>
        </div>
      </div>
      <Button type="submit">Next</Button>
    </form>
  );
}
