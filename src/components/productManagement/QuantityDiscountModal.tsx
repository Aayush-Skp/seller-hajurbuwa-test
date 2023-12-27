import Image from 'next/image';
import Modal from 'react-modal';
import Button from '../common/Button';
import { useEffect, useState } from 'react';
import ErrorMessage from '../common/ErrorMessage';
import deleteIcon from '../../../public/icons/cancel.svg';
import checkMark from '../../../public/icons/check-mark.svg';

type ProductAttribute = {
  id: string;
  quantity: number;
  price: number;
};

type QuantityDiscountProps = {
  productId: string | number;
  isQuantityDiscountModalOpen: boolean;
  quantityDiscountPrices: {
    quantityDiscounts: ProductAttribute[] | [];
    unit: '';
  };
  updateProductAttribute: (
    productId: string | number,
    updatedField: any
  ) => Promise<void>;
  setIsQuantityDiscountModelOpen: (value: boolean) => void;
};

export default function QuantityDiscountModal(props: QuantityDiscountProps) {
  const {
    productId,
    quantityDiscountPrices,
    isQuantityDiscountModalOpen,
    setIsQuantityDiscountModelOpen,
    updateProductAttribute,
  } = props;

  const [isLoading, setIsLoading] = useState(false);

  const [bulkPrices, setBulkPrices] = useState<any>([]);
  const [unit, setUnit] = useState('');
  const [bulkValidation, setBulkValidation] = useState({
    isValid: true,
    message: '',
  });

  useEffect(() => {
    setBulkPrices(quantityDiscountPrices.quantityDiscounts);
    setUnit(quantityDiscountPrices.unit);
  }, []);

  function addBulkPrice() {
    if (bulkPrices.length <= 3)
      setBulkPrices([
        ...bulkPrices,
        {
          quantity: parseInt(bulkPrices[bulkPrices.length - 1].quantity) + 1,
          price: bulkPrices[bulkPrices.length - 1].price - 1,
        },
      ]);
  }

  function handleBulkPriceDelete(index: number) {
    const updated = bulkPrices.filter((_: any, i: number) => i !== index);

    setBulkPrices(updated);

    setBulkValidation({
      isValid: true,
      message: '',
    });
  }

  function onBulkChange(e: React.ChangeEvent<HTMLInputElement>, index: number) {
    const { name, valueAsNumber } = e.target;

    const update = bulkPrices?.map((val: any, i: any) => {
      if (i === index) {
        if (name === 'quantity') val.quantity = valueAsNumber;
        if (name === 'price') val.price = valueAsNumber;
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

    if (name === 'price' && index !== 0) {
      if (
        bulkPrices[index - 1].price <= valueAsNumber ||
        isNaN(valueAsNumber)
      ) {
        setBulkValidation({
          isValid: false,
          message: `Price must me less than ${bulkPrices[index - 1].price}`,
        });
      } else {
        setBulkValidation({
          isValid: true,
          message: '',
        });
      }
    }
  }

  function handleFormSubmit() {
    const formData = new FormData();

    if (
      bulkPrices.length === 1 &&
      (bulkPrices[0]?.price <= 0 || isNaN(bulkPrices[0]?.price))
    ) {
      setBulkValidation({
        isValid: false,
        message: 'Price must be a valid amount',
      });

      return;
    }

    if (!bulkValidation.isValid) return;

    setIsLoading(true);

    formData.append('price_per_unit', '');
    formData.append('is_bulk_price', '1');
    formData.append('_method', 'PUT');
    formData.append('update_type', '1');

    let updated = bulkPrices.map((price: any) => {
      return [price.quantity, price.price];
    });

    for (let i = 0; i < updated.length; i++) {
      for (let j = 0; j < updated[i].length; j++) {
        formData.append(`bulk_pricing[${i}][${j}]`, `${updated[i][j]}`);
      }
    }
    
    console.log(formData);

    updateProductAttribute(productId, formData)
      .then(() => setIsQuantityDiscountModelOpen(false))
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
        setIsQuantityDiscountModelOpen(false);
      });
  }

  return (
    <Modal
      isOpen={isQuantityDiscountModalOpen}
      onRequestClose={() => {
        setIsQuantityDiscountModelOpen(false);
      }}
      className="w-2/3 h-3/4 py-5 bg-white rounded-md flex flex-col justify-center items-center"
      style={{
        content: {
          zIndex: 100,
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },

        overlay: {
          zIndex: 100,
          backgroundColor: 'rgba(0, 0, 0, 0.1)',
        },
      }}
      ariaHideApp={false}
    >
      <div className="w-[500px] space-y-2">
        <div className="flex items-center justify-center space-x-1 my-4">
          <Image src={checkMark} alt="" />
          <span>Edit quantity price for this product.</span>
        </div>
        <div className="border border-gray-600">
          <div className="flex items-center justify-between bg-accent-primary py-2 px-8 text-white">
            <p className="">Quantity</p>
            <p>Price per {unit}</p>
          </div>
          {bulkPrices?.map((price: any, i: number) => (
            <div key={i} className="relative flex justify-between px-2 py-2">
              <div className="flex space-x-3">
                <input
                  value={price.quantity}
                  name="quantity"
                  type="number"
                  disabled={i === 0}
                  onChange={(e) => onBulkChange(e, i)}
                  className="outline-none border border-gray-600 h-8 w-36 px-3"
                />
                <span className="flex items-center">+{unit}</span>
              </div>
              <div className="flex space-x-3">
                <span className="flex items-center">NPR</span>
                <input
                  value={price.price}
                  type="number"
                  name="price"
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
                bulkPrices[0]?.price === 0 ||
                isNaN(bulkPrices[bulkPrices?.length - 1]?.quantity) ||
                isNaN(bulkPrices[bulkPrices?.length - 1]?.price) ||
                !bulkValidation.isValid ||
                bulkPrices?.length === 4
              }
            >
              Add
            </Button>
          </div>
        </div>
        <div className="space-x-4 w-full flex">
          <button
            onClick={() => setIsQuantityDiscountModelOpen(false)}
            className="px-5 py-2 w-full border border-accent-primary rounded text-accent-primary"
          >
            No, Cancel
          </button>
          <button
            onClick={handleFormSubmit}
            className={`px-5 py-2 w-full border ${
              bulkValidation.isValid
                ? 'border-accent-primary bg-accent-primary cursor-pointer'
                : 'border-accent-secondary bg-accent-secondary cursor-not-allowed'
            }  rounded text-white`}
          >
            {isLoading ? 'Loading...' : 'Yes, Confirm'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
