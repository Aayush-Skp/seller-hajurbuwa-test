import { useEffect } from 'react';
import Image from 'next/image';
import Modal from 'react-modal';
import Button from '../common/Button';
import checkMark from '../../../public/icons/check-mark.svg';
import TextInput from '../common/TextInput';
import useFormValidation from '../../hooks/useFormValidation';
import { PriceSchema } from '../../validation/productListingSchema';
import ErrorMessage from '../common/ErrorMessage';

type PriceEditModalProps = {
  productId: string | number;
  value: string | number;
  isPriceModalOpen: boolean;
  setIsPriceModalOpen: (value: boolean) => void;
  updateProductAttribute: (
    productId: string | number,
    updatedField: Record<string, string>
  ) => Promise<void>;
};

export default function PriceEditModal(props: PriceEditModalProps) {
  const {
    value,
    isPriceModalOpen,
    productId,
    setIsPriceModalOpen,
    updateProductAttribute,
  } = props;

  const { register, errors, handleSubmit, setValue } =
    useFormValidation(PriceSchema);

  useEffect(() => {
    setValue('price_per_unit', String(value));
  }, []);

  console.log(productId);

  function handleFormSubmit(data: any) {
    updateProductAttribute(productId, data)
      .then(() => setIsPriceModalOpen(false))
      .catch(console.log);
  }

  return (
    <div>
      <Modal
        isOpen={isPriceModalOpen}
        onRequestClose={() => setIsPriceModalOpen(false)}
        ariaHideApp={false}
        className="w-2/3 h-1/2 bg-white rounded-md flex flex-col justify-center items-center"
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
        <form
          onSubmit={handleSubmit(handleFormSubmit)}
          className="flex flex-col items-center justify-center space-y-4"
        >
          <div className="flex items-center space-x-1">
            <Image src={checkMark} alt="" />
            <span>Enter price for this product.</span>
          </div>
          <div className="space-y-2">
            <div className="w-80">
              <TextInput {...register('price_per_unit')} />
              <ErrorMessage
                message={errors.price_per_unit?.message as string}
              />
            </div>
            <div className="flex space-x-2">
              <Button
                onClick={() => setIsPriceModalOpen(false)}
                className="bg-error-primary"
              >
                Cancel
              </Button>
              <Button type="submit">Save</Button>
            </div>
          </div>
        </form>
      </Modal>
    </div>
  );
}
