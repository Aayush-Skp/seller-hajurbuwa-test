import React, { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import Button from '../common/Button';
import Modal from 'react-modal';
import TextInput from '../common/TextInput';
import Image from 'next/image';
import checkMark from '../../../public/icons/check-mark.svg';
import { useClickAwayListener } from '../../hooks/useClickAwayListener';

type ActionButtonProps = {
  currentTab: string;
  // | 'online'
  // | 'outOfStock'
  // | 'inActive'
  // | 'pendingQc'
  // | 'suspended'
  // | 'locked';
};

const buttons = {
  online: {
    firstBtn: 'Deactivate',
    secondBtn: 'Delete',
  },
  outOfStock: {
    firstBtn: 'Deactivate',
    secondBtn: 'Delete',
  },
  inActive: {
    firstBtn: 'Activate',
    secondBtn: 'Delete',
  },
  pendingQc: {
    firstBtn: 'Deactivate',
    secondBtn: '',
  },
  suspended: {
    firstBtn: 'Delete',
    secondBtn: '',
  },
  locked: {
    firstBtn: 'Delete',
    secondBtn: '',
  },
};

export default function ActionButtons({ currentTab }: ActionButtonProps) {
  const [toggleMoreOption, setToggleMoreOption] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<string | undefined>();
  const { nodeRef, isNodeVisible, setIsNodeVisible } = useClickAwayListener();

  function handleAction(type: string) {
    setActionType(type);
    setIsModalOpen(true);
  }

  function moreButtons() {
    if (currentTab === 'online')
      return (
        <div className="absolute -left-3 z-30 flex flex-col space-y-2 w-40 h-28 p-4 bg-white border border-gray-300 rounded shadow-sm">
          <Button
            className="text-xs bg-warning-primary"
            onClick={() => handleAction('Deactivate')}
          >
            Deactivate
          </Button>
          <Button
            className="text-xs bg-red-200"
            onClick={() => handleAction('Delete')}
          >
            Delete
          </Button>
        </div>
      );

    if (currentTab === 'outOfStock')
      return (
        <div className="absolute top-20 -left-3 z-30 flex flex-col space-y-2 w-40 h-28 p-4 bg-white border border-gray-300 rounded shadow-sm">
          <Button
            className="text-xs bg-warning-primary"
            onClick={() => handleAction('Deactivate')}
          >
            Deactivate
          </Button>
          <Button
            className="text-xs bg-red-200"
            onClick={() => handleAction('Delete')}
          >
            Delete
          </Button>
        </div>
      );

    if (currentTab === 'inActive')
      return (
        <div className="absolute top-20 -left-3 z-10 flex flex-col space-y-2 w-40 h-28 p-4 bg-white border border-gray-300 rounded shadow-sm">
          <Button
            className="text-xs bg-warning-primary"
            onClick={() => handleAction('Activate')}
          >
            Activate
          </Button>
          <Button
            className="text-xs bg-red-200"
            onClick={() => handleAction('Delete')}
          >
            Delete
          </Button>
        </div>
      );

    if (currentTab === 'pendingQc')
      return (
        <div className="absolute top-20 left-1  z-30 flex flex-col space-y-2 w-32 h-16 p-4 bg-white border border-gray-300 rounded shadow-sm">
          <Button
            className="text-xs bg-warning-primary"
            onClick={() => handleAction('Deactivate')}
          >
            Deactivate
          </Button>
        </div>
      );

    if (currentTab === 'suspended')
      return (
        <div className="absolute top-20 z-30 flex flex-col space-y-2 w-32 bg-white border border-gray-300 rounded shadow-lg">
          <Button
            className="text-xs bg-warning-primary"
            onClick={() => handleAction('Deactivate')}
          >
            Deactivate
          </Button>
        </div>
      );

    if (currentTab === 'locked')
      return (
        <div className="absolute top-9 z-30 flex flex-col space-y-2 w-32 bg-white border border-gray-300 rounded shadow-sm">
          <Button
            className="text-xs bg-warning-primary"
            onClick={() => handleAction('Deactivate')}
          >
            Deactivate
          </Button>
        </div>
      );
  }

  return (
    <div className="">
      <div className="relative flex flex-col space-y-2 px-1">
        {currentTab !== 'locked' ? <Button className="">Edit</Button> : null}
        <div
          ref={nodeRef}
          onClick={() => setIsNodeVisible((prev) => !prev)}
          className="relative"
        >
          <Button className="w-full">
            <div className="relative flex items-center justify-center space-x-1">
              <span className="text-sm">More</span>
              <AiFillCaretDown className="text-white" />
            </div>
          </Button>
          {isNodeVisible ? moreButtons() : null}
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
          <div className="flex flex-col items-center justify-center space-y-4">
            <div className="flex items-center space-x-1">
              <Image src={checkMark} alt="" />
              <span>Are you sure want to {actionType} this product?</span>
            </div>
            <div className="flex items-center justify-center space-x-2">
              <Button className="bg-red-200">No, Cancel</Button>
              <Button className="bg-success-primary">Yes, Confirm</Button>
            </div>
          </div>
        </Modal>
      </div>
    </div>
  );
}
