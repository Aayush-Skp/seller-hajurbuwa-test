import Image from 'next/image';
import termsConditions from '/public/images/terms_conditions.svg';
import { BiArrowBack } from 'react-icons/bi';
import { termsAndConditionsSchema } from '../../validation/sellerRegistrationSchema';
import useFormValidation from '../../hooks/useFormValidation';
import CheckboxInput from '../common/CheckboxInput';
import InputLabel from '../common/InputLabel';
import Button from '../common/Button';

export default function TermsAndConditions() {
  const { register, handleSubmit, errors } = useFormValidation(
    termsAndConditionsSchema
  );

  function handleFormSubmit(data: typeof termsAndConditionsSchema) {}
  console.log(errors);

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex relative flex-col pt-14 px-10 pb-5 items-center xxs:justify-center md:justify-between text-black h-full w-full"
      >
        <div className="absolute top-0 flex flex-col items-center justify-center translate-y-1/2">
          <span className="font-bold text-md capitalize mb-2">Consent</span>
        </div>
        <div className="cursor-pointer" onClick={() => {}}>
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
                {...register('confirm_business_name')}
                className="mr-2 mt-2"
                checked
              />
              <InputLabel
                label="You confirm that the Business name is same as registered in PAN"
                htmlFor="confirm_business_name"
              />
            </div>
            <div className="flex items-start justify-start w-full">
              <CheckboxInput
                id="receive_updates_on_whatsapp"
                {...register('receive_updates_on_whatsapp')}
                checked
              />
              <InputLabel
                label="You confirm that the Business name is same as registered in PAN"
                htmlFor="receive_updates_on_whatsapp"
              />
            </div>
            <div className="flex items-start justify-start w-full">
              <CheckboxInput
                id="agreed_terms_conditions"
                {...register('agreed_terms_conditions')}
                checked
              />
              <InputLabel
                label="You confirm that the Business name is same as registered in PAN"
                htmlFor="agreed_terms_conditions"
              />
            </div>
          </div>
        </div>
        <Button type="submit">Next</Button>
      </form>
    </div>
  );
}
