import Image from 'next/image';
import { BiArrowBack } from 'react-icons/bi';

export default function ChangePanOrVat() {
  return (
    <div>
      <div className="flex relative flex-col pt-14 px-10 pb-5 items-center xxs:justify-center md:justify-center text-black h-full w-full">
        <div className="absolute top-0 flex flex-col items-center justify-center translate-y-1/2">
          <span className="font-bold text-md capitalize mb-2">
            Upload PAN/VAT Document
          </span>
        </div>
        <div className="cursor-pointer" onClick={() => {}}>
          <BiArrowBack className="absolute inset-0 top-0 left-0 m-2 text-3xl cursor-pointer" />
        </div>

        <Image
          src="/images/doc.png"
          alt="PAN card preview"
          width={220}
          height={330}
          className="max-w-full mt-4"
        />
        <button
          className="bg-brand-600 text-white rounded-sm uppercase w-3/4 h-10 mt-4"
          onClick={() => {}}
        >
          Change Picture
        </button>
        <button
          className="bg-accent-tertiary text-white rounded-sm uppercase w-3/4 h-10 my-2 mb-10"
          onClick={() => {}}
        >
          Upload Document
        </button>
      </div>
    </div>
  );
}
