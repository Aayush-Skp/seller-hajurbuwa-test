import Image from 'next/image';
import hajurBuwaLogo from '../../../public/icons/hajurbuwa-logo.svg';
import Button from '../common/Button';
import TextInput from '../common/TextInput';
import ErrorMessage from '../common/ErrorMessage';
import Link from 'next/link';
import InputLabel from '../common/InputLabel';
import { loginService } from '../../services/loginService';
import useFormValidation from '../../hooks/useFormValidation';
import PasswordInput from '../common/PasswordInput';
import {
  LoginSchema,
  LoginSchemaType,
} from '../../validation/sellerLoginSchema';
import { useState } from 'react';
import { useRouter } from 'next/router';
import formBackground from '/public/images/form_background.svg';
import { BiArrowBack } from 'react-icons/bi';
import UnderReview from './UnderReview';
import Rejected from './Rejected';
import Spinner from '../loader/Spinner';
import { MdTry } from 'react-icons/md';

export default function Login() {
  const [apiResponse, setApiResponse] = useState({
    loading: false,
  });

  const [verificationStatus, setVerificationStatus] = useState('');

  const [sellerData, setSellerData] = useState<any>({ first_name: 'Bishal' });

  const router = useRouter();

  const { register, errors, handleSubmit, setError } =
    useFormValidation(LoginSchema);

  function handleFormSubmit(data: LoginSchemaType) {
    setApiResponse({
      loading: true,
    });

    loginService(data)
      .then((res) => {
        if (res.status === 'success') {
          const { user, token, seller } = res;

          const [details, location] = seller;

          const userDetails = {
            id: details?.user_id,
            first_name: user?.fname,
            last_name: user?.lname,
            email: user?.email,
            phone: user?.phone,
            business_name: details?.company_name,
            pan: details?.pan_number,
            pan_image: details?.pan_image,
            account_name: details?.account_name ?? '',
            account_number: details?.account_no ?? '',
            bank_id: details?.bank ?? '',
            state: location?.state_name ?? '',
            city: location?.city_name ?? '',
            area: location?.area_name ?? '',
            address_line1: details?.address_line_1 ?? '',
            address_line2: details?.address_line_2 ?? '',
            token,
          };

          try {
            localStorage.setItem('userDetails', JSON.stringify(userDetails));
            router.push('/dashboard');
          } catch (err) {
            console.log(err);
          }
        }
      })
      .catch((err) => {
        if (err?.response?.status === 404) {
          setError('password', { message: 'Invalid credentials' });
          setError('email', { message: '' });
          setApiResponse({
            loading: false,
          });
        }

        if (
          err?.response?.status === 401 &&
          err.response?.data?.message === 'This account is not verified yet'
        ) {
          setVerificationStatus('pending');
          setSellerData({
            first_name: 'Bishal',
          });
        }
        if (
          err?.response?.status === 401 &&
          err.response?.data?.message === 'This account is rejected'
        ) {
          setVerificationStatus('rejected');
          {
            try {
              localStorage.setItem(
                'userDetails',
                JSON.stringify(err.response.data)
              );
            } catch (err) {}
            setSellerData({
              ...err.response?.data.user,
              ...err.response?.data?.seller[0],
            });
          }
        }
      });
  }

  return (
    <div className=" h-screen flex justify-center items-center relative w-full overflow-hidden">
      <div
        className="absolute h-full w-full z-0 opacity-20"
        style={{
          backgroundImage: `url(${formBackground.src})`,
          backgroundPosition: 'bottom',
          backgroundRepeat: 'no-repeat',
          backgroundSize: 'cover',
        }}
      ></div>
      <div className="relative w-full xs:w-full sm:w-full md:w-1/2 lg:w-1/3 2xl:w-1/4 bg-white z-10 shadow-lg">
        <div className="cursor-pointer" onClick={() => router.push('/')}>
          <BiArrowBack className="absolute inset-0 top-0 left-0 m-2 text-3xl cursor-pointer" />
        </div>

        {verificationStatus === 'pending' ? (
          <div className="py-5">
            <UnderReview username={sellerData.fname} />
          </div>
        ) : verificationStatus === 'rejected' ? (
          <div className="py-5">
            <Rejected sellerData={sellerData} />
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(handleFormSubmit)}
            className="px-6 py-4 w-full space-y-4"
          >
            <div className="w-full flex justify-center">
              <Image
                src={hajurBuwaLogo}
                alt="Register Phone Number Illustration"
              />
            </div>

            <div className="flex flex-col w-full space-y-5">
              <div className="">
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
                      error={errors.hasOwnProperty('email')}
                    />
                    <ErrorMessage message={errors?.email?.message as string} />
                  </div>
                  <div className="space-y-1">
                    <InputLabel label="Password" htmlFor="password" />
                    <PasswordInput
                      id="password"
                      type="password"
                      placeholder="Enter your password"
                      error={errors.hasOwnProperty('password')}
                      {...register('password')}
                    />
                    <ErrorMessage
                      message={errors?.password?.message as string}
                    />
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
                    <Link href="https://www.hajurbuwa.com/policies/terms-of-use">
                      <a> Terms of Use </a>
                    </Link>
                  </span>
                  and
                  <span className="text-accent-primary">
                    <Link href="https://www.hajurbuwa.com/policies/privacy-policy">
                      <a> Privacy Policy.</a>
                    </Link>
                  </span>
                </p>
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
                <p className="whitespace-nowrap"> New to Hajurbuwa? </p>
                <div className="w-full h-[1px] bg-black" />
              </div>
              <Link href="/register">
                <a className="bg-white text-accent-primary border border-accent-primary rounded px-3 py-2 text-center">
                  Register as Hajurbuwa seller
                </a>
              </Link>
            </div>
          </form>
        )}
      </div>
      <div className="absolute justify-center bottom-4">
        <p className="text-black">© 2023, Hajurbuwa.com</p>
      </div>
    </div>
  );
}
