import React, { useRef, useState } from 'react';
import Image from 'next/image';
import Info from '../../../public/icons/info.svg';
import AddIcon from '../../../public/icons/addIcon.svg';
import FileInput from '../common/FileInput';
import Button from '../common/Button';

type ImageObj = {
  file: File | null;
  url: string;
};

type ProductImageList = {
  eighth: ImageObj;
  first: ImageObj;
  second: ImageObj;
  third: ImageObj;
  fourth: ImageObj;
  fifth: ImageObj;
  sixth: ImageObj;
  seventh: ImageObj;
};

export default function ProductImagesAndVideos(props: any) {
  const { productDetails, currentStep, decStep, incStep } = props;

  const firsRef = useRef<HTMLInputElement>(null);

  const [coverImage, setCoverImage] = useState<{ file: File | null }>({
    file: null,
  });

  const [productImages, setProductImages] = useState<ProductImageList>({
    first: {
      file: null,
      url: '',
    },
    second: {
      file: null,
      url: '',
    },
    third: {
      file: null,
      url: '',
    },
    fourth: {
      file: null,
      url: '',
    },
    fifth: {
      file: null,
      url: '',
    },
    sixth: {
      file: null,
      url: '',
    },
    seventh: {
      file: null,
      url: '',
    },
    eighth: {
      file: null,
      url: '',
    },
  });

  function handleImages(e: React.ChangeEvent<HTMLInputElement>) {
    const { id, files } = e.target;

    setProductImages({
      ...productImages,
      [id]: {
        file: files![0],
      },
    });
  }

  console.log(productImages);

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
            {coverImage.file ? (
              <Image
                width={500}
                height={500}
                src={URL.createObjectURL(coverImage?.file!)}
                alt=""
              />
            ) : null}
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 md:pl-24 lg:pl-24 gap-x-6 gap-y-5 md:gap-y-10 lg:gap-y-10">
            {productImages.first.file ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={URL.createObjectURL(productImages.first.file)}
                  alt=""
                />
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="first_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductImages({
                            ...productImages,
                            first: {
                              file: e.target.files![0],
                              url: '',
                            },
                          })
                        }
                        type="file"
                        className="hidden"
                        id="first_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setCoverImage({ file: productImages.first.file })
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

            {productImages.second.file ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={URL.createObjectURL(productImages.second.file)}
                  alt=""
                />
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="second_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductImages({
                            ...productImages,
                            second: {
                              file: e.target.files![0],
                              url: '',
                            },
                          })
                        }
                        type="file"
                        className="hidden"
                        id="second_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setCoverImage({ file: productImages.second.file })
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
            {productImages.third.file ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={URL.createObjectURL(productImages.third.file)}
                  alt=""
                />
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="third_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductImages({
                            ...productImages,
                            third: {
                              file: e.target.files![0],
                              url: '',
                            },
                          })
                        }
                        type="file"
                        className="hidden"
                        id="third_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setCoverImage({ file: productImages.third.file })
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
            {productImages.fourth.file ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={URL.createObjectURL(productImages.fourth.file!)}
                  alt=""
                />
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="fourth_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductImages({
                            ...productImages,
                            fourth: {
                              file: e.target.files![0],
                              url: '',
                            },
                          })
                        }
                        type="file"
                        className="hidden"
                        id="fourth_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setCoverImage({ file: productImages.fourth.file })
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
            {productImages.fifth.file ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={URL.createObjectURL(productImages.fifth.file!)}
                  alt=""
                />
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="fifth_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductImages({
                            ...productImages,
                            fifth: {
                              file: e.target.files![0],
                              url: '',
                            },
                          })
                        }
                        type="file"
                        className="hidden"
                        id="fifth_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setCoverImage({ file: productImages.fifth.file })
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
            {productImages.sixth.file ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={URL.createObjectURL(productImages.sixth.file!)}
                  alt=""
                />
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="sixth_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductImages({
                            ...productImages,
                            sixth: {
                              file: e.target.files![0],
                              url: '',
                            },
                          })
                        }
                        type="file"
                        className="hidden"
                        id="sixth_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setCoverImage({ file: productImages.sixth.file })
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
            {productImages.seventh.file ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={URL.createObjectURL(productImages.seventh.file!)}
                  alt=""
                />
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="seventh_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductImages({
                            ...productImages,
                            seventh: {
                              file: e.target.files![0],
                              url: '',
                            },
                          })
                        }
                        type="file"
                        className="hidden"
                        id="seventh_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setCoverImage({ file: productImages.seventh.file })
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
            {productImages.eighth.file ? (
              <div className="relative group hover:bg-opacity-50 hover:bg-black flex items-center justify-center border border-gray-300 w-36 h-36 rounded">
                <Image
                  height={200}
                  width={200}
                  src={URL.createObjectURL(productImages.eighth.file!)}
                  alt=""
                />
                <div className="absolute group-hover:opacity-100 opacity-0">
                  <div className="flex flex-col w-full h-full items-center justify-center space-y-4">
                    <label
                      htmlFor="eighth_change"
                      className="px-2 py-1 w-24 text-center bg-success-primary text-white text-sm cursor-pointer rounded"
                    >
                      <input
                        onChange={(e) =>
                          setProductImages({
                            ...productImages,
                            eighth: {
                              file: e.target.files![0],
                              url: '',
                            },
                          })
                        }
                        type="file"
                        className="hidden"
                        id="eighth_change"
                      />
                      Change
                    </label>
                    <p
                      onClick={() =>
                        setCoverImage({ file: productImages.eighth.file })
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
          <Button type="button" className="py-3 text-sm">
            Discard
          </Button>
          <Button onClick={incStep} className="py-3 text-sm">
            Continue
          </Button>
        </div>
      </div>
    </form>
  );
}
