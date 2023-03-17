import Image from 'next/image';
import React from 'react';
import Info from '../../../public/icons/info.svg';
import AddIcon from '../../../public/icons/addIcon.svg';
import CameraIcon from '../../../public/icons/Camera_fill.png';

export default function ProductImagesAndVideos() {
  return (
    <div className="px-8 py-2 space-y-5">
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

        <div className="grid grid-cols-4 pl-24 gap-28">
          <div className="flex flex-col justify-center max-w-max">
            <div>
              <label htmlFor="productPhotosInput1" className="cursor-pointer">
                <input
                  type="file"
                  id="productPhotosInput1"
                  className="hidden"
                />
                <div className="flex items-center">
                  <Image src={CameraIcon} alt="" />
                </div>
              </label>
            </div>
            <p className="text-center">Upload</p>
          </div>
          <div className="flex flex-col justify-center max-w-max">
            <div>
              <label htmlFor="productPhotosInput2" className="cursor-pointer">
                <input
                  type="file"
                  id="productPhotosInput2"
                  className="hidden"
                />
                <div className="flex items-center">
                  <Image src={CameraIcon} alt="" />
                </div>
              </label>
            </div>
            <p className="text-center">Upload</p>
          </div>
          <div className="flex flex-col justify-center max-w-max">
            <div>
              <label htmlFor="productPhotosInput3" className="cursor-pointer">
                <input
                  type="file"
                  id="productPhotosInput3"
                  className="hidden"
                />
                <div className="flex items-center">
                  <Image src={CameraIcon} alt="" />
                </div>
              </label>
            </div>
            <p className="text-center">Upload</p>
          </div>
          <div className="flex flex-col justify-center max-w-max">
            <div>
              <label htmlFor="productPhotosInput4" className="cursor-pointer">
                <input
                  type="file"
                  id="productPhotosInput4"
                  className="hidden"
                />
                <div className="flex items-center">
                  <Image src={CameraIcon} alt="" />
                </div>
              </label>
            </div>
            <p className="text-center">Upload</p>
          </div>
          <div className="flex flex-col justify-center max-w-max">
            <div>
              <label htmlFor="productPhotosInput5" className="cursor-pointer">
                <input
                  type="file"
                  id="productPhotosInput5"
                  className="hidden"
                />
                <div className="flex items-center">
                  <Image src={CameraIcon} alt="" />
                </div>
              </label>
            </div>
            <p className="text-center">Upload</p>
          </div>
          <div className="flex flex-col justify-center max-w-max">
            <div>
              <label htmlFor="productPhotosInput6" className="cursor-pointer">
                <input
                  type="file"
                  id="productPhotosInput6"
                  className="hidden"
                />
                <div className="flex items-center">
                  <Image src={CameraIcon} alt="" />
                </div>
              </label>
            </div>
            <p className="text-center">Upload</p>
          </div>
          <div className="flex flex-col justify-center max-w-max">
            <div>
              <label htmlFor="productPhotosInput7" className="cursor-pointer">
                <input
                  type="file"
                  id="productPhotosInput7"
                  className="hidden"
                />
                <div className="flex items-center">
                  <Image src={CameraIcon} alt="" />
                </div>
              </label>
            </div>
            <p className="text-center">Upload</p>
          </div>
          <div className="flex flex-col justify-center max-w-max">
            <div>
              <label htmlFor="productPhotosInput8" className="cursor-pointer">
                <input
                  type="file"
                  id="productPhotosInput8"
                  className="hidden"
                />
                <div className="flex items-center">
                  <Image src={CameraIcon} alt="" />
                </div>
              </label>
            </div>
            <p className="text-center">Upload</p>
          </div>
        </div>
      </div>
    </div>
  );
}
