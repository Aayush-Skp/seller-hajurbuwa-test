import React, { useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import Button from '../common/Button';
import Modal from 'react-modal';
import Image from 'next/image';
import checkMark from '../../../public/icons/check-mark.svg';
import { useClickAwayListener } from '../../hooks/useClickAwayListener';
import {
  activateProduct,
  deactivateProduct,
  deleteProduct,
} from '../../services/productService';
import Link from 'next/link';

type ActionButtonProps = {
  productId: string;
  currentTab: {
    id: string;
    label: string;
  };
  getAllProducts: () => void;
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

export default function ActionButtons({
  currentTab,
  productId,
  getAllProducts,
}: ActionButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<string | undefined>();
  const [apiResponse, setApiResponse] = useState({
    loading: false,
    message: '',
  });

  const { nodeRef, isNodeVisible, setIsNodeVisible } = useClickAwayListener();

  function handleAction(type: string) {
    setActionType(type);
    setIsModalOpen(true);
  }

  function handleProductAction() {
    setApiResponse({
      loading: true,
      message: '',
    });

    if (actionType === 'Deactivate')
      deactivateProduct(productId)
        .then((res) => {
          getAllProducts();
          setIsModalOpen(false);
        })
        .catch(console.log);
    if (actionType === 'Activate')
      activateProduct(productId)
        .then((res) => {
          getAllProducts();
          setIsModalOpen(false);
        })
        .catch(console.log);
    if (actionType === 'Delete')
      deleteProduct(productId)
        .then((res) => {
          getAllProducts();
          setIsModalOpen(false);
        })
        .catch((err) => {
          setApiResponse({
            loading: false,
            message: '',
          });

          console.log(err);
        });
  }

  function MoreButtons() {
    if (currentTab.id === 'online')
      return (
        <div className="absolute -left-3 z-30 flex flex-col space-y-2 w-40 p-4 bg-white border border-gray-300 rounded shadow-sm">
          <Link href={`/product/duplicate?id=${productId}`}>
            <a className="text-xs border border-success-primary text-success-primary px-5 py-2">
              Duplicate
            </a>
          </Link>
          <button
            className="text-xs border border-accent-primary text-accent-primary px-5 py-2"
            onClick={() => handleAction('Deactivate')}
          >
            Deactivate
          </button>
          <button
            className="text-xs border border-error-primary text-error-primary px-5 py-2"
            onClick={() => handleAction('Delete')}
          >
            Delete
          </button>
        </div>
      );

    if (currentTab.id === 'deactivated')
      return (
        <div className="absolute top-10 -left-3 z-30 flex flex-col space-y-2 w-40 p-4 bg-white border border-gray-300 rounded shadow-sm">
          <Link href={`/product/duplicate?id=${productId}`}>
            <a className="text-xs border border-success-primary text-success-primary px-5 py-2">
              Duplicate
            </a>
          </Link>

          <button
            className="text-xs border border-accent-primary text-accent-primary px-5 py-2"
            onClick={() => handleAction('Activate')}
          >
            Activate
          </button>
          <button
            className="text-xs border border-error-primary text-error-primary px-5 py-2"
            onClick={() => handleAction('Delete')}
          >
            Delete
          </button>
        </div>
      );

    if (currentTab.id === 'pending')
      return (
        <div className="absolute top-10 -left-3 z-30 flex flex-col w-40 p-4 bg-white border border-gray-300 rounded shadow-sm">
          <Link href={`/product/duplicate?id=${productId}`}>
            <a className="text-xs border border-success-primary text-success-primary px-5 py-2">
              Duplicate
            </a>
          </Link>
          <button
            className="text-xs border border-error-primary text-error-primary px-5 py-2"
            onClick={() => handleAction('Delete')}
          >
            Delete
          </button>
        </div>
      );

    if (currentTab.id === 'suspended')
      return (
        <div className="absolute top-10 -left-3 z-30 flex flex-col space-y-2 w-40 p-4 bg-white border border-gray-300 rounded shadow-sm">
          <Link href={`/product/duplicate?id=${productId}`}>
            <a className="text-xs border border-success-primary text-success-primary px-5 py-2">
              Duplicate
            </a>
          </Link>
          <button
            className="text-xs border border-error-primary text-error-primary px-5 py-2"
            onClick={() => handleAction('Delete')}
          >
            Delete
          </button>
        </div>
      );

    if (currentTab.id === 'locked')
      return (
        <div className="absolute top-10 z-30 flex flex-col space-y-2 w-32 bg-white border border-gray-300 rounded shadow-sm">
          <button
            className="text-xs border border-error-primary text-error-primary px-5 py-2"
            onClick={() => handleAction('Delete')}
          >
            Delete
          </button>
        </div>
      );

    return null;
  }

  return (
    <div className="relative flex flex-col space-y-2 px-1">
      {currentTab.id !== 'locked' ? (
        <Link href={`/product/update?id=${productId}`} className="">
          <a
            className="bg-blue-700 text-white px-3 py-1 rounded"
            target="_blank"
          >
            Edit
          </a>
        </Link>
      ) : null}
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
        {isNodeVisible ? <MoreButtons /> : null}
      </div>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => {
          setIsModalOpen(false);
        }}
        className="w-2/3 h-2/5 bg-white rounded-md flex flex-col justify-center items-center"
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
        ariaHideApp={false}
      >
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="flex items-center space-x-1">
            <Image src={checkMark} alt="" />
            <span>Are you sure want to {actionType} this product?</span>
          </div>
          <div className="flex items-center justify-center space-x-5">
            <button
              onClick={() => setIsModalOpen(false)}
              className="border border-error-primary px-5 py-1 text-error-primary rounded"
            >
              No, Cancel
            </button>
            <button
              onClick={handleProductAction}
              className="bg-accent-primary px-5 py-1 text-white rounded"
            >
              {apiResponse.loading ? 'Please wait...' : 'Yes, Confirm'}
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
