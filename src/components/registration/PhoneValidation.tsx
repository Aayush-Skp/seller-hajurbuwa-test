import Image from 'next/image';
import registerPhoneNumber from '/public/images/register_phone_number.svg';
import antMobile from '/public/images/ant_mobile.svg';
import { BiArrowBack } from 'react-icons/bi';
import { useRouter } from 'next/router';
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
import { useEffect } from 'react';

type PhoneValidationProps = {
  setRegistrationData: SetRegistrationData;
  registrationData: SellerRegistrationDataType;
  incStep: () => void;
};

export default function PhoneValidation(props: PhoneValidationProps) {
  const { setRegistrationData, incStep, registrationData } = props;

  const { register, handleSubmit, errors, setError, isValid, setValue } =
    useFormValidation(phoneSchema);

  useEffect(() => {
    setValue('phone', registrationData.phone);
  }, []);

  function handleFormSubmit(data: PhoneNumberType) {
    phoneVerificationService(data)
      .then((res) => {
        if (res === 'success') {
          setRegistrationData((prev) => {
            return {
              ...prev,
              ...data,
            };
          });
          incStep();
          return;
        }

        setError('phone', {
          type: 'custom',
          message: 'Phone number that you have entered already exists.',
        });
      })
      .catch((err) => {
        console.log(err);
        setError('phone', {
          type: 'custom',
          message: 'Network Error. Check if your internet is working properly',
        });
      });
  }

  const router = useRouter();
  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="flex flex-col md:px-10 sm:px-0 pt-10 pb-5 items-around justify-center text-black h-full w-full"
    >
      <div className="cursor-pointer" onClick={() => router.push('/')}>
        <BiArrowBack className="absolute inset-0 top-0 left-0 m-2 text-3xl cursor-pointer" />
      </div>
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

      <div className="flex flex-col items-center justify-center">
        <div className="relative">
          <div
            className={`absolute inset-y-0 left-0 flex text-gray-875 items-center pl-3 mr-3`}
          >
            <Image src={antMobile} alt="Ant Mobile Icon" />
            <span className="text-gray-875">+977</span>
          </div>

          <TextInput className="pl-20" {...register('phone')} />
        </div>
        {errors.phone?.message ? (
          <ErrorMessage message={errors.phone.message as string} />
        ) : (
          ''
        )}
        <p className="text-sm p-6 px-10 text-gray-850 text-center">
          By Clicking &quot;Continue&quot;, you agree to Hajurbuwa.com&apos;s
          <Link href="/terms-conditions" className="text-accent-tertiary">
            <a className="text-accent-tertiary">{` Terms of Service `}</a>
          </Link>
          and
          <Link href="/terms-conditions" className="text-accent-tertiary">
            <a className="text-accent-tertiary">{` Privacy Policy `}</a>
          </Link>
          .
        </p>
        <Button type="submit" onSubmit={handleSubmit(handleFormSubmit)}>
          Continue
        </Button>
      </div>
    </form>
  );
}
