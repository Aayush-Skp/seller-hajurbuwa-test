import Image from 'next/image';
import React from 'react';
import InputLabel from '../common/InputLabel';
import TextInputField from '../common/TextInput';
import Info from '../../../public/icons/info.svg';
import RightIcon from '../../../public/icons/chevron-right.svg';

export default function GeneralInformation() {
  return (
    <div className="px-8 py-2 space-y-5">
      <div className="flex items-center space-x-3">
        <Image src={Info} alt="" />
        <p>Fields with asterisks* should be filled.</p>
      </div>
      <div className="">
        <div className="flex flex-col space-y-5">
          <div className="flex items-center space-x-5">
            <div className="w-[165px]">
              <InputLabel
                label="Product Title"
                required
                htmlFor="product_title"
              />
            </div>
            <TextInputField
              id="product_title"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </div>

          <div className="flex items-start space-x-5">
            <div className="w-[165px] mt-2">
              <InputLabel
                label="Select a product type"
                required
                htmlFor="product_category"
              />
            </div>
            <div className="w-full  space-y-3">
              <TextInputField
                id="product_category"
                onChange={(e) => {
                  console.log(e.target.value);
                }}
              />
              <p>OR</p>
              <div className="h-72 border border-gray-500 divide-y divide-gray-500">
                <p className="px-4 py-1">Select a category</p>
                <div className="h-64 overflow-y-auto divide-y divide-gray-500">
                  <div className="flex justify-between pr-5">
                    <p className="px-4 py-2">Appliances</p>
                    <Image className="cursor-pointer" src={RightIcon} alt="" />
                  </div>{' '}
                  <div className="flex justify-between pr-5">
                    <p className="px-4 py-2">Appliances</p>
                    <Image className="cursor-pointer" src={RightIcon} alt="" />
                  </div>
                  <div className="flex justify-between pr-5">
                    <p className="px-4 py-2">Appliances</p>
                    <Image className="cursor-pointer" src={RightIcon} alt="" />
                  </div>
                  <div className="flex justify-between pr-5">
                    <p className="px-4 py-2">Appliances</p>
                    <Image className="cursor-pointer" src={RightIcon} alt="" />
                  </div>{' '}
                  <div className="flex justify-between pr-5">
                    <p className="px-4 py-2">Appliances</p>
                    <Image className="cursor-pointer" src={RightIcon} alt="" />
                  </div>{' '}
                  <div className="flex justify-between pr-5">
                    <p className="px-4 py-2">Appliances</p>
                    <Image className="cursor-pointer" src={RightIcon} alt="" />
                  </div>
                  <div className="flex justify-between pr-5">
                    <p className="px-4 py-2">Appliances</p>
                    <Image className="cursor-pointer" src={RightIcon} alt="" />
                  </div>
                  <div className="flex justify-between pr-5">
                    <p className="px-4 py-2">Appliances</p>
                    <Image className="cursor-pointer" src={RightIcon} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-5">
            <div className="w-[165px]">
              <InputLabel
                label="Brand Specification"
                required
                htmlFor="product_title"
              />
            </div>
            <TextInputField
              id="product_title"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </div>

          <div className="flex items-center space-x-5">
            <div className="w-[165px]">
              <InputLabel
                label="Unit Selection"
                required
                htmlFor="product_title"
              />
            </div>
            <TextInputField
              id="product_title"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </div>
          <div className="flex items-center space-x-5">
            <div className="w-[165px]">
              <InputLabel
                label="Minimum Order"
                required
                htmlFor="product_title"
              />
            </div>
            <TextInputField
              id="product_title"
              onChange={(e) => {
                console.log(e.target.value);
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
