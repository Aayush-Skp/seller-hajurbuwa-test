import Image from 'next/image';
import { useEffect, useState } from 'react';
import businessSetup from '/public/images/business_setup.svg';
import { BiArrowBack } from 'react-icons/bi';
import { SellerRegistrationDataType, SetRegistrationData } from '.';
import useFormValidation from '../../../hooks/useFormValidation';
import {
  BusinessDetailsType,
  businessDetailsSchema,
} from '../../../validation/sellerRegistrationSchema';
import { checkIfPANExist } from '../../../services/checkPANService';
import TextInput from '../../common/TextInput';
import ErrorMessage from '../../common/ErrorMessage';
import Button from '../../common/Button';
import Spinner from '../../loader/Spinner';
import Link from 'next/link';

type BusinessDetailsProps = {
  registrationData: SellerRegistrationDataType;
  setRegistrationData: SetRegistrationData;
  incStep: () => void;
  decStep: () => void;
};

export default function BusinessDetails(props: any) {
  const { setRegistrationData, incStep, decStep, registrationData } = props;

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors, setValue, setError } =
    useFormValidation(businessDetailsSchema);

  useEffect(() => {
    setValue('business_name', registrationData.company_name);
    setValue('pan_number', registrationData.pan_number);
  }, [registrationData]);

  function handleFormSubmit(data: BusinessDetailsType) {
    setIsLoading(true);

    checkIfPANExist(
      data.pan_number,
      `${registrationData.first_name} ${registrationData.last_name}`
    )
      .then((res) => {
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
          setRegistrationData((prev: any) => {
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
      });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col pt-5 px-2 md:px-5 lg:px-10 pb-5 items-center justify-center text-black h-full w-full"
    >
      <Link href="/login">
        <a>
          <BiArrowBack className="absolute inset-0 top-0 left-0 m-2 text-3xl cursor-pointer" />
        </a>
      </Link>
      <div className="flex flex-col px-5 md:px-10 pt-0 items-center justify-center w-full">
        <Image src={businessSetup} alt="Business Setup Illustration" />
        <div className="justify-start">
          <div className="my-3 flex justify-start">
            <span className="font-bold text-left text-md capitalize mt-1">
              {registrationData.fname}, Let&apos;s Update your Profile
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
            {...register('business_name')}
            error={errors.hasOwnProperty('business_name')}
          />
          {errors.business_name && (
            <ErrorMessage message={errors.business_name?.message as string} />
          )}
        </div>
        <div className="flex flex-col w-full my-2">
          <TextInput
            className="h-14 outline-none"
            placeholder="PAN Number"
            {...register('pan_number')}
            error={errors.hasOwnProperty('pan_number')}
          />
          {errors.pan_number && (
            <ErrorMessage message={errors.pan_number?.message as string} />
          )}
        </div>
        <Button type="submit" onSubmit={handleSubmit(handleFormSubmit)}>
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
