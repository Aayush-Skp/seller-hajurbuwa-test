import Image from 'next/image';
import Modal from 'react-modal';
import Button from '../common/Button';
import checkMark from '../../../public/icons/check-mark.svg';
import { AiFillDelete } from 'react-icons/ai';
import { ChangeEvent, useState } from 'react';
import ErrorMessage from '../common/ErrorMessage';

type ProductAttribute = {
  id: string;
  quantity: number;
  pricePerPc: number;
};

type QuantityDiscountProps = {
  productId?: string;
  quantityDiscountPrices: ProductAttribute[];
  setQuantityDiscountPrices: React.Dispatch<
    React.SetStateAction<ProductAttribute[]>
  >;
  isDiscountModalOpen: boolean;
  toggleStock?: boolean;

  handleDiscountModelClose: (value: boolean) => void;
};

export default function QuantityDiscountModal(props: QuantityDiscountProps) {
  const {
    productId,
    toggleStock,
    quantityDiscountPrices,
    setQuantityDiscountPrices,
    isDiscountModalOpen,
    handleDiscountModelClose,
  } = props;

  const [quantityValidation, setQuantityValidation] = useState({
    isValid: true,
    msg: '',
  });

  function addQuantityDiscount() {
    if (quantityDiscountPrices.length >= 4) return;

    setQuantityDiscountPrices((prev) => {
      return [
        ...prev,
        {
          id: `${prev.length + 1 + Math.random()}`,
          quantity:
            quantityDiscountPrices[quantityDiscountPrices.length - 1].quantity +
            1,
          pricePerPc:
            quantityDiscountPrices[quantityDiscountPrices.length - 1]
              .pricePerPc - 1,
        },
      ];
    });
  }

  function deleteQuantityDiscount(value: ProductAttribute) {
    if (quantityDiscountPrices.length > 1) {
      const filteredDiscounts = quantityDiscountPrices.filter(
        (item) => item.id !== value.id
      );
      setQuantityDiscountPrices(filteredDiscounts);
    }
  }

  function updateQuantityDiscount(
    item: ProductAttribute,
    index: number,
    e: ChangeEvent<HTMLInputElement>
  ) {
    const { name, valueAsNumber } = e.target;

    if (!((index === 0 && name === 'pricePerPc') || index > 0)) return;

    const updatedQuantityDiscountPrices = quantityDiscountPrices.map(
      (val: ProductAttribute) => {
        if (val.id === item.id) {
          if (name === 'quantity') val.quantity = valueAsNumber;
          if (name === 'pricePerPc') val.pricePerPc = valueAsNumber;
        }
        return val;
      }
    );

    if (!(index === 0)) {
      if (
        name === 'quantity' &&
        quantityDiscountPrices[index - 1].quantity < valueAsNumber
      ) {
        setQuantityValidation({
          isValid: false,
          msg: `Quantity must be greater than ${
            quantityDiscountPrices[index - 1].quantity
          } and price should be less than ${
            quantityDiscountPrices[index - 1].pricePerPc
          } `,
        });
      }
      if (
        name === 'pricePerPc' &&
        quantityDiscountPrices[index - 1].pricePerPc < valueAsNumber
      ) {
        setQuantityValidation({
          isValid: false,
          msg: `Quantity must be greater than ${
            quantityDiscountPrices[index - 1].quantity
          } and price should be less than ${
            quantityDiscountPrices[index - 1].pricePerPc
          } `,
        });
      }
    }

    // setQuantityValidation({
    //   isValid: true,
    //   msg: '',
    // });

    setQuantityDiscountPrices(updatedQuantityDiscountPrices);
  }

  return (
    <Modal
      isOpen={isDiscountModalOpen}
      onRequestClose={() => {
        handleDiscountModelClose(false);
      }}
      className="w-2/3 py-5 bg-white rounded-md flex flex-col justify-center items-center"
      style={{
        content: {
          position: 'absolute',
          zIndex: 99999,
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },

        overlay: {
          zIndex: 100,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-5">
        <div className="flex items-center space-x-1">
          <Image src={checkMark} alt="" />
          <span>Enter Quantity Discount/s price for this product?</span>
        </div>
        <div className={'w-full'}>
          <div className="flex justify-around h-10 px-2 border-2 border-black">
            <span>Quantity</span>
            <span className="h-full w-[2px] bg-black" />
            <span>Price per pc</span>
          </div>

          {quantityDiscountPrices.length > 0
            ? quantityDiscountPrices.map((discount, i) => (
                <div
                  key={i}
                  className="flex justify-around items-center space-x-4 p-2 border-2 border-black"
                >
                  <div className="space-x-2">
                    <span>For</span>
                    <input
                      name="quantity"
                      type="number"
                      onChange={(e) => updateQuantityDiscount(discount, i, e)}
                      value={discount.quantity}
                      className="h-8 w-28 px-2 outline-none border border-black"
                    />
                    <span>+ pc</span>
                  </div>
                  <div className="space-x-2">
                    <input
                      name="pricePerPc"
                      type="number"
                      onChange={(e) => updateQuantityDiscount(discount, i, e)}
                      value={discount.pricePerPc}
                      className="h-8 w-28 px-2 outline-none border border-black"
                    />
                    <span>NPR</span>
                  </div>
                  {quantityDiscountPrices.length > 1 && i > 0 && (
                    <AiFillDelete
                      className="w-5 h-5 text-error-primary cursor-pointer"
                      onClick={() => deleteQuantityDiscount(discount)}
                    />
                  )}
                </div>
              ))
            : ''}
          {!quantityValidation.isValid ? (
            <ErrorMessage message={quantityValidation.msg} />
          ) : null}
        </div>
        <div className="w-full flex items-center justify-between space-x-3">
          <Button
            className="w-full bg-warning-primary"
            onClick={addQuantityDiscount}
            disabled={
              quantityDiscountPrices.length >= 4 || !quantityValidation.isValid
            }
          >
            Add Row
          </Button>
          <Button
            disabled={
              !quantityValidation.isValid || quantityDiscountPrices.length <= 1
            }
            className="w-full"
          >
            Save
          </Button>
        </div>
      </div>
    </Modal>
  );
}
