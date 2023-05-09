import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import InputLabel from '../common/InputLabel';
import TextInputField from '../common/TextInput';
import Info from '../../../public/icons/info.svg';
import cancelIcon from '../../../public/icons/cancel.svg';
import RightIcon from '../../../public/icons/chevron-right.svg';
import Button from '../common/Button';
import ErrorMessage from '../common/ErrorMessage';
import DiscardModal from './DiscardModal';
import {
  getCategoryListById,
  searchCategory,
} from '../../services/categoryService';
import { useClickAwayListener } from '../../hooks/useClickAwayListener';
import Spinner from '../loader/Spinner';

export default function GeneralInformation(props: any) {
  const { productDetails, incStep, defaultValues, setProductDetails } = props;

  const { isNodeVisible, nodeRef, setIsNodeVisible } = useClickAwayListener();

  const [categoryList, setCategoryList] = useState<any>([]);
  const [categoryValidation, setCategoryValidation] = useState({
    isValid: true,
    message: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const [productNameValidation, setProductNameValidation] = useState({
    isValid: true,
    message: '',
  });

  const [selectedCategoryStringFromList, setSelectedCategoryStringFromList] =
    useState<string>('');

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
    fetchCategoryList();
  }, [recentCategory]);

  function handleProductNameChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProductDetails((prev: any) => {
      return {
        ...prev,
        product_name: e.target.value,
      };
    });

    setProductNameValidation({
      isValid: true,
      message: '',
    });
  }

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
    setIsLoading(true);
    getCategoryListById(recentCategory)
      .then((res) => {
        setCategoryList(res);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.log(err);
      });
  }

  function handleSelectedCategory(category: any) {
    if (category.sub_categories.length === 0) {
      setProductDetails((prev: any) => ({
        ...prev,
        category_tree:
          selectedCategoryStringFromList === ''
            ? `${category.name}`
            : `${selectedCategoryStringFromList} > ${category.name}`,
      }));

      setSelectedCategoryStringFromList('');

      setProductDetails((prev: any) => ({
        ...prev,
        category_id: category.id,
      }));

      setRecentCategory(null);
      setCategoryKeyword('');
      setCategorySearchList([]);
      setCategoryValidation({
        isValid: true,
        message: '',
      });
    } else {
      setSelectedCategoryStringFromList(
        selectedCategoryStringFromList === ''
          ? `${category.name}`
          : `${selectedCategoryStringFromList} > ${category.name}`
      );
      setCategoryValidation({
        isValid: true,
        message: '',
      });

      category?.sub_categories?.length !== 0 && setRecentCategory(category.id);
    }
  }

  function handleCategorySearch(e: React.ChangeEvent<HTMLInputElement>) {
    setIsNodeVisible(false);
    setCategoryKeyword(e.target.value);

    e.target.value !== '' &&
      searchCategory(e.target.value)
        .then((res) => {
          setCategorySearchList(res);
          res.length !== 0 && setIsNodeVisible(true);
        })
        .catch((err) => {
          console.log(err);
        });
  }

  function handleFormSubmit() {
    if (productDetails.product_name === '') {
      setProductNameValidation({
        isValid: false,
        message: 'Please enter product name',
      });

      return;
    }

    if (productDetails.brand === '') {
      setBrandValidation({
        isValid: false,
        message: 'Please select a brand',
      });

      return;
    }

    if (productDetails.category_id === null) {
      setCategoryValidation({
        isValid: false,
        message: 'Please select a category',
      });

      return;
    }

    setProductDetails((prev: any) => {
      return {
        ...prev,
        category_id: prev?.category_id ?? recentCategory,
      };
    });

    incStep();
  }

  return (
    <div className="px-8 space-y-5">
      <div className="flex items-center space-x-3">
        <Image src={Info} alt="" />
        <p>Fields with asterisks* should be filled.</p>
      </div>
      <div className="flex flex-col space-y-5">
        <div className="flex space-x-5">
          <div className="w-[165px]">
            <InputLabel label="Product Name" required htmlFor="product_name" />
          </div>
          <div className="w-full flex flex-col">
            <TextInputField
              id="product_name"
              error={!productNameValidation.isValid}
              onChange={handleProductNameChange}
              value={productDetails.product_name}
            />
            <ErrorMessage message={productNameValidation.message} />
          </div>
        </div>
        <div className="flex items-center space-x-5">
          <div className="w-[165px]">
            <InputLabel label="Brand Specification" required />
          </div>
          <div className="w-full">
            <select
              onChange={handleBrandChange}
              className={`w-full h-10 outline-none border ${
                !brandValidation.isValid
                  ? 'border-error-primary'
                  : 'border-gray-600'
              } rounded cursor-pointer`}
            >
              <option value="">Select a Brand</option>
              {defaultValues?.brands?.map((brand: any) => (
                <option
                  key={brand.id}
                  value={brand.id}
                  selected={`${brand.id}` === productDetails.brand}
                >
                  {brand?.name}
                </option>
              ))}
            </select>
            <ErrorMessage message={brandValidation.message} />
          </div>
        </div>
        <div className="flex">
          <div className="w-[190px]">
            <InputLabel label="Selected Category" />
          </div>
          <div className="w-full space-y-3">
            <div className="flex items-center space-x-2">
              {productDetails?.category_tree !== '' ? (
                <div className="flex items-center space-x-2">
                  <span className="">{productDetails?.category_tree}</span>
                  <button
                    onClick={() => {
                      setProductDetails((prev: any) => ({
                        ...prev,
                        category_tree: '',
                      }));
                      setProductDetails((prev: any) => ({
                        ...prev,
                        category_id: null,
                      }));
                    }}
                    className="w-6 flex items-center"
                  >
                    <Image src={cancelIcon} alt="" />
                  </button>
                </div>
              ) : (
                <span
                  className={`italic ${
                    !categoryValidation.isValid
                      ? 'text-error-primary'
                      : 'text-gray-500'
                  }`}
                >
                  Select a suitable category for your product
                </span>
              )}
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
                    value={categoryKeyword}
                    onChange={handleCategorySearch}
                  />
                  {isNodeVisible ? (
                    <ul className="absolute z-20 h-56 overflow-y-auto bg-white px-5 py-3 whitespace-nowrap space-y-2 shadow-2xl rounded">
                      {categorySearchList?.map((item: any, idx: number) => (
                        <li
                          className="cursor-pointer hover:scale-105 transition-transform text-sm space-x-2"
                          key={item.id}
                          onClick={() => {
                            setSelectedCategoryStringFromList('');
                            setRecentCategory(null);
                            setProductDetails((prev: any) => ({
                              ...prev,
                              category_tree: categorySearchList[idx]?.tree_name,
                            }));
                            setProductDetails((prev: any) => {
                              return {
                                ...prev,
                                category_id: item.id,
                              };
                            });
                          }}
                        >
                          <span>{item.tree_name}</span>
                          <button className="border border-accent-primary rounded px-6 py-1 mr-2">
                            Select
                          </button>
                          <hr />
                        </li>
                      ))}
                    </ul>
                  ) : null}
                </div>
                {/* <div className="w-36">
                  <Button onClick={handleCategorySearch}>Search</Button>
                </div> */}
              </div>
              <span className="block">OR</span>
              <div className="absolute block left-52 bottom-[107px]">
                <InputLabel label="Select a Category" required />
              </div>
              <div
                className={`h-56 border border-gray-500 divide-y divide-gray-500
               ${
                 productDetails?.category_tree !== ''
                   ? 'text-gray-500'
                   : 'text-black'
               } }`}
              >
                <p className="px-4 py-1">
                  {selectedCategoryStringFromList !== '' ? (
                    <div className="flex items-center space-x-2">
                      <span>{selectedCategoryStringFromList}</span>
                      <button
                        onClick={() => {
                          setSelectedCategoryStringFromList('');
                          setRecentCategory(null);
                        }}
                        className="w-6 flex items-center"
                      >
                        <Image src={cancelIcon} alt="" />
                      </button>
                    </div>
                  ) : (
                    'Select a category'
                  )}
                </p>
                {!isLoading ? (
                  <ul
                    className={`${
                      categoryList.length > 4 ? 'overflow-y-auto' : ''
                    } h-44 divide-y divide-gray-500`}
                  >
                    {categoryList?.map((category: any) => (
                      <li key={category.id}>
                        <button
                          type="button"
                          disabled={productDetails?.category_tree !== ''}
                          onClick={() => handleSelectedCategory(category)}
                          className={`flex justify-between items-center w-full ${
                            productDetails?.category_tree !== ''
                              ? 'cursor-not-allowed'
                              : ''
                          }`}
                        >
                          <span className="pl-4 py-2">{category.name}</span>
                          {category?.sub_categories?.length === 0 ? (
                            <button className="border border-accent-primary rounded px-6 py-1 mr-2">
                              Select
                            </button>
                          ) : (
                            <div className="flex items-center justify-center cursor-pointer mr-6">
                              <Image src={RightIcon} alt="" />
                            </div>
                          )}
                        </button>
                      </li>
                    ))}
                  </ul>
                ) : (
                  <div className="flex items-center justify-center h-3/4">
                    <Spinner className="w-10 h-10" />
                    <span>Fetching categories...</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end space-x-3">
          <div className="w-96 flex items-center justify-center space-x-4">
            <DiscardModal />
            <button
              onClick={handleFormSubmit}
              className={`w-full text-white px-10 py-2 bg-blue-700 rounded hover:opacity-80 transition-opacity`}
              type={'button'}
            >
              Continue
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
