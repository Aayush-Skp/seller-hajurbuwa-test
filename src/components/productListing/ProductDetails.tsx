import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import InputLabel from '../common/InputLabel';
import TextInputField from '../common/TextInput';
import Info from '../../../public/icons/info.svg';
import deleteIcon from '../../../public/icons/delete.svg';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import useFormValidation from '../../hooks/useFormValidation';
import { ProductDetailsSchema } from '../../validation/productListingSchema';
import DiscardModal from './DiscardModal';

export default function ProductDetails(props: any) {
  const { productDetails, decStep, incStep, setProductDetails } = props;

  const { errors, register, setValue, handleSubmit } =
    useFormValidation(ProductDetailsSchema);

  const [featuredHighlights, setFeaturedHighlights] = useState(['']);
  const [featuredHighlightValidation, setFeaturedHighlightValidation] =
    useState({
      isValid: true,
      message: '',
    });

  useEffect(() => {
    setValue('included_items', productDetails.included_items);
    setValue('description', productDetails.description);
  }, []);

  function handleOnChange(
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) {
    const points = [...productDetails.featured_highlights];
    points[index] = e.target.value;
    setProductDetails((prev: any) => {
      return {
        ...prev,
        featured_highlights: points,
      };
    });
    setFeaturedHighlightValidation({
      isValid: true,
      message: '',
    });
  }

  function addFeaturedHightLight(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (productDetails.featured_highlights.length <= 4) {
        setProductDetails((prev: any) => {
          return {
            ...prev,
            featured_highlights: [...prev.featured_highlights, ''],
          };
        });
      }
    }
    return;
  }

  function removeFeaturedHightLight(index: number) {
    const filteredPoints = productDetails.featured_highlights.filter(
      (_: any, i: number) => i !== index
    );
    setProductDetails((prev: any) => {
      return {
        ...prev,
        featured_highlights: filteredPoints,
      };
    });
  }

  function validateFeaturedHighlight() {
    if (productDetails.featured_highlights.length < 3) {
      setFeaturedHighlightValidation({
        isValid: false,
        message: 'Please add at least 3 featured highlights',
      });

      return false;
    }
    return true;
  }

  function handleFormSubmit(data: any) {
    setProductDetails((prev: any) => {
      return {
        ...prev,
        ...data,
      };
    });

    if (validateFeaturedHighlight()) incStep();
  }

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="px-8 py-10 h-full space-y-5 w-full"
    >
      <div className="flex items-center space-x-3">
        <Image src={Info} alt="" />
        <p>Fields with asterisks* should be filled.</p>
      </div>
      <div className="w-full space-y-10">
        <div className="flex flex-col">
          <div className="flex space-x-2">
            <div className="w-[165px]">
              <InputLabel label="Featured Highlights" required />
            </div>
            <div className="w-full">
              <div className="border border-gray-500 p-4 rounded">
                {productDetails.featured_highlights.map(
                  (point: string, index: number) => (
                    <div
                      key={index}
                      className="flex items-center space-x-2 border-b border-gray-300"
                    >
                      <div className="w-3 h-3 bg-success-secondary rounded-full" />
                      <TextInputField
                        value={point}
                        onKeyDown={addFeaturedHightLight}
                        onChange={(e) => handleOnChange(e, index)}
                        className="outline-none focus:shadow-none border-none"
                      />
                      {index !== 0 ? (
                        <div
                          onClick={() => removeFeaturedHightLight(index)}
                          className="flex items-center cursor-pointer"
                        >
                          <Image src={deleteIcon} alt="delete icon" />
                        </div>
                      ) : null}
                    </div>
                  )
                )}
              </div>

              {!featuredHighlightValidation.isValid ? (
                <ErrorMessage message={featuredHighlightValidation.message} />
              ) : null}
            </div>
          </div>
        </div>

        <div className="flex space-x-2">
          <div className="w-[165px]">
            <InputLabel label="Description" />
          </div>
          <div className="w-full h-36">
            <textarea
              {...register('description')}
              className="w-full h-full px-4 py-2 outline-none border rounded border-gray-500"
            />
          </div>
        </div>

        <div className="flex items-center space-x-2">
          <div className="flex justify-center w-[165px] space-x-2">
            <InputLabel
              className="text-end"
              label="What’s in the Box?"
              htmlFor="included_items"
              required
            />
          </div>
          <div className="flex flex-col w-full">
            <TextInputField
              id="included_items"
              error={errors.hasOwnProperty('included_items')}
              {...register('included_items')}
            />
            <ErrorMessage message={errors.included_items?.message as string} />
          </div>
        </div>
      </div>
      <div className="flex justify-end pr-8 pb-10 space-x-3">
        <div className="w-96 flex items-center justify-center space-x-4">
          <DiscardModal />
          <Button className="py-3 text-sm" onClick={decStep}>
            Back
          </Button>
          <button
              className={`w-full text-white px-14 py-2 bg-blue-700 rounded hover:opacity-80 transition-opacity`}
              type="submit"
            >
              Continue
            </button>
        </div>
      </div>
    </form>
  );
}
