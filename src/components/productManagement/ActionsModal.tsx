import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-modal';
import Button from '../common/Button';
import checkMark from '../../../public/icons/check-mark.svg';

type ActionModalProps = {
  productStatus: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
};

export default function ActionModal({
  productStatus,
  isOpen,
  setIsOpen,
}: ActionModalProps) {
  const [actionType, setActionType] = useState('');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
        setActionType('');
      }}
      className="w-1/3 h-1/4 bg-white rounded-md flex flex-col justify-center items-center"
      style={{
        content: {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        },

        overlay: {
          zIndex: 1000,
          backgroundColor: 'rgba(0, 0, 0, 0.3)',
        },
      }}
    >
      {productStatus === 'online' && (
        <div className="flex flex-col items-center justify-center space-y-2">
          {actionType === '' && (
            <p className="text-black text-xl">
              What action do you want to perform?
            </p>
          )}
          {actionType === '' ? (
            <div className="flex items-center justify-center space-x-3">
              <Button onClick={() => setActionType('deactivate')}>
                Deactivate
              </Button>
              <Button
                onClick={() => setActionType('delete')}
                className="bg-red-200"
              >
                Delete
              </Button>
            </div>
          ) : actionType === 'deactivate' ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center space-x-1">
                <Image src={checkMark} alt="" />
                <span>Are you sure want to Deactivate this product?</span>
              </div>
              <div className="space-x-4">
                <Button className="bg-red-200">No, Cancel</Button>
                <Button>Yes, Confirm</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center space-x-1">
                <Image src={checkMark} alt="" />
                <span>Are you sure want to Delete this product?</span>
              </div>
              <div className="space-x-4">
                <Button className="bg-red-200">No, Cancel</Button>
                <Button>Yes, Confirm</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {productStatus === 'pendingQc' && (
        <div className="flex flex-col items-center justify-center space-y-2">
          {actionType === '' && (
            <p className="text-black text-xl">
              What action do you want to perform?
            </p>
          )}
          {actionType === '' ? (
            <div className="flex items-center justify-center space-x-3">
              <Button
                onClick={() => setActionType('delete')}
                className="bg-red-200"
              >
                Delete
              </Button>
            </div>
          ) : actionType === 'deactivate' ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center space-x-1">
                <Image src={checkMark} alt="" />
                <span>Are you sure want to Deactivate this product?</span>
              </div>
              <div className="space-x-4">
                <Button className="bg-red-200">No, Cancel</Button>
                <Button>Yes, Confirm</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <div className="flex items-center space-x-1">
                <Image src={checkMark} alt="" />
                <span>Are you sure want to Delete this product?</span>
              </div>
              <div className="space-x-4">
                <Button className="bg-red-200">No, Cancel</Button>
                <Button>Yes, Confirm</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {productStatus === 'outOfStock' && (
        <div className="flex flex-col items-center justify-center space-y-2">
          {actionType === '' && (
            <p className="text-black text-xl">
              What action do you want to perform?
            </p>
          )}
          {actionType === '' ? (
            <div className="flex items-center justify-center space-x-3">
              <Button onClick={() => setActionType('deactivate')}>
                Deactivate
              </Button>
              <Button
                onClick={() => setActionType('delete')}
                className="bg-red-200"
              >
                Delete
              </Button>
            </div>
          ) : actionType === 'deactivate' ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <span>Are you sure want to Deactivate this product?</span>
              <div className="space-x-4">
                <Button className="bg-red-200">No, Cancel</Button>
                <Button>Yes, Confirm</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <span>Are you sure want to Delete this product?</span>
              <div className="space-x-4">
                <Button className="bg-red-200">No, Cancel</Button>
                <Button>Yes, Confirm</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {productStatus === 'inActive' && (
        <div className="flex flex-col items-center justify-center space-y-2">
          {actionType === '' && (
            <p className="text-black text-xl">
              What action do you want to perform?
            </p>
          )}
          {actionType === '' ? (
            <div className="flex items-center justify-center space-x-3">
              <Button onClick={() => setActionType('activate')}>
                Activate
              </Button>
              <Button
                onClick={() => setActionType('delete')}
                className="bg-red-200"
              >
                Delete
              </Button>
            </div>
          ) : actionType === 'activate' ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <span>Are you sure want to Activate this product?</span>
              <div className="space-x-4">
                <Button className="bg-red-200">No, Cancel</Button>
                <Button>Yes, Confirm</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <span>Are you sure want to Delete this product?</span>
              <div className="space-x-4">
                <Button className="bg-red-200">No, Cancel</Button>
                <Button>Yes, Confirm</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {productStatus === 'suspended' && (
        <div className="flex flex-col items-center justify-center space-y-2">
          {actionType === '' && (
            <p className="text-black text-xl">
              What action do you want to perform?
            </p>
          )}
          {actionType === '' ? (
            <div className="flex items-center justify-center space-x-3">
              <Button
                onClick={() => setActionType('delete')}
                className="bg-red-200"
              >
                Delete
              </Button>
            </div>
          ) : actionType === 'deactivate' ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <span>Are you sure want to Deactivate this product?</span>
              <div className="space-x-4">
                <Button className="bg-red-200">No, Cancel</Button>
                <Button>Yes, Confirm</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <span>Are you sure want to Delete this product?</span>
              <div className="space-x-4">
                <Button className="bg-red-200">No, Cancel</Button>
                <Button>Yes, Confirm</Button>
              </div>
            </div>
          )}
        </div>
      )}

      {productStatus === 'locked' && (
        <div className="flex flex-col items-center justify-center space-y-2">
          {actionType === '' && (
            <p className="text-black text-xl">
              What action do you want to perform?
            </p>
          )}
          {actionType === '' ? (
            <div className="flex items-center justify-center space-x-3">
              <Button
                onClick={() => setActionType('delete')}
                className="bg-red-200"
              >
                Delete
              </Button>
            </div>
          ) : actionType === 'deactivate' ? (
            <div className="flex flex-col items-center justify-center space-y-2">
              <span>Are you sure want to Deactivate this product?</span>
              <div className="space-x-4">
                <Button className="bg-red-200">No, Cancel</Button>
                <Button>Yes, Confirm</Button>
              </div>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center space-y-2">
              <span>Are you sure want to Delete this product?</span>
              <div className="space-x-4">
                <Button className="bg-red-200">No, Cancel</Button>
                <Button>Yes, Confirm</Button>
              </div>
            </div>
          )}
        </div>
      )}
    </Modal>
  );
}
