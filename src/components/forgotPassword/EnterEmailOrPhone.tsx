import Image from 'next/image';
import hajurBuwaLogo from '../../../public/icons/hajurbuwa-logo.svg';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import ErrorMessage from '../common/ErrorMessage';
import InputLabel from '../common/InputLabel';
import {
  EmailSchema,
  EmailSchemaType,
} from '../../validation/forgotPasswordSchema';
import useFormValidation from '../../hooks/useFormValidation';
import { forgotPasswordService } from '../../services/forgotPasswordService';
import { useState } from 'react';
import Link from 'next/link';
import { checkIfEmailExist } from '../../services/emailVerificationService';
import { BiArrowBack } from 'react-icons/bi';
import Spinner from '../loader/Spinner';

type EnterEmailOrPasswordProps = {
  incStep: () => void;
  decStep: () => void;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
};

export default function EnterEmailOrPassword(props: EnterEmailOrPasswordProps) {
  const { incStep, setEmail } = props;

  const [apiResponse, setApiResponse] = useState({
    loading: false,
  });

  const { register, errors, handleSubmit, setError } =
    useFormValidation(EmailSchema);

  function handleFormSubmit(data: EmailSchemaType) {
    setApiResponse({
      loading: true,
    });

    setEmail(data.email);

    checkIfEmailExist(data.email)
      .then((res) => {
        if (res.status === 'error') {
          forgotPasswordService(data)
            .then((res) => {
              console.log(res);
              incStep();
            })
            .catch((err) => {
              console.log(err);
              if (err.response.status === 404) {
                setError('email', { message: 'Email does not exist' });
              }

              if (err.response.status === 500) {
                setError('email', { message: 'Internal server error' });
              }
            });
        }
        if (res === 'success') {
          setError('email', { message: 'Email not registered' });
          setApiResponse({
            loading: false,
          });
        }
      })
      .catch((err) => {
        console.log('inside here');
        console.log(err);
      });
  }

  return (
    <div className="bg-gray-150 h-screen w-full flex justify-center items-center mt-10">
      <div className="relative h-full w-full xs:h-full xs:w-full sm:h-full sm:w-full  md:w-1/2 lg:w-1/3 2xl:w-1/4 bg-white">
        <Link href="/login">
          <a>
            <BiArrowBack className="absolute inset-0 top-0 left-0 m-2 text-3xl cursor-pointer" />
          </a>
        </Link>

        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="px-6 py-4 w-full space-y-4 my-5"
        >
          <div className="w-full flex justify-center">
            <Image
              src={hajurBuwaLogo}
              alt="Register Phone Number Illustration"
            />
          </div>

          <div className="flex flex-col w-full space-y-5">
            <div className="text-gray-400">
              <div className="space-y-4 text-black">
                <div className="space-y-1">
                  <p className="text-3xl font-semibold">Password Assistance</p>
                  <p className="text-xs">
                    Enter the email address associated with your Hajurbuwa
                    account.
                  </p>
                </div>
                <div className="space-y-1">
                  <InputLabel label="Email" htmlFor="emailOrPhone" />
                  <TextInput
                    {...register('email')}
                    error={errors.hasOwnProperty('email')}
                    placeholder="user@email.com"
                    id="emailOrPhone"
                  />
                  <ErrorMessage message={errors.email?.message as string} />
                </div>
              </div>
            </div>
            <div>
              <Button type="submit" onSubmit={handleSubmit(handleFormSubmit)}>
                {apiResponse.loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <span>Please wait...</span>
                    <Spinner />
                  </div>
                ) : (
                  'Continue'
                )}
              </Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="w-full h-[1px] bg-black" />
              <p className="whitespace-nowrap">New to Hajurbuwa?</p>
              <div className="w-full h-[1px] bg-black" />
            </div>
            <Link href="/register">
              <a className="bg-white text-accent-primary border border-accent-primary text-center rounded px-3 py-2">
                Register as Hajurbuwa seller
              </a>
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
