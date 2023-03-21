import Image from 'next/image';
import Modal from 'react-modal';
import Button from '../common/Button';
import checkMark from '../../../public/icons/check-mark.svg';
import { AiFillDelete } from 'react-icons/ai';
import { ChangeEvent, useState } from 'react';

type ProductAttribute = {
  id: string;
  quantity: number;
  pricePerPc: number;
};

type QuantityDiscountModalProps = {
  productId?: string;
  isDiscountModalOpen: boolean;
  toggleStock?: boolean;
  handleDiscountModelClose: (value: boolean) => void;
};

export default function QuantityDiscountModal({
  productId,
  toggleStock,
  isDiscountModalOpen,
  handleDiscountModelClose,
}: QuantityDiscountModalProps) {
  const [quantityDiscounts, setQuantityDiscounts] = useState<
    ProductAttribute[]
  >([{ id: '1', quantity: 3, pricePerPc: 3000 }]);

  function addQuantityDiscount() {
    setQuantityDiscounts((prev) => {
      return [
        ...prev,
        {
          id: `${prev.length + 1 + Math.random()}`,
          quantity: prev.length + 3,
          pricePerPc: 0,
        },
      ];
    });
  }

  function deleteQuantityDiscount(value: ProductAttribute) {
    if (quantityDiscounts.length > 1) {
      const filteredDiscounts = quantityDiscounts.filter(
        (item) => item.id !== value.id
      );
      setQuantityDiscounts(filteredDiscounts);
    }
  }

  function updateQuantityDiscount(
    item: ProductAttribute,
    e: ChangeEvent<HTMLInputElement>
  ) {
    const { name, valueAsNumber } = e.target;

    console.log(item, e.target.name);

    const updatedValues = quantityDiscounts.map((val: ProductAttribute) => {
      if (val.id === item.id) {
        if (name === 'quantity') val.quantity = Number(valueAsNumber);
        if (name === 'pricePerPc') val.pricePerPc = valueAsNumber;
        return val;
      }
      return val;
    });

    setQuantityDiscounts(updatedValues);
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
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-5">
        <div className="flex items-center space-x-1">
          <Image src={checkMark} alt="" />
          <span>Enter Quantity Discount/s price for this product?</span>
        </div>
        <div className="w-full">
          <div className="flex justify-around h-10 px-2 border-2 border-black">
            <span>Quantity</span>
            <span className="h-full w-[2px] bg-black" />
            <span>Price per pc</span>
          </div>

          {quantityDiscounts.length > 0
            ? quantityDiscounts.map((discount, i) => (
                <div
                  key={i}
                  className="flex justify-around items-center space-x-4 p-2 border-2 border-black"
                >
                  <div className="space-x-2">
                    <span>For</span>
                    <input
                      name="quantity"
                      type="number"
                      onChange={(e) => updateQuantityDiscount(discount, e)}
                      value={discount.quantity}
                      className="h-8 w-28 px-2 outline-none border border-black"
                    />
                    <span>+ pc</span>
                  </div>
                  <div className="space-x-2">
                    <input
                      name="pricePerPc"
                      type="number"
                      onChange={(e) => updateQuantityDiscount(discount, e)}
                      value={discount.pricePerPc}
                      className="h-8 w-28 px-2 outline-none border border-black"
                    />
                    <span>NPR</span>
                  </div>
                  {quantityDiscounts.length > 1 && (
                    <AiFillDelete
                      className="w-5 h-5 text-error-primary cursor-pointer"
                      onClick={() => deleteQuantityDiscount(discount)}
                    />
                  )}
                </div>
              ))
            : ''}
        </div>
        <div className="w-full flex items-center justify-between space-x-3">
          <Button
            className="w-full bg-warning-primary"
            onClick={addQuantityDiscount}
          >
            Add Row
          </Button>
          <Button className="w-full">Save</Button>
        </div>
      </div>
    </Modal>
  );
}
