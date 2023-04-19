import Image from 'next/image';
import registerPhoneNumber from '/public/images/register_phone_number.svg';
import antMobile from '/public/images/ant_mobile.svg';
import Button from '../common/Button';
import useFormValidation from '../../hooks/useFormValidation';
import {
  PhoneNumberType,
  phoneSchema,
} from '../../validation/sellerRegistrationSchema';
import TextInput from '../common/TextInput';
import ErrorMessage from '../common/ErrorMessage';
import Link from 'next/link';
import type {
  SellerRegistrationDataType,
  SetRegistrationData,
} from './SellerRegistration';
import { phoneVerificationService } from '../../services/phoneVerificationService';
import { useEffect, useState } from 'react';

type PhoneValidationProps = {
  setRegistrationData: SetRegistrationData;
  registrationData: SellerRegistrationDataType;
  incStep: () => void;
};

export default function PhoneValidation(props: PhoneValidationProps) {
  const { setRegistrationData, incStep, registrationData } = props;

  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors, setError, setValue } =
    useFormValidation(phoneSchema);

  useEffect(() => {
    setValue('phone', registrationData.phone);
  }, []);

  function handleFormSubmit(data: PhoneNumberType) {
    setIsLoading(true);
    phoneVerificationService(data)
      .then((res) => {
        if (res.status === 'success') {
          setIsLoading(false);
          setRegistrationData((prev) => {
            return {
              ...prev,
              ...data,
            };
          });
          incStep();
          return;
        }

        if (res.status === 'error') {
          setError('phone', { message: 'Phone number is already registered.' });
          setIsLoading(false);
        }
      })
      .catch((err) => {
        console.log(err);
        setError('phone', {
          type: 'custom',
          message: 'Network Error. Check if your internet is working properly',
        });
        setIsLoading(false);
      });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col px-10 pt-10 pb-5 items-around justify-center text-black h-full w-full"
    >
      <Image
        src={registerPhoneNumber}
        alt="Register Phone Number Illustration"
      />
      <div className="flex flex-col items-center justify-center">
        <h1 className="text-md font-bold text-black2">
          Enter your Mobile Number
        </h1>
        <p className="text-sm p-6 text-gray-850 text-center">
          Enter your 10-digit mobile number to receive the verification code.
        </p>
      </div>

      <div className="flex flex-col justify-center items-center">
        <div className="w-full">
          <div className="relative">
            <div
              className={`absolute inset-y-0 left-0 flex text-gray-875 items-center pl-3 mr-3`}
            >
              <Image src={antMobile} alt="Ant Mobile Icon" />
              <span className="text-gray-875">+977</span>
            </div>

            <TextInput
              className="pl-20"
              type='number'
              {...register('phone')}
              error={errors.hasOwnProperty('phone')}
            />
          </div>
          <ErrorMessage message={errors?.phone?.message as string} />
        </div>

        <p className="text-sm py-6 text-gray-850">
          By Clicking &quot;Continue&quot;, you agree to Hajurbuwa.com&apos;s
          <Link href="/terms-conditions" className="text-accent-tertiary">
            <a className="text-accent-primary">{` Terms of Service `}</a>
          </Link>
          and
          <Link href="/terms-conditions" className="text-accent-tertiary">
            <a className="text-accent-primary">{` Privacy Policy `}</a>
          </Link>
          .
        </p>
        <Button type="submit" onSubmit={handleSubmit(handleFormSubmit)}>
          {isLoading ? 'Loading...' : 'Continue'}
        </Button>
      </div>
    </form>
  );
}
