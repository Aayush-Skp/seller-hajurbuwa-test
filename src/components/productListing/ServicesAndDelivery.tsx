import Image from 'next/image';
import { useState } from 'react';
import { any } from 'zod';
import Info from '../../../public/icons/info.svg';
import useFormValidation from '../../hooks/useFormValidation';
import { ProductPackageWeightSchema } from '../../validation/productListingSchema';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import TextInput from '../common/TextInput';

export default function ServicesAndDelivery(props: any) {
  const { productDetails, currentStep, decStep, setProductDetails } = props;

  const { errors, register, setValue, handleSubmit, isValid } =
    useFormValidation(ProductPackageWeightSchema);

  console.log(errors);

  function handleFormSubmit(data: any) {
    setProductDetails((prev: any) => {
      return {
        ...prev,
        ...data,
      };
    });
  }

  return (
    <div className="px-8 py-2 space-y-5">
      <div className="flex items-center space-x-3">
        <Image src={Info} alt="" />
        <p>Fields with asterisks* should be filled.</p>
      </div>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <div className="flex space-x-2">
          <p>Per Package Weight*</p>
          <div>
            <div className="flex items-center w-36">
              <TextInput
                {...register('package_weight')}
                className="rounded-none"
              />
              <span className="h-10 w-10 flex items-center justify-center border border-gray-500">
                Kg
              </span>
            </div>
            <ErrorMessage message={errors.package_weight?.message as string} />
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
            <Button type="submit" className="py-3 text-sm">
              Submit
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
