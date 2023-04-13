import Image from 'next/image';
import Button from '../common/Button';
import { BiArrowBack } from 'react-icons/bi';
import ErrorMessage from '../common/ErrorMessage';
import hajurBuwaLogo from '../../../public/icons/hajurbuwa-logo.svg';
import InputLabel from '../common/InputLabel';
import useFormValidation from '../../hooks/useFormValidation';
import {
  MatchPasswordSchema,
  MatchPasswordSchemaType,
} from '../../validation/forgotPasswordSchema';
import { resetPassword } from '../../services/forgotPasswordService';
import PasswordTextInput from '../registration/PasswordTextInput';

type OPTVerificationProps = {
  incStep: () => void;
  decStep: () => void;
  otp: string;
};

export default function CreateNewPassword(props: OPTVerificationProps) {
  const { incStep, decStep, otp } = props;
  const { register, errors, handleSubmit } =
    useFormValidation(MatchPasswordSchema);

  function handleFormSubmit(data: MatchPasswordSchemaType) {
    resetPassword({
      ...data,
      code: otp,
    })
      .then((res) => incStep())
      .catch(console.log);
  }

  return (
    <div className="bg-gray-150 h-screen w-full flex justify-center items-center">
      <div className="h-full w-full xs:h-full xs:w-full sm:h-full sm:w-full  md:w-1/2 lg:w-1/3 2xl:w-1/4 bg-white">
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="px-6 py-4 w-full space-y-4 my-5"
        >
          <div className="w-full">
            <div className="cursor-pointer" onClick={decStep}>
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
            <div className="space-y-1">
              <span className="text-3xl tracking-wide font-semibold">
                Create New Password
              </span>
              <div className="text-xs text-black space-x-1">
                <span>Password must contain at least one</span>
                <span className="font-medium">
                  Capital Letter, Number and Special Character.
                </span>
              </div>
            </div>
            <div className="text-gray-500">
              <div className="space-y-4">
                <div className="space-y-1">
                  <InputLabel label="New Password" htmlFor="password" />
                  <PasswordTextInput
                    type="password"
                    placeholder="**********"
                    id="password"
                    {...register('password')}
                  />
                  <ErrorMessage message={errors.password?.message as string} />
                </div>
                <div className="space-y-1">
                  <InputLabel
                    label="Confirm Password"
                    htmlFor="password_confirmation"
                  />
                  <PasswordTextInput
                    type="password"
                    placeholder="**********"
                    id="password_confirmation"
                    {...register('password_confirmation')}
                  />
                  <ErrorMessage
                    message={errors.password_confirmation?.message as string}
                  />
                </div>
              </div>
            </div>
            <div>
              <Button type="submit">Continue</Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
