import Image from 'next/image';
import { ChangeEvent } from 'react';
import { AiFillCheckSquare, AiFillCloseCircle } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
import { SetRegistrationData } from '.';

type PanOrVatUploadProps = {
  setRegistrationData: SetRegistrationData;
  incStep: () => void;
  decStep: () => void;
};

export default function PanOrVatUpload(props: PanOrVatUploadProps) {
  const { setRegistrationData, incStep, decStep } = props;

  function handleFileInputChange(e: ChangeEvent<HTMLInputElement>) {
    setRegistrationData((prev) => {
      return {
        ...prev,
        pan_image: e.target.files![0],
      };
    });
    incStep();
  }

  return (
    <form className="flex flex-col px-10 py-4 md:pb-5 items-center justify-around md:justify-between text-black h-full w-full space-y-4">
      <div className="w-full flex items-center space-x-14">
        <div className="flex items-center cursor-pointer" onClick={decStep}>
          <BiArrowBack className="text-3xl cursor-pointer" />
        </div>
        <p className="font-bold text-md capitalize">Upload PAN/VAT Document</p>
      </div>
      <div>
        <div className="grid grid-cols-3 gaps-3 md:gaps-1 pt-0">
          <div className="flex justify-center items-center py-1 px-1 md:px-0 text-center row-start-1 col-start-1">
            <Image
              src="/images/docCorrect.png"
              alt="Document Sample"
              width={109}
              height={145}
            />
          </div>
          <div className="flex justify-center items-center py-1 text-center text-lg row-start-2 col-start-1">
            <AiFillCheckSquare />
          </div>
          <div className="flex justify-center items-center py-1 text-center text-sm row-start-3 col-start-1">
            Correct Photo.
          </div>
          <div className="flex justify-center items-center py-1 px-1 md:px-0 text-center row-start-1 col-start-2">
            <Image
              src="/images/docBlur.png"
              alt="Document Sample"
              width={109}
              height={145}
            />
          </div>
          <div className="flex justify-center items-center py-1 text-center text-lg row-start-2 col-start-2">
            <AiFillCloseCircle />
          </div>
          <div className="flex justify-center items-center py-1 text-center text-sm row-start-3 col-start-2">
            Should not be Blur.
          </div>
          <div className="flex justify-center items-center py-1 px-1 md:px-0 text-center row-start-1 col-start-3">
            <Image
              src="/images/docHalf.png"
              alt="Document Sample"
              width={109}
              height={145}
            />
          </div>
          <div className="flex justify-center items-center py-1 text-center text-lg row-start-2 col-start-3">
            <AiFillCloseCircle />
          </div>
          <div className="flex justify-center items-center py-1 text-center text-sm row-start-3 col-start-3">
            Should Cover All 4 Corners.
          </div>
        </div>
        <div>
          <label htmlFor="panImage">
            <div className="flex flex-col items-center justify-center h-96 md:h-44 w-full border-2 border-dashed border-black rounded-md mt-10">
              <Image
                src="/images/upload.png"
                alt="Upload Icon"
                width={40}
                height={40}
              />
              <span className="text-sm text-center text-gray-875 mt-2 capitalize">
                Use High Resolution Photo for better approval chances
              </span>
              <div className="bg-blue-700 flex justify-center items-center text-white rounded-sm uppercase w-3/4 h-10 mt-4 cursor-pointer">
                Upload Document
              </div>
            </div>
          </label>
          <input
            id="panImage"
            name="panImage"
            type="file"
            accept="image/*"
            onChange={handleFileInputChange}
            className={`hidden h-full w-full`}
          />
        </div>
      </div>
    </form>
  );
}
