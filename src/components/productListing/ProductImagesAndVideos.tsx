import React, { useState } from 'react';
import Image from 'next/image';
import Info from '../../../public/icons/info.svg';
import AddIcon from '../../../public/icons/addIcon.svg';
import cancelIcon from '../../../public/icons/cancel.svg';
import FileInput from '../common/FileInput';
import Button from '../common/Button';
import DiscardModal from './DiscardModal';

type ImageObj = {
  file: File | null;
  url: string;
};

export default function ProductImagesAndVideos(props: any) {
  const { productDetails, decStep, incStep, setProductDetails } = props;

  function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, files } = e.target;

    setProductDetails((prev: any) => ({
      ...prev,
      images: {
        ...prev.images,
        [id]: files![0],
      },
    }));
  }

  function handleSubmit() {
    productDetails.cover_image !== '' && incStep();
  }

  return (
    <form className="px-8 py-2 space-y-5">
      <div className="flex items-center space-x-3">
        <Image src={Info} alt="" />
        <p>Fields with asterisks* should be filled.</p>
      </div>

      <div className="w-full space-y-10">
        <div className="w-full flex items-center space-x-3">
          <p>Product Images*</p>
          <div>
            <label
              htmlFor="productPhotosInput"
              className="w-24 h-16 cursor-pointer"
            >
              <input type="file" id="productPhotosInput" className="hidden" />
              <div className="flex items-center space-x-3">
                <p className="text-blue-700 text-sm">
                  Upload multiple files here
                </p>
                <div className="flex items-center">
                  <Image src={AddIcon} alt="" />
                </div>
              </div>
            </label>
          </div>
          <p className="text-sm tracking-tight">
            Or drag and drop 1 or more files below.
          </p>
        </div>

        <div className="flex items-center">
          <div className="w-80 h-80 border border-gray-600">
            {productDetails.cover_image ? (
              <Image
                width={500}
                height={500}
                src={
                  typeof productDetails.cover_image === 'string' &&
                  productDetails.cover_image !== ''
                    ? productDetails.cover_image
                    : URL.createObjectURL(productDetails.cover_image)
                }
                alt=""
              />
            ) : null}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 md:pl-24 lg:pl-24 gap-x-6 gap-y-5 md:gap-y-10 lg:gap-y-10">
            {productDetails?.images.first ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={
                    typeof productDetails.images.first === 'string' &&
                    productDetails.images.first !== ''
                      ? productDetails.images.first
                      : URL.createObjectURL(productDetails.images.first)
                  }
                  alt=""
                />
                <button
                  type="button"
                  onClick={() =>
                    setProductDetails((prev: any) => ({
                      ...prev,
                      images: {
                        ...prev.images,
                        first: '',
                      },
                    }))
                  }
                  className="absolute -top-1 -right-1 flex items-center justify-center"
                >
                  <Image src={cancelIcon} alt="cancel icon" />
                </button>
                <div className="absolute hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="first_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductDetails((prev: any) => ({
                            ...prev,
                            images: {
                              ...prev.images,
                              first: e.target.files![0],
                            },
                          }))
                        }
                        type="file"
                        className="hidden"
                        id="first_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setProductDetails((prev: any) => ({
                          ...prev,
                          cover_image: productDetails.images.first,
                        }))
                      }
                      className="px-2 py-1 w-24 bg-accent-primary text-white text-sm cursor-pointer rounded"
                    >
                      Make Cover
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <FileInput
                id="first"
                placeholder="Select an image"
                accept=".png, .jpg, .jpeg"
                onChange={handleImages}
              />
            )}

            {productDetails?.images.second ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={
                    typeof productDetails.images.second === 'string' &&
                    productDetails.images.second !== ''
                      ? productDetails.images.second
                      : URL.createObjectURL(productDetails.images.second)
                  }
                  alt=""
                />
                <button
                  type="button"
                  onClick={() =>
                    setProductDetails((prev: any) => ({
                      ...prev,
                      images: {
                        ...prev.images,
                        second: '',
                      },
                    }))
                  }
                  className="absolute -top-1 -right-1 flex items-center justify-center"
                >
                  <Image src={cancelIcon} alt="cancel icon" />
                </button>
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="second_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductDetails((prev: any) => ({
                            ...prev,
                            images: {
                              ...prev.images,
                              second: e.target.files![0],
                            },
                          }))
                        }
                        type="file"
                        className="hidden"
                        id="second_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setProductDetails((prev: any) => ({
                          ...prev,
                          cover_image: productDetails.images.second,
                        }))
                      }
                      className="px-2 py-1 w-24 bg-accent-primary text-white text-sm cursor-pointer rounded"
                    >
                      Make Cover
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <FileInput
                id="second"
                placeholder="Select an image"
                accept=".png, .jpg, .jpeg"
                onChange={handleImages}
              />
            )}
            {productDetails?.images.third ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={
                    typeof productDetails.images.third === 'string' &&
                    productDetails.images.third !== ''
                      ? productDetails.images.third
                      : URL.createObjectURL(productDetails.images.third)
                  }
                  alt=""
                />
                <button
                  type="button"
                  onClick={() =>
                    setProductDetails((prev: any) => ({
                      ...prev,
                      images: {
                        ...prev.images,
                        third: '',
                      },
                    }))
                  }
                  className="absolute -top-1 -right-1 flex items-center justify-center"
                >
                  <Image src={cancelIcon} alt="cancel icon" />
                </button>
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="third_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductDetails((prev: any) => ({
                            ...prev,
                            images: {
                              ...prev.images,
                              third: e.target.files![0],
                            },
                          }))
                        }
                        type="file"
                        className="hidden"
                        id="third_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setProductDetails((prev: any) => ({
                          ...prev,
                          cover_image: productDetails.images.third,
                        }))
                      }
                      className="px-2 py-1 w-24 bg-accent-primary text-white text-sm cursor-pointer rounded"
                    >
                      Make Cover
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <FileInput
                id="third"
                placeholder="Select an image"
                accept=".png, .jpg, .jpeg"
                onChange={handleImages}
              />
            )}
            {productDetails?.images.fourth ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={
                    typeof productDetails.images.fourth === 'string' &&
                    productDetails.images.fourth !== ''
                      ? productDetails.images.fourth
                      : URL.createObjectURL(productDetails.images.fourth)
                  }
                  alt=""
                />
                <button
                  type="button"
                  onClick={() =>
                    setProductDetails((prev: any) => ({
                      ...prev,
                      images: {
                        ...prev.images,
                        fourth: '',
                      },
                    }))
                  }
                  className="absolute -top-1 -right-1 flex items-center justify-center"
                >
                  <Image src={cancelIcon} alt="cancel icon" />
                </button>
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="fourth_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductDetails((prev: any) => ({
                            ...prev,
                            images: {
                              ...prev.images,
                              fourth: e.target.files![0],
                            },
                          }))
                        }
                        type="file"
                        className="hidden"
                        id="fourth_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setProductDetails((prev: any) => ({
                          ...prev,
                          cover_image: productDetails.images.fourth,
                        }))
                      }
                      className="px-2 py-1 w-24 bg-accent-primary text-white text-sm cursor-pointer rounded"
                    >
                      Make Cover
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <FileInput
                id="fourth"
                placeholder="Select an image"
                accept=".png, .jpg, .jpeg"
                onChange={handleImages}
              />
            )}
            {productDetails?.images.fifth ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={
                    typeof productDetails.images.fifth === 'string' &&
                    productDetails.images.fifth !== ''
                      ? productDetails.images.fifth
                      : URL.createObjectURL(productDetails.images.fifth)
                  }
                  alt=""
                />
                <button
                  type="button"
                  onClick={() =>
                    setProductDetails((prev: any) => ({
                      ...prev,
                      images: {
                        ...prev.images,
                        fifth: '',
                      },
                    }))
                  }
                  className="absolute -top-1 -right-1 flex items-center justify-center"
                >
                  <Image src={cancelIcon} alt="cancel icon" />
                </button>
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="fifth_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductDetails((prev: any) => ({
                            ...prev,
                            images: {
                              ...prev.images,
                              fifth: e.target.files![0],
                            },
                          }))
                        }
                        type="file"
                        className="hidden"
                        id="fifth_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setProductDetails((prev: any) => ({
                          ...prev,
                          cover_image: productDetails.images.fifth,
                        }))
                      }
                      className="px-2 py-1 w-24 bg-accent-primary text-white text-sm cursor-pointer rounded"
                    >
                      Make Cover
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <FileInput
                id="fifth"
                placeholder="Select an image"
                accept=".png, .jpg, .jpeg"
                onChange={handleImages}
              />
            )}
            {productDetails?.images.sixth ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={150}
                  width={150}
                  src={
                    typeof productDetails.images.sixth === 'string' &&
                    productDetails.images.sixth !== ''
                      ? productDetails.images.sixth
                      : URL.createObjectURL(productDetails.images.sixth)
                  }
                  alt=""
                />
                <button
                  type="button"
                  onClick={() =>
                    setProductDetails((prev: any) => ({
                      ...prev,
                      images: {
                        ...prev.images,
                        sixth: '',
                      },
                    }))
                  }
                  className="absolute -top-1 -right-1 flex items-center justify-center"
                >
                  <Image src={cancelIcon} alt="cancel icon" />
                </button>
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="sixth_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductDetails((prev: any) => ({
                            ...prev,
                            images: {
                              ...prev.images,
                              sixth: e.target.files![0],
                            },
                          }))
                        }
                        type="file"
                        className="hidden"
                        id="sixth_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setProductDetails((prev: any) => ({
                          ...prev,
                          cover_image: productDetails.images.sixth,
                        }))
                      }
                      className="px-2 py-1 w-24 bg-accent-primary text-white text-sm cursor-pointer rounded"
                    >
                      Make Cover
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <FileInput
                id="sixth"
                placeholder="Select an image"
                accept=".png, .jpg, .jpeg"
                onChange={handleImages}
              />
            )}
            {productDetails?.images.seventh ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={
                    typeof productDetails.images.seventh === 'string' &&
                    productDetails.images.seventh !== ''
                      ? productDetails.images.seventh
                      : URL.createObjectURL(productDetails.images.seventh)
                  }
                  alt=""
                />
                <button
                  type="button"
                  onClick={() =>
                    setProductDetails((prev: any) => ({
                      ...prev,
                      images: {
                        ...prev.images,
                        seventh: '',
                      },
                    }))
                  }
                  className="absolute -top-1 -right-1 flex items-center justify-center"
                >
                  <Image src={cancelIcon} alt="cancel icon" />
                </button>
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="seventh_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductDetails((prev: any) => ({
                            ...prev,
                            images: {
                              ...prev.images,
                              seventh: e.target.files![0],
                            },
                          }))
                        }
                        type="file"
                        className="hidden"
                        id="seventh_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setProductDetails((prev: any) => ({
                          ...prev,
                          cover_image: productDetails.images.seventh,
                        }))
                      }
                      className="px-2 py-1 w-24 bg-accent-primary text-white text-sm cursor-pointer rounded"
                    >
                      Make Cover
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <FileInput
                id="seventh"
                placeholder="Select an image"
                accept=".png, .jpg, .jpeg"
                onChange={handleImages}
              />
            )}
            {productDetails?.images.eighth ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={
                    typeof productDetails.images.eighth === 'string' &&
                    productDetails.images.eighth !== ''
                      ? productDetails.images.eighth
                      : URL.createObjectURL(productDetails.images.eighth)
                  }
                  alt=""
                />
                <button
                  type="button"
                  onClick={() =>
                    setProductDetails((prev: any) => ({
                      ...prev,
                      images: {
                        ...prev.images,
                        eighth: '',
                      },
                    }))
                  }
                  className="absolute -top-1 -right-1 flex items-center justify-center"
                >
                  <Image src={cancelIcon} alt="cancel icon" />
                </button>
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="eighth_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductDetails((prev: any) => ({
                            ...prev,
                            images: {
                              ...prev.images,
                              eighth: e.target.files![0],
                            },
                          }))
                        }
                        type="file"
                        className="hidden"
                        id="eighth_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setProductDetails((prev: any) => ({
                          ...prev,
                          cover_image: productDetails.images.eighth,
                        }))
                      }
                      className="px-2 py-1 w-24 bg-accent-primary text-white text-sm cursor-pointer rounded"
                    >
                      Make Cover
                    </p>
                  </div>
                </div>
              </div>
            ) : (
              <FileInput
                id="eighth"
                placeholder="Select an image"
                accept=".png, .jpg, .jpeg"
                onChange={handleImages}
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex justify-end space-x-3">
        <div className="w-96 flex items-center justify-center space-x-4">
          <Button className="py-3 text-sm" onClick={decStep}>
            Back
          </Button>
          <DiscardModal />
          <Button onClick={handleSubmit} className="py-3 text-sm">
            Continue
          </Button>
        </div>
      </div>
    </form>
  );
}
