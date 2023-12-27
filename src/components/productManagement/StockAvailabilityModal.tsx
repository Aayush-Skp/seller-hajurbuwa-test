import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-modal';
import checkMark from '../../../public/icons/check-mark.svg';

type StockAvailabilityModalProps = {
  isStockAvailabilityModalOpen: boolean;
  setIsStockAvailabilityModalOpen: (value: boolean) => void;
  in_stock: number | string;
  value: any;
  updateProductAttribute: (
    productId: string | number,
    updatedField: any
  ) => Promise<any>;
};

export default function StockAvailabilityModal(
  props: StockAvailabilityModalProps
) {
  const {
    value,
    updateProductAttribute,
    isStockAvailabilityModalOpen,
    setIsStockAvailabilityModalOpen,
  } = props;

  const [responseState, setResponseState] = useState({
    isLoading: false,
    isIdle: true,
    isError: false,
    message: '',
  });

  function handleStockStatusChange() {
    setResponseState({
      ...responseState,
      isLoading: true,
      isIdle: false,
    });

    const formData = new FormData();

    formData.append('in_stock', value.value);
    formData.append('_method', 'PUT');
    formData.append('update_type', '2');

    updateProductAttribute(`${value.id}`, formData)
      .then((res) => {
        console.log(res);
        setIsStockAvailabilityModalOpen(false);
      })
      .catch((err) => {
        console.log(err);

        setResponseState({
          ...responseState,
          isLoading: false,
          isIdle: true,
          isError: true,
          message: 'There has been some error while updating product data',
        });
      });
  }

  return (
    <Modal
      isOpen={isStockAvailabilityModalOpen}
      onRequestClose={() => {
        setIsStockAvailabilityModalOpen(false);
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
          zIndex: 100,
          backgroundColor: 'rgba(0, 0, 0, 0.03)',
        },
      }}
    >
      <div className="flex flex-col items-center justify-center space-y-2">
        <div className="flex items-center space-x-1">
          <Image src={checkMark} alt="" />
          <span>
            {`Are you sure you want to change stock status from ${
              !value.value
                ? '"In Stock" to "Out of stock"'
                : '"Out of Stock" to "In Stock"'
            }
            ?`}
          </span>
        </div>
        <div className="space-x-4">
          <button
            className="text-error-primary border border-error-primary hover:text-error-secondary hover:border-error-secondary transition-colors px-5 py-1 rounded"
            onClick={() => setIsStockAvailabilityModalOpen(false)}
          >
            No, Cancel
          </button>
          <button
            className="text-white border bg-accent-primary px-5 py-1 rounded hover:bg-accent-secondary transition-colors"
            onClick={handleStockStatusChange}
          >
            {!responseState.isLoading ? 'Yes, Confirm' : 'Loading...'}
          </button>
        </div>
      </div>
    </Modal>
  );
}
