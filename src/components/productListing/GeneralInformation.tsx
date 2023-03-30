import Image from 'next/image';
import React, { useEffect } from 'react';
import InputLabel from '../common/InputLabel';
import TextInputField from '../common/TextInput';
import Info from '../../../public/icons/info.svg';
import RightIcon from '../../../public/icons/chevron-right.svg';
import useFormValidation from '../../hooks/useFormValidation';
import { ProductGeneralInfoSchema } from '../../validation/productListingSchema';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';

export default function GeneralInformation(props: any) {
  const {
    productDetails,
    currentStep,
    decStep,
    incStep,
    defaultValues,
    setProductDetails,
  } = props;

  const { errors, register, control, setValue, handleSubmit, isValid } =
    useFormValidation(ProductGeneralInfoSchema(defaultValues?.brands));

  function handleFormSubmit(data: any) {
    setProductDetails((prev: any) => {
      return {
        ...prev,
        ...data,
      };
    });
  }

  useEffect(() => {
    setValue('product_name', productDetails?.product_name);
    setValue('product_type', productDetails?.product_type);
    setValue('brand', productDetails?.brand);
    setValue('unit', productDetails?.unit);
    setValue('minimum_order', productDetails?.minimum_order);
  }, []);

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
              htmlFor="product_type"
            />
          </div>
          <div className="w-full  space-y-3">
            <div>
              <TextInputField
                error={errors.hasOwnProperty('product_type')}
                id="product_type"
                {...register('product_type')}
              />
              <ErrorMessage message={errors?.product_type?.message as string} />
            </div>
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
            <InputLabel label="Brand Specification" required />
          </div>
          <div className="w-full">
            <select
              {...register('brand')}
              className="w-full h-10 outline-none border border-gray-600 rounded cursor-pointer"
            >
              <option value="">Select Brand</option>
              {defaultValues?.brands?.map((brand: any) => (
                <option key={brand.id} value={brand.name}>
                  {brand?.name}
                </option>
              ))}
            </select>
            <ErrorMessage message={errors?.brand?.message as string} />
          </div>
        </div>
        {/* <div className="flex items-center space-x-5">
          <div className="w-[165px]">
            <InputLabel label="Unit Selection" required />
          </div>
          <div className="w-full">
            <select
              {...register('unit')}
              className="w-full h-10 outline-none border border-gray-600 rounded cursor-pointer"
            >
              <option value="">Select Unit</option>
              {defaultValues?.units?.map((unit: any) => (
                <option key={unit.id} value={unit.name}>
                  {unit?.name}
                </option>
              ))}
            </select>
            <ErrorMessage message={errors?.unit?.message as string} />
          </div>
        </div> */}
        {/* <div className="flex items-center space-x-5">
          <div className="w-[165px]">
            <InputLabel
              label="Minimum Order"
              required
              htmlFor="minimum_order"
            />
          </div>
          <TextInputField
            id="minimum_order"
            onChange={register('minimum_order').onChange}
            ref={register('minimum_order').ref}
          />
        </div> */}
        <div className="flex justify-end space-x-3">
          <div className="w-96 flex items-center justify-center space-x-4">
            <Button type="button" className="py-3 text-sm">
              Discard
            </Button>
            <Button type="submit" className="py-3 text-sm">
              Continue
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
