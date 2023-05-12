import Image from 'next/image';
import React, { useState } from 'react';

import imageUploadIcon from '../../public/icons/Camera_fill.png';
import cancel from '../../public/icons/cross.svg';

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
    seventh:
      'https://cdn.pixabay.com/photo/2016/12/06/09/30/blank-1886001__340.png',
    eighth: '',
  });

  function handleImageSelection(e: React.ChangeEvent<HTMLInputElement>) {
    setImages({
      ...images,
      [e.target.name]: e.target.files![0],
    });
  }

  function handleDeleteAndMakeCover(action: 'cover' | 'delete', name: string) {
    action === 'cover'
      ? setImages({
          ...images,
          [name]: '',
        })
      : setImages({
          ...images,
          [name]: '',
        });
  }

  return (
    <div className="flex space-x-4">
      {Object.entries(images)?.map((image) => (
        <div key={image[0]} className="relative">
          <div className="group relative">
            <ImageInputFieldWithPreview
              id={image[0]}
              name={image[0]}
              image={image[1]}
              onChange={handleImageSelection}
            />

            {typeof image[1] === 'object' ||
            (typeof image[1] === 'string' && image[1].length !== 0) ? (
              <div className="absolute inset-0 flex flex-col items-center justify-center text-sm space-y-2 text-white w-full h-full opacity-0 group-hover:opacity-100 group-hover:bg-opacity-30 group-hover:bg-white transition-all duration-300">
                <label
                  htmlFor={image[0]}
                  className="flex items-center justify-center bg-accent-primary w-2/3 h-8 rounded cursor-pointer"
                >
                  Change
                </label>
                <button
                  onClick={() => handleDeleteAndMakeCover('cover', image[0])}
                  className="flex items-center justify-center w-2/3 h-8 border border-accent-primary bg-white text-accent-primary rounded"
                >
                  Set as cover
                </button>
              </div>
            ) : null}
          </div>

          {typeof image[1] === 'object' ||
          (typeof image[1] === 'string' && image[1].length !== 0) ? (
            <button
              onClick={() => handleDeleteAndMakeCover('delete', image[0])}
              className="absolute -right-3 scale-75 hover:scale-95 transition-transform duration-300 top-0 border flex items-center justify-center w-[30px] h-[30px] bg-white rounded-full"
            >
              <Image src={cancel} alt="" />
            </button>
          ) : null}
        </div>
      ))}
    </div>
  );
}

function ImageInputFieldWithPreview(props: any) {
  const { name, id, image, onChange } = props;

  const isImageValidFile = image && typeof image === 'object';
  const isImageValidLink = typeof image === 'string' && image.length !== 0;

  return (
    <label
      htmlFor={name}
      className={`group flex items-center justify-center w-[150px] h-[136px] bg-white shadow-xl ${
        !isImageValidFile ? 'cursor-pointer' : ''
      } `}
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
          isImageValidFile
            ? URL.createObjectURL(image as File)
            : isImageValidLink
            ? image
            : imageUploadIcon
        }
        alt="image"
        className="group-hover:scale-110 transition-transform duration-300"
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
