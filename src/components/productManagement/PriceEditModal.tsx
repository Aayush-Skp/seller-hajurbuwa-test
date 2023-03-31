import { useEffect, useState } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import Button from '../common/Button';
import checkMark from '../../../public/icons/check-mark.svg';
import TextInput from '../common/TextInput';

type PriceEditModalProps = {
  productId?: string;
  value: number;
  isPriceEditModalOpen: boolean;
  toggleStock?: boolean;
  handlePriceEditModelClose: () => void;
};

export default function PriceEditModal({
  value,
  productId,
  toggleStock,
  isPriceEditModalOpen,
  handlePriceEditModelClose,
}: PriceEditModalProps) {
  const [price, setPrice] = useState(0);

  useEffect(() => {
    setPrice(value);

    return () => setPrice(0);
  }, [value]);

  return (
    <Modal
      isOpen={isPriceEditModalOpen}
      onRequestClose={handlePriceEditModelClose}
      className="w-2/3 h-1/4 bg-white rounded-md flex flex-col justify-center items-center"
      style={{
        content: {
          position: 'absolute',
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
      <div className="flex flex-col items-center justify-center space-y-4">
        <div className="flex items-center space-x-1">
          <Image src={checkMark} alt="" />
          <span>Please Enter price for this product?</span>
        </div>
        <div className="space-y-2">
          <TextInput
            defaultValue={value}
            // onChange={(e) => setPrice(e.target.valueAsNumber)}
            // value={price}
            type="number"
          />
          <div className="flex space-x-2">
            <Button className="bg-error-primary">Cancel</Button>
            <Button onClick={handlePriceEditModelClose}>Save</Button>
          </div>
        </div>
      </div>
    </Modal>
  );
}
