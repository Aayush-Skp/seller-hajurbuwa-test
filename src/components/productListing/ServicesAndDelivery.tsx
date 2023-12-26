import Image from 'next/image';
import React, { useState } from 'react';
import Info from '../../../public/icons/info.svg';
import { addProduct, updateProduct } from '../../services/productService';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import TextInput from '../common/TextInput';
import DiscardModal from './DiscardModal';
import Spinner from '../loader/Spinner';
import ProductAddSuccessModal from './ProductAddSuccessModal';

export default function ServicesAndDelivery(props: any) {
  const { productDetails, setProductDetails, decStep, isUpdate } = props;

  const [packageWeightValidation, setPackageWeightValidation] = useState({
    isValid: true,
    message: '',
  });

  const [isProductAddSuccessModalOpen, setIsProductAddSuccessModalOpen] =
    useState(false);

  const [apiResponse, setApiResponse] = useState({
    isLoading: false,
    isError: false,
    errorMsg: '',
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

    setApiResponse({
      isLoading: true,
      isError: false,
      errorMsg: '',
    });

    if (isUpdate) {
      const params = new FormData();

      params.append('product_name', productDetails.product_name);
      params.append('category_id', productDetails.category_id);
      params.append('category_tree', productDetails.category_tree);
      params.append('brand', productDetails.brand);
      params.append('minimum_order', productDetails.minimum_order);
      params.append('description', productDetails.description);
      params.append('unit', productDetails.unit);
      params.append('included_items', productDetails.included_items);
      params.append('price_per_unit', productDetails.price_per_unit);
      params.append('in_stock', productDetails.in_stock);
      params.append('package_weight', productDetails.package_weight);
      params.append('cover_image', productDetails.cover_image);
      params.append('is_bulk_price', productDetails.is_bulk_price);
      params.append('featured_highlights', productDetails.featured_highlights);

      let bulkPrices = productDetails.bulk_pricing.map((price: any) => {
        return [price.quantity, price.price];
      });

      for (let i = 0; i < bulkPrices.length; i++) {
        for (let j = 0; j < bulkPrices[i].length; j++) {
          params.append(`bulk_pricing[${i}][${j}]`, bulkPrices[i][j]);
        }
      }

      for (const key in productDetails.images) {
        if (typeof productDetails.images[key] === 'object') {
          params.append(`sub_images[]`, productDetails.images[key]);
        }
        
        if (
          typeof productDetails.images[key] === 'string' &&
          productDetails.images[key] !== ''
        )
          params.append('old_sub_images[]', productDetails.images[key]);
      }

      params.append('_method', 'PUT');

      updateProduct(productDetails.productId, params)
        .then((res) => {
          setApiResponse({
            isLoading: false,
            isError: false,
            errorMsg: '',
          });

          setIsProductAddSuccessModalOpen(true);
        })
        .catch((err) => {
          setApiResponse({
            isLoading: false,
            isError: true,
            errorMsg: '',
          });
        });

      return;
    }

    addProduct(productDetails)
      .then((res) => {
        setApiResponse({
          isLoading: false,
          isError: false,
          errorMsg: '',
        });
        setIsProductAddSuccessModalOpen(true);
      })
      .catch((err) => {
        console.log(err);
        setApiResponse({
          isLoading: false,
          isError: false,
          errorMsg: '',
        });
      });
  }

  return (
    <div className="px-8 py-2 pb-[60vh] space-y-5">
      {isProductAddSuccessModalOpen ? (
        <ProductAddSuccessModal
          isUpdate={isUpdate}
          isProductAddSuccessModalOpen={isProductAddSuccessModalOpen}
          setIsProductAddSuccessModalOpen={setIsProductAddSuccessModalOpen}
        />
      ) : null}
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
            <DiscardModal />
            <Button className="py-3 text-sm" onClick={decStep}>
              Back
            </Button>
            <Button
              className={`w-full text-white px-14 py-2 bg-blue-700 rounded hover:opacity-80 transition-opacity`}
              type="submit"
            >
              {apiResponse.isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <Spinner />
                </div>
              ) : (
                'Submit'
              )}
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
}
