import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import InputLabel from '../common/InputLabel';
import TextInputField from '../common/TextInput';
import Info from '../../../public/icons/info.svg';
import RightIcon from '../../../public/icons/chevron-right.svg';
import useFormValidation from '../../hooks/useFormValidation';
import { ProductGeneralInfoSchema } from '../../validation/productListingSchema';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import DiscardModal from './DiscardModal';

export default function GeneralInformation(props: any) {
  const { productDetails, incStep, defaultValues, setProductDetails } = props;

  const { errors, register, setValue, handleSubmit, getValues } =
    useFormValidation(ProductGeneralInfoSchema);

  const [brandValidation, setBrandValidation] = useState({
    isValid: true,
    message: '',
  });

  useEffect(() => {
    setValue('product_name', productDetails?.product_name);
    setValue('product_type', productDetails?.category_id);
    setValue('brand', productDetails?.brand);
    setValue('unit', productDetails?.unit);
    setValue('minimum_order', productDetails?.minimum_order);
  }, [productDetails]);

  function handleBrandChange(e: React.ChangeEvent<HTMLSelectElement>) {
    setProductDetails((prev: any) => {
      return {
        ...prev,
        brand: e.target.value,
      };
    });

    setBrandValidation({
      isValid: true,
      message: '',
    });
  }

  function handleFormSubmit(data: any) {
    if (productDetails.brand === '') {
      setBrandValidation({
        isValid: false,
        message: 'Please select a brand',
      });

      return;
    }

    setProductDetails((prev: any) => {
      return {
        ...prev,
        ...data,
      };
    });

    incStep();
  }

  return (
    <div className="px-8 py-2 space-y-5">
      <div className="flex items-center space-x-3">
        <Image src={Info} alt="" />
        <p>Fields with asterisks* should be filled.</p>
      </div>
      <form
        onSubmit={handleSubmit(handleFormSubmit)}
        className="flex flex-col space-y-5"
      >
        <div className="flex space-x-5">
          <div className="w-[165px]">
            <InputLabel label="Product Name" required htmlFor="product_name" />
          </div>
          <div className="w-full flex flex-col">
            <TextInputField
              id="product_name"
              error={errors.hasOwnProperty('product_name')}
              {...register('product_name')}
            />
            <ErrorMessage message={errors?.product_name?.message as string} />
          </div>
        </div>
        <div className="flex space-x-5">
          <div className="w-[165px]">
            <InputLabel
              label="Select a product type"
              required
              htmlFor="category_id"
            />
          </div>
          <div className="w-full  space-y-3">
            <div>
              <TextInputField
                error={errors.hasOwnProperty('category_id')}
                id="category_id"
                {...register('category_id')}
              />
              <ErrorMessage message={errors?.category_id?.message as string} />
            </div>
            <p>OR</p>
            <div className="h-72 border border-gray-500 divide-y divide-gray-500">
              <p className="px-4 py-1">Select a category</p>
              <div className="h-64 overflow-y-auto divide-y divide-gray-500">
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
            <InputLabel label="Brand Specification" required />
          </div>
          <div className="w-full">
            <select
              onChange={handleBrandChange}
              className="w-full h-10 outline-none border border-gray-600 rounded cursor-pointer"
            >
              <option value="">Select Brand</option>
              {defaultValues?.brands?.map((brand: any) => (
                <option
                  key={brand.id}
                  value={brand.id}
                  selected={String(brand.id) === productDetails.brand}
                >
                  {brand?.name}
                </option>
              ))}
            </select>
            <ErrorMessage message={brandValidation.message} />
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <div className="w-96 flex items-center justify-center space-x-4">
            <DiscardModal />
            <Button type="submit" className="py-3 text-sm">
              Continue
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
