import Image from 'next/image';
import { useEffect, useState } from 'react';
import businessSetup from '/public/images/business_setup.svg';
import { BiArrowBack } from 'react-icons/bi';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import useFormValidation from '../../hooks/useFormValidation';
import TextInput from '../common/TextInput';
import {
  businessDetailsSchema,
  BusinessDetailsType,
} from '../../validation/sellerRegistrationSchema';

import { checkIfPANExist } from '../../services/checkPANService';
import Spinner from '../loader/Spinner';
import {
  SellerRegistrationDataType,
  SetRegistrationData,
} from './SellerRegistration';

type BusinessDetailsProps = {
  registrationData: SellerRegistrationDataType;
  setRegistrationData: SetRegistrationData;
  incStep: () => void;
  decStep: () => void;
};

export default function BusinessDetails(props: BusinessDetailsProps) {
  const { setRegistrationData, incStep, decStep, registrationData } = props;

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors, setValue, setError } =
    useFormValidation(businessDetailsSchema);

  useEffect(() => {
    setValue('company_name', registrationData.company_name);
    setValue('pan_number', registrationData.pan_number);
  }, []);

  function handleFormSubmit(data: BusinessDetailsType) {
    setIsLoading(true);

    checkIfPANExist(
      data.pan_number,
      `${registrationData.first_name} ${registrationData.last_name}`
    )
      .then((res) => {
        console.log(res);
        if (
          res.status === 'error' &&
          res?.message === 'Pan number already exits.'
        ) {
          setError('pan_number', {
            type: 'custom',
            message: 'PAN number already registered.',
          });

          setIsLoading(false);
        }

        if (res.status === 'success') {
          console.log(res);
          setRegistrationData((prev) => {
            return {
              ...prev,
              ...data,
            };
          });
          incStep();
        }
      })
      .catch((err) => {
        setError('pan_number', {
          message: 'Network Error! Please check your network connection',
        });
        setIsLoading(false);
        console.log(err);
      });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col pt-5 px-2 md:px-5 lg:px-10 pb-5 items-center justify-center text-black h-full w-full"
    >
      <div className="cursor-pointer" onClick={decStep}>
        <BiArrowBack className="absolute inset-0 top-0 left-0 m-2 text-3xl cursor-pointer" />
      </div>
      <div className="flex flex-col px-5 md:px-10 pt-0 items-center justify-center w-full">
        <Image src={businessSetup} alt="Business Setup Illustration" />
        <div className="justify-start">
          <div className="my-3 flex justify-start">
            <span className="font-bold text-left text-md capitalize mt-1">
              {registrationData.first_name}, Let&apos;s Setup your Profile
            </span>
          </div>
          <div className="mb-5 flex items-start">
            <span className="text-left text-sm capitalize my-1 ">
              Enter your business details here
            </span>
          </div>
        </div>
        <div className="flex flex-col w-full my-2">
          <TextInput
            className="h-14 outline-none"
            placeholder="Business Name"
            {...register('company_name')}
            error={errors.hasOwnProperty('company_name')}
          />
          <ErrorMessage message={errors.company_name?.message as string} />
        </div>
        <div className="flex flex-col w-full my-2">
          <TextInput
            className="h-14 outline-none"
            placeholder="PAN Number"
            {...register('pan_number')}
            error={errors.hasOwnProperty('pan_number')}
          />
          <ErrorMessage message={errors.pan_number?.message as string} />
        </div>
        <Button type="submit">
          {isLoading ? (
            <div className="flex items-center justify-center space-x-2">
              <span>Please wait...</span>
              <Spinner />
            </div>
          ) : (
            'Continue'
          )}
        </Button>
      </div>
    </form>
  );
}
