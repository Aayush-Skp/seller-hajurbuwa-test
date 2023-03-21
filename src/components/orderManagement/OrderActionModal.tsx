import Image from 'next/image';
import { useState } from 'react';
import Modal from 'react-modal';
import Button from '../common/Button';
import checkMark from '../../../public/icons/check-mark.svg';
import TextInput from '../common/TextInput';
import InputLabel from '../common/InputLabel';

type OrderActionModalProps = {
  isOpen: boolean;
  action: string;
  setIsOpen: (value: boolean) => void;
};

export default function OrderActionModal({
  action,
  isOpen,
  setIsOpen,
}: OrderActionModalProps) {
  const [actionType, setActionType] = useState('');

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={() => {
        setIsOpen(false);
        setActionType('');
      }}
      className="w-2/3 h-1/3 bg-white rounded-md flex flex-col justify-center items-center"
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
        {action === 'confirmOrder' && (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center space-x-1">
              <Image src={checkMark} alt="" />
              <span>Are you sure want to confirm this order?</span>
            </div>
            <div className="space-x-4">
              <Button className="bg-red-200">No, Cancel</Button>
              <Button>Yes, Confirm</Button>
            </div>
          </div>
        )}

        {action === 'cancelOrder' && (
          <div className="flex flex-col items-center justify-center space-y-2">
            {actionType === 'confirmCancelOrder' ? (
              <div>
                <span>
                  Are you sure want to cancel this order? It cannot be undone
                  later
                </span>
                <div className="flex flex-col w-full">
                  <InputLabel label="Write cancellation reason" />
                  <TextInput />
                </div>
              </div>
            ) : (
              <span>Are you sure want to cancel this order?</span>
            )}

            {actionType === 'confirmCancelOrder' ? (
              <Button className="w-full">Save</Button>
            ) : (
              <div className="space-x-4">
                <Button className="bg-red-200">No, Cancel</Button>
                <Button onClick={() => setActionType('confirmCancelOrder')}>
                  Yes, Confirm
                </Button>
              </div>
            )}
          </div>
        )}

        {action === 'requestPickUp' && (
          <div className="flex flex-col items-center justify-center space-y-2">
            <div className="flex items-center space-x-1">
              <Image src={checkMark} alt="" />
              <span>
                Are you sure want to send pickup request for this order?
              </span>
            </div>
            <div className="space-x-4">
              <Button className="bg-red-200">No, Cancel</Button>
              <Button>Yes, Confirm</Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
