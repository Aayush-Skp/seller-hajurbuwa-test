import Image from 'next/image';
import React, { useState } from 'react';
import Info from '../../../public/icons/info.svg';
import { addProduct } from '../../services/productService';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import TextInput from '../common/TextInput';

export default function ServicesAndDelivery(props: any) {
  const { productDetails, setProductDetails, decStep } = props;

  const [packageWeightValidation, setPackageWeightValidation] = useState({
    isValid: true,
    message: '',
  });

  function handlePackageWeightChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProductDetails((prev: any) => {
      return {
        ...prev,
        package_weight: e.target.value,
      };
    });

    setPackageWeightValidation({
      isValid: true,
      message: '',
    });
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (productDetails.package_weight === '') {
      setPackageWeightValidation({
        isValid: false,
        message: 'Please enter valid weight of the package',
      });

      return;
    }
    if (
      isNaN(Number(productDetails.package_weight)) ||
      Number(productDetails.package_weight) <= 0
    ) {
      setPackageWeightValidation({
        isValid: false,
        message: 'Please enter valid weight of the package',
      });

      return;
    }

    addProduct(productDetails).then(console.log).catch(console.log);
  }

  return (
    <div className="px-8 py-2 space-y-5">
      <div className="flex items-center space-x-3">
        <Image src={Info} alt="" />
        <p>Fields with asterisks* should be filled.</p>
      </div>
      <form onSubmit={handleFormSubmit}>
        <div className="flex space-x-2">
          <p>Per Package Weight*</p>
          <div>
            <div className="flex items-center w-36">
              <TextInput
                type="number"
                aria-invalid={packageWeightValidation.isValid}
                error={!packageWeightValidation.isValid}
                className="rounded-none"
                onChange={handlePackageWeightChange}
                value={productDetails.package_weight}
              />
              <span className="h-10 w-10 flex items-center justify-center border border-gray-500">
                Kg
              </span>
            </div>
            <ErrorMessage message={packageWeightValidation?.message} />
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
