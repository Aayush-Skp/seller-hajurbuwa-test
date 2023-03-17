import Image from 'next/image';
import React from 'react';
import Info from '../../../public/icons/info.svg';
import AddIcon from '../../../public/icons/addIcon.svg';
import FileInput from '../common/FileInput';

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

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 md:pl-24 lg:pl-24 gap-y-5 md:gap-y-10 lg:gap-y-10">
          <FileInput placeholder="Select a cover photo" />
          <FileInput placeholder="Select a photo" />
          <FileInput placeholder="Select a photo" />
          <FileInput placeholder="Select a photo" />
          <FileInput placeholder="Select a photo" />
          <FileInput placeholder="Select a photo" />
          <FileInput placeholder="Select a photo" />
          <FileInput placeholder="Select a photo" />
        </div>
      </div>
    </div>
  );
}
