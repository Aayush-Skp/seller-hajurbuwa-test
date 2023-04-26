import Image from 'next/image';
import { BiArrowBack } from 'react-icons/bi';
import { SellerRegistrationDataType, SetRegistrationData } from '.';

type ChangePanOrVatProps = {
  incStep: () => void;
  registrationData: SellerRegistrationDataType;
  setRegistrationData: SetRegistrationData;
  decStep: () => void;
};

export default function ChangePanOrVat(props: ChangePanOrVatProps) {
  const { registrationData, incStep, decStep, setRegistrationData } = props;

  function handlePANImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setRegistrationData((prev) => ({
      ...prev,
      pan_image: e.target.files![0],
    }));
  }

  return (
    <div>
      <div className="flex relative flex-col pt-14 px-10 pb-5 items-center xxs:justify-center md:justify-center text-black h-full w-full">
        <div className="cursor-pointer" onClick={decStep}>
          <BiArrowBack className="absolute inset-0 top-0 left-0 m-2 text-3xl cursor-pointer" />
        </div>
        <div className="absolute top-0 flex flex-col items-center justify-center translate-y-1/2">
          <span className="font-bold text-md capitalize mb-2">
            Upload PAN/VAT Document
          </span>
        </div>
        <div className="cursor-pointer" onClick={decStep}>
          <BiArrowBack className="absolute inset-0 top-0 left-0 m-2 text-3xl cursor-pointer" />
        </div>

        <Image
          src={
            typeof registrationData?.pan_image === 'object'
              ? URL.createObjectURL(registrationData?.pan_image! as File)
              : (registrationData.pan_image as string)
          }
          alt="PAN card preview"
          width={300}
          height={300}
          objectFit="cover"
        />

        <label
          className="bg-error-primary flex items-center justify-center text-white rounded-sm uppercase w-3/4 h-10 my-2 cursor-pointer"
          htmlFor="changePANImage"
        >
          <input
            onChange={handlePANImageChange}
            className="hidden"
            type="file"
            accept="image/"
            id="changePANImage"
          />
          Change Picture
        </label>
        <button
          className="bg-blue-700 text-white rounded-sm uppercase w-3/4 h-10 my-2 mb-10"
          onClick={incStep}
        >
          CONTINUE
        </button>
      </div>
    </div>
  );
}
