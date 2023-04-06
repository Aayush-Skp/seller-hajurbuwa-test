import Image from 'next/image';
import { useEffect, useState } from 'react';
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

export default function PriceAndStock(props: any) {
  const { productDetails, decStep, incStep, defaultValues, setProductDetails } =
    props;

  const [inStock, setInStock] = useState(true);
  const [isBulkPrice, setIsBulkPrice] = useState(false);
  const [minOrder, setMinOrder] = useState(1);
  const [minOrderValidation, setMinOrderValidation] = useState({
    isValid: true,
    message: '',
  });

  const [bulkValidation, setBulkValidation] = useState({
    isValid: true,
    message: '',
  });

  const [bulkPrices, setBulkPrices] = useState([
    { quantity: minOrder, pricePerPc: 0 },
  ]);

  useEffect(() => {
    if (isBulkPrice) {
      setValue('price_per_unit', '');
      setError('price_per_unit', { message: '' });
    }
  }, [isBulkPrice]);

  useEffect(() => {
    setValue('price_per_unit', productDetails.price_per_unit);
    setMinOrder(productDetails.minimum_order);
    setIsBulkPrice(productDetails.is_bulk_price);
    productDetails.bulk_pricing.length !== 0 &&
      setBulkPrices(productDetails.bulk_pricing);
    setInStock(productDetails.in_stock);
  }, []);

  function addBulkPrice() {
    if (bulkPrices.length <= 3)
      setBulkPrices([
        ...bulkPrices,
        {
          quantity: bulkPrices[bulkPrices.length - 1].quantity + 1,
          pricePerPc: bulkPrices[bulkPrices.length - 1].pricePerPc - 1,
        },
      ]);
  }

  function handleBulkPriceDelete(index: number) {
    const updated = bulkPrices.filter((_, i) => i !== index);

    setBulkPrices(updated);

    setBulkValidation({
      isValid: true,
      message: '',
    });
  }

  function onBulkChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { name, valueAsNumber } = e.target;

    const update = bulkPrices.map((val, i) => {
      if (i === index) {
        if (name === 'quantity') val.quantity = valueAsNumber;
        if (name === 'pricePerPc') val.pricePerPc = valueAsNumber;
      }

      return val;
    });

    setBulkPrices(update);

    if (name === 'quantity' && index !== 0) {
      if (
        bulkPrices[index - 1].quantity >= valueAsNumber ||
        isNaN(valueAsNumber)
      ) {
        setBulkValidation({
          isValid: false,
          message: `Quantity must me greater than ${
            bulkPrices[index - 1].quantity
          }`,
        });
      } else {
        setBulkValidation({
          isValid: true,
          message: '',
        });
      }
    }

    if (name === 'pricePerPc' && index !== 0) {
      if (
        bulkPrices[index - 1].pricePerPc <= valueAsNumber ||
        isNaN(valueAsNumber)
      ) {
        setBulkValidation({
          isValid: false,
          message: `Price must me less than ${
            bulkPrices[index - 1].pricePerPc
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
    setMinOrder(e.target.valueAsNumber);
    setBulkPrices([{ quantity: e.target.valueAsNumber, pricePerPc: 0 }]);
    setBulkValidation({
      isValid: true,
      message: '',
    });
    setMinOrderValidation({
      isValid: true,
      message: '',
    });
  }

  function handleIsBulkPricing(e: React.ChangeEvent<HTMLInputElement>) {
    !e.target.checked &&
      setBulkPrices([
        {
          quantity: minOrder,
          pricePerPc: 0,
        },
      ]);

    setIsBulkPrice((prev) => !prev);
    setBulkValidation({
      isValid: true,
      message: '',
    });
  }

  const { errors, register, setValue, handleSubmit, setError } =
    useFormValidation(ProductPriceSchema(defaultValues.units, isBulkPrice));

  function handleFormSubmit(data: any) {
    if (!isNaN(minOrder) && bulkValidation.isValid) {
      setProductDetails((prev: any) => {
        return {
          ...prev,
          ...data,
          minimum_order: minOrder,
          in_stock: inStock,
          is_bulk_price: Number(isBulkPrice),
          bulk_pricing: bulkPrices,
        };
      });
      incStep();
    }

    if (isNaN(bulkPrices[0].pricePerPc) || bulkPrices[0].pricePerPc === 0) {
      setBulkValidation({
        isValid: false,
        message: 'Entered price is invalid',
      });

      return;
    }

    setMinOrderValidation({
      isValid: false,
      message: 'Enter valid minimum order',
    });
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
                  value={minOrder}
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
                {...register('unit')}
                className="w-56 h-10 outline-none border border-gray-600 rounded cursor-pointer"
              >
                <option value="">Select Unit</option>
                {defaultValues?.units?.map((unit: any) => (
                  <option
                    key={unit.id}
                    value={unit.id}
                    selected={unit.id === Number(productDetails.unit)}
                  >
                    {unit?.name}
                  </option>
                ))}
              </select>
              <ErrorMessage message={errors?.unit?.message as string} />
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
                disabled={isBulkPrice}
                id="price_per_unit"
                className={`h-10 pl-3 border border-gray-600 rounded-r outline-none ${
                  isBulkPrice ? 'cursor-not-allowed' : 'cursor-pointer'
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
              onChange={(e) => handleIsBulkPricing(e)}
              checked={isBulkPrice}
              id="bulk_price"
            />
          </div>
          {isBulkPrice ? (
            <div className="w-[500px] space-y-2">
              <div className="border border-gray-600">
                <div className="flex items-center justify-between bg-accent-primary py-2 px-8 text-white">
                  <p className="">Quantity</p>
                  <p>Price Per Pc</p>
                </div>
                {bulkPrices.map((price, i) => (
                  <div
                    key={i}
                    className="relative flex justify-between px-2 py-2"
                  >
                    <div className="flex space-x-3">
                      <input
                        value={i === 0 ? minOrder : price.quantity}
                        name="quantity"
                        type="number"
                        disabled={i === 0}
                        onChange={(e) => onBulkChange(e, i)}
                        className="outline-none border border-gray-600 h-8 w-36 px-3"
                      />
                      <span className="flex items-center">+pcs</span>
                    </div>
                    <div className="flex space-x-3">
                      <span className="flex items-center">NPR</span>
                      <input
                        value={price.pricePerPc}
                        type="number"
                        name="pricePerPc"
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
                  <Button
                    onClick={addBulkPrice}
                    disabled={
                      bulkPrices[0]?.pricePerPc === 0 ||
                      isNaN(bulkPrices[bulkPrices.length - 1]?.quantity) ||
                      isNaN(bulkPrices[bulkPrices.length - 1]?.pricePerPc) ||
                      !bulkValidation.isValid ||
                      bulkPrices?.length === 4
                    }
                  >
                    Add
                  </Button>
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
              checked={inStock}
              onChange={() => setInStock(true)}
              id="yes"
              name="stock"
            />
          </div>
          <div className="flex items-center justify-center">
            <InputLabel label="No" htmlFor="no" />
            <RadioInput
              onChange={() => setInStock(false)}
              checked={!inStock}
              id="no"
              name="stock"
            />
          </div>
        </div>
      </div>
      <div className="flex justify-end pr-8 pb-10 space-x-3">
        <div className="w-96 flex items-center justify-center space-x-4">
          <Button className="py-3 text-sm" onClick={decStep}>
            Back
          </Button>
          <Button className="py-3 text-sm">Discard</Button>
          <Button type="submit" className="py-3 text-sm">
            Continue
          </Button>
        </div>
      </div>
    </form>
  );
}
