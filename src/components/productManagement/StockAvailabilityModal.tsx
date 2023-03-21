import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-modal';
import Button from '../common/Button';
import checkMark from '../../../public/icons/check-mark.svg';

type StockAvailabilityModalProps = {
  productId?: string;
  isStockModalOpen: boolean;
  toggleStock?: boolean;
  handleStockModelClose: (value: boolean) => void;
};

export default function StockAvailabilityModal({
  productId,
  toggleStock,
  isStockModalOpen,
  handleStockModelClose,
}: StockAvailabilityModalProps) {
  return (
    <Modal
      isOpen={isStockModalOpen}
      onRequestClose={() => {
        handleStockModelClose(false);
      }}
      className="w-2/3 h-1/4 bg-white rounded-md flex flex-col justify-center items-center"
      style={{
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },

        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="flex items-center space-x-1">
          <Image src={checkMark} alt="" />
          <span>
            {`Are you sure you want to change stock status from ${
              !toggleStock
                ? 'In Stock to Out of stock'
                : 'Out Stock of stock to In Stock'
            }
            `}
          </span>
        </div>
        <div className="space-x-4">
          <Button className="bg-red-200">No, Cancel</Button>
          <Button>Yes, Confirm</Button>
        </div>
      </div>
    </Modal>
  );
}
