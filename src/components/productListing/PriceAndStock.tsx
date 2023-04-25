import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Info from '../../../public/icons/info.svg';
import deleteIcon from '../../../public/icons/delete.svg';
import useFormValidation from '../../hooks/useFormValidation';
import { ProductPriceSchema } from '../../validation/productListingSchema';
import Button from '../common/Button';
import CheckboxInput from '../common/CheckboxInput';
import ErrorMessage from '../common/ErrorMessage';
import InputLabel from '../common/InputLabel';
import RadioInput from '../common/RadioInput';
import TextInput from '../common/TextInput';
import DiscardModal from './DiscardModal';

export default function PriceAndStock(props: any) {
  const { productDetails, decStep, incStep, defaultValues, setProductDetails } =
    props;

  const [minOrderValidation, setMinOrderValidation] = useState({
    isValid: true,
    message: '',
  });

  const [unitValidation, setUnitValidation] = useState({
    isValid: true,
    message: '',
  });

  const [bulkValidation, setBulkValidation] = useState({
    isValid: true,
    message: '',
  });

  const { errors, register, setValue, handleSubmit, setError } =
    useFormValidation(ProductPriceSchema(productDetails.is_bulk_price));

  useEffect(() => {
    if (productDetails.is_bulk_price) {
      setValue('price_per_unit', '');
      setError('price_per_unit', { message: '' });
    }
  }, [productDetails.is_bulk_price]);

  useEffect(() => {
    setValue('price_per_unit', productDetails.price_per_unit);
  }, []);

  useEffect(() => {
    if (productDetails.unit === '') {
      setProductDetails((prev: any) => ({
        ...prev,
        is_bulk_price: false,
        bulk_pricing: [{ quantity: prev.minimum_order, price: 0 }],
      }));
      setUnitValidation({
        isValid: false,
        message: 'Please select a unit',
      });
    }
  }, [productDetails.unit]);

  function handleUnitChange(e: React.ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value.split(',');

    setProductDetails((prev: any) => ({
      ...prev,
      unit: value[0],
      unitName: value[1] ?? '',
    }));

    setUnitValidation({
      isValid: true,
      message: '',
    });
  }

  function addBulkPrice() {
    if (productDetails.bulk_pricing.length <= 3)
      setProductDetails((prev: any) => {
        return {
          ...prev,
          bulk_pricing: [
            ...prev.bulk_pricing,
            {
              quantity:
                prev.bulk_pricing[prev.bulk_pricing.length - 1].quantity + 1,
              price: prev.bulk_pricing[prev.bulk_pricing.length - 1].price - 1,
            },
          ],
        };
      });
  }

  function handleBulkPriceDelete(index: number) {
    const updated = productDetails.bulk_pricing.filter(
      (_: any, i: number) => i !== index
    );

    setProductDetails((prev: any) => {
      return {
        ...prev,
        bulk_pricing: updated,
      };
    });

    setBulkValidation({
      isValid: true,
      message: '',
    });
  }

  function onBulkChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { name, valueAsNumber } = e.target;

    const updated = productDetails.bulk_pricing.map((val: any, i: number) => {
      if (i === index) {
        if (name === 'quantity') val.quantity = valueAsNumber;
        if (name === 'price') val.price = valueAsNumber;
      }
      return val;
    });

    setProductDetails((prev: any) => {
      return {
        ...prev,
        bulk_pricing: updated,
      };
    });

    if (name === 'quantity' && index !== 0) {
      if (
        productDetails.bulk_pricing[index - 1].quantity >= valueAsNumber ||
        isNaN(valueAsNumber)
      ) {
        setBulkValidation({
          isValid: false,
          message: `Quantity must me greater than ${
            productDetails.bulk_pricing[index - 1].quantity
          }`,
        });
      } else {
        setBulkValidation({
          isValid: true,
          message: '',
        });
      }
    }

    if (name === 'price' && index !== 0) {
      if (
        productDetails.bulk_pricing[index - 1].price <= valueAsNumber ||
        isNaN(valueAsNumber)
      ) {
        setBulkValidation({
          isValid: false,
          message: `Price must me less than ${
            productDetails.bulk_pricing[index - 1].price
          }`,
        });
      } else {
        setBulkValidation({
          isValid: true,
          message: '',
        });
      }
    }
  }

  function handleMinimumOrderChange(e: React.ChangeEvent<HTMLInputElement>) {
    setProductDetails((prev: any) => {
      return {
        ...prev,
        minimum_order: e.target.valueAsNumber,
        bulk_pricing: [{ quantity: e.target.valueAsNumber, price: 0 }],
      };
    });
    setBulkValidation({
      isValid: true,
      message: '',
    });
    setMinOrderValidation({
      isValid: true,
      message: '',
    });
  }

  function handleIsBulkPricing() {
    if (
      productDetails.minimum_order < 1 ||
      isNaN(productDetails.minimum_order)
    ) {
      setProductDetails((prev: any) => {
        return {
          ...prev,
          is_bulk_price: false,
        };
      });

      setMinOrderValidation({
        isValid: false,
        message: 'Please add minimum order',
      });

      return;
    }

    if (productDetails.unit === '') {
      setProductDetails((prev: any) => {
        return {
          ...prev,
          is_bulk_price: false,
        };
      });
      return;
    }

    if (productDetails?.bulk_pricing?.length === 0) {
      setProductDetails((prev: any) => {
        return {
          ...prev,
          bulk_pricing: [{ quantity: prev.minimum_order, price: 0 }],
          is_bulk_price: !prev.is_bulk_price,
        };
      });
      return;
    }

    setProductDetails((prev: any) => {
      return {
        ...prev,
        is_bulk_price: !prev.is_bulk_price,
      };
    });

    setBulkValidation({
      isValid: true,
      message: '',
    });
  }

  function handleStockAvailability(e: React.ChangeEvent<HTMLInputElement>) {
    setProductDetails((prev: any) => {
      return {
        ...prev,
        in_stock: e.target.value,
      };
    });
  }

  function handleFormSubmit(data: any) {
    if (productDetails.unit === '') {
      setUnitValidation({
        isValid: false,
        message: 'Please select a unit',
      });

      return;
    }

    if (
      productDetails.minimum_order < 1 ||
      isNaN(productDetails.minimum_order)
    ) {
      setMinOrderValidation({
        isValid: false,
        message: 'Enter valid minimum order',
      });

      return;
    }

    if (productDetails.is_bulk_price) {
      if (
        isNaN(productDetails?.bulk_pricing[0]?.price) ||
        productDetails.bulk_pricing[0].price === 0
      ) {
        setBulkValidation({
          isValid: false,
          message: 'Entered price is invalid',
        });

        if (
          isNaN(productDetails.minimum_order) ||
          productDetails.minimum_order === 0
        ) {
          setMinOrderValidation({
            isValid: false,
            message: 'Enter valid minimum order',
          });
        }

        if (!bulkValidation.isValid) return;
      }
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
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="px-8 py-2 space-y-5"
    >
      <div className="flex items-center space-x-3">
        <Image src={Info} alt="" />
        <p>Fields with asterisks* should be filled.</p>
      </div>
      <div className="space-y-10 w-full">
        <div className="flex space-x-5">
          <div>
            <div className="flex space-x-2">
              <InputLabel
                className="max-w-max mt-2"
                label="Minimum Order"
                htmlFor="minimum_order"
                required
              />
              <div className="flex flex-col">
                <TextInput
                  id="minimum_order"
                  type="number"
                  min={1}
                  value={productDetails.minimum_order}
                  onChange={handleMinimumOrderChange}
                />
                <ErrorMessage message={minOrderValidation.message} />
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-5">
            <div className="">
              <InputLabel label="Unit Selection" required />
            </div>
            <div className="flex flex-col">
              <select
                onChange={handleUnitChange}
                className="w-56 h-10 outline-none border border-gray-600 rounded cursor-pointer"
              >
                <option value="">Select Unit</option>
                {defaultValues?.units?.map((unit: any) => (
                  <option
                    key={unit.id}
                    value={`${unit.id},${unit.name}`}
                    selected={unit.name === productDetails.unitName}
                  >
                    {unit?.name}
                  </option>
                ))}
              </select>
              <ErrorMessage message={unitValidation.message} />
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className="w-[6.5rem]">
            <InputLabel
              className=""
              label="Price"
              htmlFor="price_per_unit"
              required
            />
          </div>
          <div>
            <div className="flex items-center">
              <span className="flex items-center px-1 h-10 border border-gray-600 rounded-l">
                NPR
              </span>
              <input
                disabled={productDetails.is_bulk_price}
                id="price_per_unit"
                className={`h-10 pl-3 border border-gray-600 rounded-r outline-none ${
                  productDetails.is_bulk_price
                    ? 'cursor-not-allowed'
                    : 'cursor-pointer'
                }`}
                {...register('price_per_unit')}
              />
            </div>
            <ErrorMessage message={errors?.price_per_unit?.message as string} />
          </div>
        </div>

        <div className="flex flex-col space-y-2">
          <div className="flex max-w-max justify-center items-center space-x-2">
            <InputLabel
              htmlFor="bulk_price"
              label="Click here to add bulk pricing "
            />
            <CheckboxInput
              onChange={handleIsBulkPricing}
              checked={productDetails.is_bulk_price}
              id="bulk_price"
            />
          </div>
          {productDetails.is_bulk_price ? (
            <div className="w-[500px] space-y-2">
              <div className="border border-gray-600">
                <div className="flex items-center justify-between bg-accent-primary py-2 px-8 text-white">
                  <p className="">Quantity</p>
                  <p>Price Per {productDetails.unitName}</p>
                </div>
                {productDetails?.bulk_pricing?.map((price: any, i: number) => (
                  <div
                    key={i}
                    className="relative flex justify-between px-2 py-2"
                  >
                    <div className="flex space-x-3">
                      <input
                        value={price.quantity}
                        name="quantity"
                        type="number"
                        disabled={i === 0}
                        min={1}
                        onChange={(e) => onBulkChange(e, i)}
                        className="outline-none border border-gray-600 h-8 w-36 px-3"
                      />
                      <span className="flex items-center">
                        +{productDetails.unitName}s
                      </span>
                    </div>
                    <div className="flex space-x-3">
                      <span className="flex items-center">NPR</span>
                      <input
                        value={price.price}
                        type="number"
                        name="price"
                        min={1}
                        onChange={(e) => onBulkChange(e, i)}
                        className="outline-none border border-gray-600 h-8 w-36 px-3"
                      />
                    </div>
                    {i !== 0 ? (
                      <div
                        onClick={() => handleBulkPriceDelete(i)}
                        className="absolute flex items-center justify-center -right-12 top-1 cursor-pointer"
                      >
                        <Image src={deleteIcon} alt="" />
                      </div>
                    ) : null}
                  </div>
                ))}
              </div>
              <div className="flex w-full justify-between">
                <ErrorMessage message={bulkValidation.message} />
                <div className="w-36 flex space-x-2">
                  <Button onClick={addBulkPrice}>Add Row</Button>
                </div>
              </div>
            </div>
          ) : null}
        </div>

        <div className="flex items-center space-x-5">
          <p>Stock Availability*</p>
          <div className="flex items-center justify-center">
            <InputLabel htmlFor="yes" label="Yes" />
            <RadioInput
              checked={Boolean(Number(productDetails.in_stock))}
              onChange={handleStockAvailability}
              id="yes"
              name="stock"
              value={1}
            />
          </div>
          <div className="flex items-center justify-center">
            <InputLabel label="No" htmlFor="no" />
            <RadioInput
              onChange={(e) => handleStockAvailability(e)}
              checked={!Boolean(Number(productDetails.in_stock))}
              id="no"
              name="stock"
              value={0}
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end pr-8 pb-10 space-x-3">
        <div className="w-96 flex items-center justify-center space-x-4">
          <Button className="py-3 text-sm" onClick={decStep}>
            Back
          </Button>
          <DiscardModal />
          <Button type="submit" className="py-3 text-sm">
            Continue
          </Button>
        </div>
      </div>
    </form>
  );
}
