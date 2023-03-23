import Image from 'next/image';
import businessSetup from '/public/images/business_setup.svg';
import { BiArrowBack } from 'react-icons/bi';
import Button from '../common/Button';
import useFormValidation from '../../hooks/useFormValidation';
import { businessDetailsSchema } from '../../validation/sellerRegistrationSchema';
import TextInput from '../common/TextInput';
import ErrorMessage from '../common/ErrorMessage';

export default function BusinessDetails() {
  const { register, handleSubmit, errors } = useFormValidation(
    businessDetailsSchema
  );

  function handleFormSubmit(data: typeof businessDetailsSchema) {
    console.log(data);
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col pt-5 lg:px-10 md:px-5 xxs:px-2 pb-5 items-center justify-center text-black h-full w-full"
      >
        <div className="cursor-pointer" onClick={() => {}}>
          <BiArrowBack className="absolute inset-0 top-0 left-0 m-2 text-3xl cursor-pointer" />
        </div>
        <div className="flex flex-col xxs:px-5 md:px-10 pt-0 items-center justify-center w-full">
          <Image src={businessSetup} alt="Business Setup Illustration" />
          <div className="justify-start">
            <div className="my-3 flex justify-start">
              <span className="font-bold text-left text-md capitalize mt-1">
                Pratik, Let&apos;s Setup your Profile
              </span>
            </div>
            <div className="mb-5 flex items-start">
              <span className="text-left text-sm capitalize my-1 ">
                Enter your business details here
              </span>
            </div>
          </div>
          <div className="flex flex-col w-full">
            <TextInput
              placeholder="Business Name"
              {...register('business_name')}
              error={errors.hasOwnProperty('business_name')}
            />
            {errors.business_name && (
              <ErrorMessage message={errors.business_name?.message as string} />
            )}
          </div>
          <div className="flex flex-col w-full">
            <TextInput
              placeholder="PAN Name"
              {...register('pan_number')}
              error={errors.hasOwnProperty('pan_number')}
            />
            {errors.pan_number && (
              <ErrorMessage message={errors.pan_number?.message as string} />
            )}
          </div>
          <Button type="submit">Continue</Button>
        </div>
      </form>
    </div>
  );
}
