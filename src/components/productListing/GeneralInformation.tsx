import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import InputLabel from '../common/InputLabel';
import TextInputField from '../common/TextInput';
import Info from '../../../public/icons/info.svg';
import cancelIcon from '../../../public/icons/cancel.svg';
import RightIcon from '../../../public/icons/chevron-right.svg';
import useFormValidation from '../../hooks/useFormValidation';
import { ProductGeneralInfoSchema } from '../../validation/productListingSchema';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import DiscardModal from './DiscardModal';
import {
  getCategoryListById,
  searchCategory,
} from '../../services/categoryService';
import { useClickAwayListener } from '../../hooks/useClickAwayListener';

export default function GeneralInformation(props: any) {
  const { productDetails, incStep, defaultValues, setProductDetails } = props;

  const { errors, register, setValue, handleSubmit } = useFormValidation(
    ProductGeneralInfoSchema
  );

  const { isNodeVisible, nodeRef, setIsNodeVisible } = useClickAwayListener();

  const [categoryList, setCategoryList] = useState<any>([]);
  const [selectedCategories, setSelectedCategories] = useState<any>([]);
  const [categoryKeyword, setCategoryKeyword] = useState('');
  const [categorySearchList, setCategorySearchList] = useState<any>([]);
  const [recentCategory, setRecentCategory] = useState<string | number | null>(
    null
  );

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

  useEffect(() => {
    fetchCategoryList();
  }, [recentCategory]);

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

  function fetchCategoryList() {
    getCategoryListById(recentCategory)
      .then((res) => {
        setCategoryList(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleSelectedCategory(category: any) {
    console.log(category.id);
    setRecentCategory(category.id);
    setSelectedCategories((prev: any) => [...prev, category]);
  }

  function handleCategorySearch() {
    searchCategory(categoryKeyword)
      .then((res) => {
        setCategorySearchList(res);
        res.length !== 0 && setIsNodeVisible(true);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function clearSelectedCategories() {
    setSelectedCategories([]);
    setRecentCategory(null);
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
        <div className="flex">
          <div className="w-[190px]">
            <InputLabel label="Select a product type" required />
          </div>
          <div className="w-full space-y-3">
            <div className="flex items-center text-sm italic text-gray-500 space-x-2">
              {selectedCategories.length !== 0 ? (
                selectedCategories.map((item: any, index: number) => {
                  if (index !== selectedCategories.length - 1) {
                    return (
                      <>
                        <span key={item.id}>{item.name}</span>
                        <span className="mx-1">&gt;</span>
                      </>
                    );
                  }
                  return <span key={item.id}>{item.name}</span>;
                })
              ) : (
                <span
                  className={`text-sm ${
                    selectedCategories.length === 0
                      ? 'italic text-gray-500'
                      : ''
                  } `}
                >
                  Select a suitable category for your product
                </span>
              )}
              {selectedCategories.length !== 0 ? (
                <button
                  onClick={clearSelectedCategories}
                  className="w-6 flex items-center"
                >
                  <Image src={cancelIcon} alt="" />
                </button>
              ) : null}
            </div>
            <div className="w-full space-y-3">
              <div className="flex space-x-3">
                <div
                  onClick={() => {
                    categorySearchList.length !== 0 &&
                      setIsNodeVisible((prev) => !prev);
                  }}
                  ref={nodeRef}
                  className="relative w-full"
                >
                  <TextInputField
                    id="category_id"
                    autoComplete=""
                    value={categoryKeyword}
                    onChange={(e) => {
                      setIsNodeVisible(false);
                      setCategoryKeyword(e.target.value);
                    }}
                  />
                  {isNodeVisible ? (
                    <ul className="absolute z-20 bg-white px-5 py-3 whitespace-nowrap space-y-2 shadow-2xl rounded">
                      {categorySearchList?.map((item: any, idx: number) => (
                        <li
                          className="cursor-pointer hover:scale-105 transition-transform text-sm"
                          key={item.id}
                          onClick={() =>
                            setCategoryKeyword(
                              categorySearchList[idx]?.tree_name
                            )
                          }
                        >
                          {item.tree_name}

                          <hr />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                <div className="w-36">
                  <Button onClick={handleCategorySearch}>Search</Button>
                </div>
              </div>
              <p>OR</p>
              <div className="h-72 border border-gray-500 divide-y divide-gray-500">
                <p className="px-4 py-1">Select a category</p>
                <ul className="h-64 overflow-y-auto divide-y divide-gray-500">
                  {categoryList?.map((category: any) => (
                    <li
                      key={category.id}
                      onClick={() => handleSelectedCategory(category)}
                      className="flex justify-between items-center cursor-pointer"
                    >
                      <p className="pl-4 py-2">{category.name}</p>
                      {category?.sub_categories?.length === 0 ? (
                        <button className="border border-accent-primary rounded px-6 py-1 mr-2">
                          Select
                        </button>
                      ) : (
                        <div className="flex items-center justify-center cursor-pointer mr-6">
                          <Image src={RightIcon} alt="" />
                        </div>
                      )}
                    </li>
                  ))}
                </ul>
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
