import Image from 'next/image';
import React, { useState } from 'react';
import Modal from 'react-modal';
import checkMark from '../../../public/icons/check-mark.svg';
import { changeOrderStatus } from '../../services/orderServices';
import InputLabel from '../common/InputLabel';
import TextInput from '../common/TextInput';

type ChangeOrderStatusModalProps = {
  orderStatus: { orderId: string | number; status: string };
  isOrderStatusModelOpen: boolean;
  setIsOrderStatusModelOpen: (status: boolean) => void;
  getAllOrders: () => void;
};

export default function ChangeOrderStatusModal(
  props: ChangeOrderStatusModalProps
) {
  const {
    isOrderStatusModelOpen,
    setIsOrderStatusModelOpen,
    getAllOrders,
    orderStatus,
  } = props;

  const [isLoading, setIsLoading] = useState(false);
  const [cancelReason, setCancelReason] = useState('');

  function handleStatusChange() {
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    changeOrderStatus(orderStatus)
      .then((res) => {
        setIsLoading(false);
        getAllOrders();
        setIsOrderStatusModelOpen(false);
      })
      .then((err) => {
        setIsLoading(false);
      })
      .catch(console.log);
  }

  return (
    <div>
      <Modal
        isOpen={isOrderStatusModelOpen}
        onRequestClose={() => {
          setIsOrderStatusModelOpen(false);
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
            zIndex: 100,
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          },
        }}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center space-x-1">
            {orderStatus.status === 'cancelled' ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-1">
                  <Image src={checkMark} alt="" />
                  <span>Are you sure want to cancel this order?</span>
                </div>
                <div className="space-y-1 w-96">
                  <InputLabel
                    htmlFor="cancelReason"
                    label="Write cancellation reason"
                  />
                  <TextInput
                    id="cancelReason"
                    className="w-full"
                    value={cancelReason}
                    onChange={(e) => setCancelReason(e.target.value)}
                  />
                </div>
              </div>
            ) : orderStatus.status === 'unshipped' ? (
              <span>Are you sure want to confirm this order?</span>
            ) : orderStatus.status === 'waiting_for_pickup' ? (
              <span>Are you sure want to request for pickup?</span>
            ) : null}
          </div>
          <div className="space-x-4">
            <button
              disabled={isLoading}
              onClick={() => setIsOrderStatusModelOpen(false)}
              className="px-5 py-2 border border-accent-primary rounded text-accent-primary"
            >
              No, Cancel
            </button>
            <button
              disabled={isLoading}
              onClick={handleStatusChange}
              className="px-5 py-2 border border-accent-primary rounded text-white bg-accent-primary"
            >
              {!isLoading ? 'Yes, Confirm' : 'Loading...'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
