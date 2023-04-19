import { useEffect, useState } from 'react';
import { BiArrowBack } from 'react-icons/bi';
import useFormValidation from '../../hooks/useFormValidation';
import {
  checkIfEmailExist,
  emailVerificationService,
} from '../../services/emailVerificationService';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import TextInput from '../common/TextInput';
import PasswordTextInput from './PasswordTextInput';
import {
  sellerDetailsSchema,
  SellerDetailsType,
} from '../../validation/sellerRegistrationSchema';
import {
  SellerRegistrationDataType,
  SetRegistrationData,
} from './SellerRegistration';
import Spinner from '../loader/Spinner';

type SellerDetailsProps = {
  registrationData: SellerRegistrationDataType;
  setRegistrationData: SetRegistrationData;
  incStep: () => void;
  decStep: () => void;
};

export default function SellerDetails(props: SellerDetailsProps) {
  const { setRegistrationData, incStep, decStep, registrationData } = props;
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, errors, setValue, setError } =
    useFormValidation(sellerDetailsSchema);

  useEffect(() => {
    setValue('first_name', registrationData.first_name);
    setValue('last_name', registrationData.last_name);
    setValue('password', registrationData.password);
    setValue('email', registrationData.email);
  }, []);

  function handleFormValidation(data: SellerDetailsType) {
    setIsLoading(true);
    checkIfEmailExist(data.email)
      .then((res) => {
        if (
          res.status === 'error' &&
          res.message === 'Email already Registered'
        ) {
          throw new Error('Email already registered', {
            cause: {
              isAlreadyRegistered: true,
            },
          });
        }

        emailVerificationService(data.email)
          .then((res) => {
            setRegistrationData((prev) => {
              return {
                ...prev,
                ...data,
              };
            });
            console.log(res);
          })
          .then(() => incStep())
          .catch(console.log);
      })
      .catch((err) => {
        setIsLoading(false);
        setError('email', {
          type: 'custom',
          message: 'Email already registered.',
        });
        console.log(err.cause);
      });
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormValidation)}
      className="flex flex-col px-4 md:px-10 pt-10 pb-5 items-center justify-center text-black h-full w-full"
    >
      <div className="cursor-pointer" onClick={decStep}>
        <BiArrowBack className="absolute inset-0 top-0 left-0 m-2 text-3xl cursor-pointer" />
      </div>
      <div className="absolute top-0 flex flex-col items-center justify-center translate-y-1/2">
        <span className="font-bold text-lg capitalize mb-2">Seller Detail</span>
      </div>

      <div className="my-5">
        <span className="font-bold text-lg capitalize mb-2">
          Enter Your Name
        </span>
        <div className="flex ">
          <div className="flex flex-col mr-1">
            <TextInput
              className="h-14  outline-none"
              placeholder="First Name"
              {...register('first_name')}
              error={errors.hasOwnProperty('first_name')}
            />
            {errors.first_name && (
              <ErrorMessage message={errors.first_name?.message as string} />
            )}
          </div>
          <div className="flex flex-col ml-1">
            <TextInput
              className="h-14  outline-none"
              placeholder="Last Name"
              {...register('last_name')}
              error={errors.hasOwnProperty('last_name')}
            />
            {errors.last_name && (
              <ErrorMessage message={errors.last_name?.message as string} />
            )}
          </div>
        </div>
      </div>
      <div className="my-5 w-full">
        <span className="font-bold text-lg capitalize mb-2">
          Enter Your Account Password
        </span>

        <PasswordTextInput
          placeholder="Password"
          {...register('password')}
          error={errors.hasOwnProperty('password')}
        />
        {errors.password && (
          <ErrorMessage message={errors.password.message as string} />
        )}
      </div>
      <div className="my-5">
        <span className="font-bold text-lg capitalize my-3">
          Enter Your Email Address
        </span>
        <TextInput
          className="h-14  outline-none"
          placeholder="Email"
          {...register('email')}
          error={errors.hasOwnProperty('email')}
        />
        <ErrorMessage message={errors.email?.message as string} />
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
    </form>
  );
}
