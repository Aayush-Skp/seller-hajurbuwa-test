import Image from 'next/image';
import { AiFillCheckSquare, AiFillCloseCircle } from 'react-icons/ai';
import { BiArrowBack } from 'react-icons/bi';
export default function PanOrVatUpload() {
  return (
    <div>
      <form className="flex flex-col px-10 xxs:pb-0 md:pb-5 items-center xxs:justify-around md:justify-between text-black h-full w-full">
        <div className="absolute top-0 flex flex-col items-center justify-center translate-y-1/2">
          <span className="font-bold text-md capitalize mb-2">
            Upload PAN/VAT Document
          </span>
        </div>
        <div className="cursor-pointer" onClick={() => {}}>
          <BiArrowBack className="absolute inset-0 top-0 left-0 m-2 text-3xl cursor-pointer" />
        </div>
        <div>
          <div className="grid grid-cols-3 xxs:gaps-3 md:gaps-1 xs:pt-0 sm:pt-0">
            {/* <div className="col flex flex-col justify-center items-center"> */}
            <div className="flex justify-center items-center py-1 xxs:px-1 md:px-0 text-center row-start-1 col-start-1">
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
            {/* </div> */}
            {/* <div className="col flex flex-col justify-center items-center"> */}
            <div className="flex justify-center items-center py-1 xxs:px-1 md:px-0 text-center row-start-1 col-start-2">
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
              Shoud not be Blur.
            </div>
            {/* </div> */}
            {/* <div className="col flex flex-col justify-center items-center"> */}
            <div className="flex justify-center items-center py-1 xxs:px-1 md:px-0 text-center row-start-1 col-start-3">
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
            {/* </div> */}
          </div>
          <div>
            <label htmlFor="panImage">
              <div className="flex flex-col items-center justify-center xxs:h-96 md:h-44 w-full border-2 border-dashed border-black rounded-md mt-10">
                <Image
                  src="/images/upload.png"
                  alt="Upload Icon"
                  width={40}
                  height={40}
                />
                <span className="text-sm text-center text-gray-875 mt-2 capitalize">
                  Use High Resolution Photo for better approval chances
                </span>
                <div className="bg-accent-tertiary flex justify-center items-center text-white rounded-sm uppercase w-3/4 h-10 mt-4">
                  Upload Document
                </div>
              </div>
            </label>
            <input
              id="panImage"
              name="panImage"
              type="file"
              accept="image/*"
              onChange={() => {}}
              className={`hidden h-full w-full`}
            />
          </div>
          {/* {errors.panImage && (
          <span className="text-red-500">{errors.panImage.message}</span>
        )} */}
        </div>
      </form>
    </div>
  );
}
