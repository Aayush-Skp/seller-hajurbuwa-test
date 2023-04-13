import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-modal';
import checkMark from '../../../public/icons/check-mark.svg';
import InputLabel from '../common/InputLabel';
import RadioInput from '../common/RadioInput';

type StockAvailabilityModalProps = {
  in_stock: number;
  productId?: string | number;
  updateProductAttribute: (
    productId: string | number,
    updatedField: any
  ) => Promise<any>;
};

export default function StockAvailabilityModal(
  props: StockAvailabilityModalProps
) {
  const { in_stock, productId, updateProductAttribute } = props;

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [responseState, setResponseState] = useState({
    isLoading: false,
    isIdle: true,
    isError: false,
    message: '',
  });

  const [isStockAvailable, setIsStockAvailable] = useState(0);

  function handleStockStatusChange() {
    setResponseState({
      ...responseState,
      isLoading: true,
      isIdle: false,
    });

    updateProductAttribute(
      `${productId}`,
      new URLSearchParams({
        in_stock: isStockAvailable.toString(),
      })
    )
      .then((res) => {
        setIsModalOpen(false);
        setResponseState({
          ...responseState,
          isLoading: false,
          isIdle: true,
          isError: false,
          message: '',
        });
      })
      .catch((err) => {
        setResponseState({
          ...responseState,
          isLoading: false,
          isIdle: true,
          isError: true,
          message: 'There has been some error while updating product data',
        });
      });
  }

  console.log(isStockAvailable);

  return (
    <div>
      <div className="flex flex-col items-center space-y-2">
        <div className="flex justify-center items-center space-x-1">
          <InputLabel label="Yes" />
          <RadioInput
            name={productId as string}
            checked={in_stock === 1 ? true : false}
            onClick={() => {
              console.log(productId);
              setIsStockAvailable(1);
              !in_stock && setIsModalOpen(true);
            }}
          />
        </div>
        <div className="flex justify-center items-center space-x-1">
          <InputLabel label="No" />
          <RadioInput
            checked={in_stock === 0 ? true : false}
            name={productId as string}
            onClick={() => {
              console.log(productId);
              setIsStockAvailable(0);
              in_stock && setIsModalOpen(true);
            }}
          />
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
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
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center space-x-1">
            <Image src={checkMark} alt="" />
            <span>
              {`Are you sure you want to change stock status from ${
                in_stock
                  ? 'In Stock to Out of stock'
                  : 'Out of Stock stock to In Stock'
              }
            ?`}
            </span>
          </div>
          <div className="space-x-4">
            <button
              className="text-error-primary border border-error-primary hover:text-error-secondary hover:border-error-secondary transition-colors px-5 py-1 rounded"
              onClick={() => setIsModalOpen(false)}
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
    </div>
  );
}
