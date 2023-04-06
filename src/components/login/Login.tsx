import Image from 'next/image';
import hajurBuwaLogo from '../../../public/icons/hajurbuwa-logo.svg';
import { BiArrowBack } from 'react-icons/bi';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import ErrorMessage from '../common/ErrorMessage';
import Link from 'next/link';
import InputLabel from '../common/InputLabel';
import { loginService } from '../../services/loginService';
import useFormValidation from '../../hooks/useFormValidation';
import {
  LoginSchema,
  LoginSchemaType,
} from '../../validation/sellerLoginSchema';
import { useState } from 'react';
import PasswordInput from '../common/PasswordInput';

export default function Login() {
  const [isValidCredentials, setIsValidCredentials] = useState(true);
  const { register, errors, handleSubmit } = useFormValidation(LoginSchema);

  function handleFormSubmit(data: LoginSchemaType) {
    loginService(data)
      .then((res) => {
        setIsValidCredentials(true);
      })
      .catch((err) => {
        if (err.response.status === 404) setIsValidCredentials(false);
      });
  }

  return (
    <div className="bg-gray-150 h-screen w-full flex justify-center items-center">
      <div className="h-full w-full xs:h-full xs:w-full sm:h-full sm:w-full  md:w-1/2 lg:w-1/3 2xl:w-1/4 bg-white">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="px-6 py-4 w-full space-y-4 my-5"
        >
          <div className="w-full">
            <div className="cursor-pointer" onClick={() => {}}>
              <BiArrowBack className="text-3xl cursor-pointer" />
            </div>
            <div className="w-full flex justify-center">
              <Image
                src={hajurBuwaLogo}
                alt="Register Phone Number Illustration"
              />
            </div>
          </div>

          <div className="flex flex-col w-full space-y-5">
            <div className="text-gray-400">
              <div className="space-y-4">
                <div className="space-y-1">
                  <InputLabel
                    label="Email or Phone no."
                    htmlFor="emailOrPhone"
                  />
                  <TextInput
                    placeholder="user@email.com"
                    id="emailOrPhone"
                    {...register('email')}
                    error={
                      !isValidCredentials || errors.hasOwnProperty('email')
                    }
                  />
                  <ErrorMessage message={errors?.email?.message as string} />
                </div>
                <div className="space-y-1">
                  <InputLabel
                    className="text-gray-400"
                    label="Password"
                    htmlFor="password"
                  />
                  <PasswordInput
                    id="password"
                    type="password"
                    placeholder="**********"
                    error={
                      !isValidCredentials || errors.hasOwnProperty('password')
                    }
                    {...register('password')}
                  />
                  {errors.hasOwnProperty('password') ? (
                    <ErrorMessage
                      message={errors?.password?.message as string}
                    />
                  ) : !isValidCredentials ? (
                    <ErrorMessage message="Invalid email or password" />
                  ) : (
                    ''
                  )}
                </div>
              </div>
            </div>
            <div className="w-full flex justify-end">
              <Link href="/forgot-password">
                <a>Forgot Password?</a>
              </Link>
            </div>
            <div className="">
              <p className="w-full text-sm">
                By continuing you agree to Hajurbuwa.com’s
                <span className="text-accent-primary">
                  <Link href="">
                    <a> Terms of Use </a>
                  </Link>
                </span>
                and
                <span className="text-accent-primary">
                  <Link href="">
                    <a> Privacy Policy.</a>
                  </Link>
                </span>
              </p>
            </div>
            <div>
              <Button type="submit">Login</Button>
            </div>
            <div className="flex items-center space-x-4 text-sm">
              <div className="w-full h-[1px] bg-black" />
              <p className="whitespace-nowrap"> New to Hajurbuwa? </p>
              <div className="w-full h-[1px] bg-black" />
            </div>
            <button className="bg-white text-accent-primary border border-accent-primary rounded px-3 py-2">
              Register as Hajurbuwa seller
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
