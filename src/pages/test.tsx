import Image from 'next/image';
import React, { useState } from 'react';

import imageUploadIcon from '../../public/icons/Camera_fill.png';

type Images = {
  first: string | File;
  second: string | File;
  third: string | File;
  fourth: string | File;
  fifth: string | File;
  sixth: string | File;
  seventh: string | File;
  eighth: string | File;
};

export default function Test() {
  const [images, setImages] = useState<Images>({
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: '',
    sixth: '',
    seventh: '',
    eighth: '',
  });

  function handleImageSelection(e: React.ChangeEvent<HTMLInputElement>) {
    console.log(e.target.files);

    setImages({
      ...images,
      [e.target.name]: e.target.files![0],
    });
  }

  return (
    <div className="flex space-x-4">
      {Object.entries(images)?.map((image) => (
        <div key={image[0]} className="group relative">
          <ImageInputFieldWithPreview
            id={image[0]}
            name={image[0]}
            image={image[1]}
            onChange={handleImageSelection}
          />
          {typeof image[1] === 'object' ? (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-sm space-y-2 text-white w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <label
                htmlFor={image[0]}
                className="bg-accent-primary cursor-pointer"
              >
                Change
              </label>
              <span className="cursor-pointer">Delete</span>
            </div>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ImageInputFieldWithPreview(props: any) {
  const { name, id, image, onChange } = props;

  const isImageValid = image && typeof image === 'object';

  return (
    <label
      htmlFor={name}
      className={`${
        !isImageValid ? 'cursor-pointer' : ''
      } flex items-center justify-center w-[150px] h-[136px] bg-white shadow-xl`}
    >
      <Image
        layout={
          typeof image === 'object' ||
          (typeof image === 'string' && image.length !== 0)
            ? 'fill'
            : undefined
        }
        objectFit={
          typeof image === 'object' ||
          (typeof image === 'string' && image.length !== 0)
            ? 'contain'
            : undefined
        }
        src={
          isImageValid ? URL.createObjectURL(image as File) : imageUploadIcon
        }
        alt="image"
      />
      <input
        id={id}
        type="file"
        name={name}
        className="hidden"
        onChange={(e) => {
          e.target?.files?.length !== 0 && onChange(e);
        }}
      />
    </label>
  );
}
