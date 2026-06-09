import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { AiFillCaretDown } from 'react-icons/ai';
import {
  HiOutlineDocumentDuplicate,
  HiOutlinePencil,
  HiOutlineTrash,
} from 'react-icons/hi';
import { MdOutlineBlock, MdOutlineCheckCircleOutline } from 'react-icons/md';
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

type MenuItem =
  | {
      type: 'link';
      label: string;
      href: string;
      tone: 'neutral' | 'success' | 'warning' | 'danger';
      icon: React.ReactNode;
    }
  | {
      type: 'action';
      label: string;
      action: string;
      tone: 'neutral' | 'success' | 'warning' | 'danger';
      icon: React.ReactNode;
    };

const toneClasses: Record<MenuItem['tone'], string> = {
  neutral: 'text-gray-700 hover:bg-gray-50',
  success: 'text-success-primary hover:bg-success-tertiary/40',
  warning: 'text-amber-700 hover:bg-amber-50',
  danger: 'text-error-primary hover:bg-error-tertiary/40',
};

const getMenuItems = (tabId: string, productId: string): MenuItem[] => {
  const duplicateItem: MenuItem = {
    type: 'link',
    label: 'Duplicate',
    href: `/product/duplicate?id=${productId}`,
    tone: 'success',
    icon: <HiOutlineDocumentDuplicate className="text-base" />,
  };

  switch (tabId) {
    case 'online':
      return [
        duplicateItem,
        {
          type: 'action',
          label: 'Deactivate',
          action: 'Deactivate',
          tone: 'warning',
          icon: <MdOutlineBlock className="text-base" />,
        },
        {
          type: 'action',
          label: 'Delete',
          action: 'Delete',
          tone: 'danger',
          icon: <HiOutlineTrash className="text-base" />,
        },
      ];
    case 'deactivated':
      return [
        duplicateItem,
        {
          type: 'action',
          label: 'Activate',
          action: 'Activate',
          tone: 'success',
          icon: <MdOutlineCheckCircleOutline className="text-base" />,
        },
        {
          type: 'action',
          label: 'Delete',
          action: 'Delete',
          tone: 'danger',
          icon: <HiOutlineTrash className="text-base" />,
        },
      ];
    case 'pending':
    case 'suspended':
      return [
        duplicateItem,
        {
          type: 'action',
          label: 'Delete',
          action: 'Delete',
          tone: 'danger',
          icon: <HiOutlineTrash className="text-base" />,
        },
      ];
    case 'locked':
      return [
        {
          type: 'action',
          label: 'Delete',
          action: 'Delete',
          tone: 'danger',
          icon: <HiOutlineTrash className="text-base" />,
        },
      ];
    default:
      return [];
  }
};

export default function ActionButtons({
  currentTab,
  productId,
  getAllProducts,
}: ActionButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [actionType, setActionType] = useState<string | undefined>();
  const [menuPosition, setMenuPosition] = useState({ top: 0, left: 0 });
  const [apiResponse, setApiResponse] = useState({
    loading: false,
    message: '',
  });

  const { nodeRef, isNodeVisible, setIsNodeVisible } = useClickAwayListener();
  const menuItems = useMemo(
    () => getMenuItems(currentTab.id, productId),
    [currentTab.id, productId]
  );

  const updateMenuPosition = useCallback(() => {
    if (!nodeRef.current) return;

    const rect = nodeRef.current.getBoundingClientRect();
    const menuWidth = 176;

    setMenuPosition({
      top: rect.bottom + 6,
      left: Math.max(8, rect.right - menuWidth),
    });
  }, [nodeRef]);

  useEffect(() => {
    if (!isNodeVisible) return;

    updateMenuPosition();

    window.addEventListener('scroll', updateMenuPosition, true);
    window.addEventListener('resize', updateMenuPosition);

    return () => {
      window.removeEventListener('scroll', updateMenuPosition, true);
      window.removeEventListener('resize', updateMenuPosition);
    };
  }, [isNodeVisible, updateMenuPosition]);

  function handleAction(type: string) {
    setActionType(type);
    setIsModalOpen(true);
    setIsNodeVisible(false);
  }

  function handleProductAction() {
    setApiResponse({
      loading: true,
      message: '',
    });

    if (actionType === 'Deactivate')
      deactivateProduct(productId)
        .then(() => {
          getAllProducts();
          setIsModalOpen(false);
        })
        .catch(console.log);
    if (actionType === 'Activate')
      activateProduct(productId)
        .then(() => {
          getAllProducts();
          setIsModalOpen(false);
        })
        .catch(console.log);
    if (actionType === 'Delete')
      deleteProduct(productId)
        .then(() => {
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

  return (
    <div className="relative flex flex-col gap-2 px-1">
      {currentTab.id !== 'locked' ? (
        <Link
          href={`/product/update?id=${productId}`}
          className="inline-flex items-center justify-center gap-1 rounded border border-gray-300 bg-white px-3 py-1.5 text-sm font-medium text-gray-700 transition-colors hover:border-accent-primary hover:text-accent-primary"
        >
          <HiOutlinePencil className="text-sm" />
          Edit
        </Link>
      ) : null}
      {menuItems.length > 0 ? (
        <div
          ref={nodeRef}
          onClick={() => {
            setIsNodeVisible((prev) => !prev);
          }}
          className="relative"
        >
          <Button className="w-full !bg-gray-800 hover:!bg-gray-900">
            <div className="relative flex items-center justify-center gap-1">
              <span className="text-sm">More</span>
              <AiFillCaretDown
                className={`text-white transition-transform ${
                  isNodeVisible ? 'rotate-180' : ''
                }`}
              />
            </div>
          </Button>
          {isNodeVisible ? (
            <div
              className="fixed z-[100] min-w-[11rem] overflow-hidden rounded-lg border border-gray-200 bg-white py-1 shadow-xl ring-1 ring-black/5"
              style={{
                top: menuPosition.top,
                left: menuPosition.left,
              }}
            >
              {menuItems.map((item, index) => {
                const itemClassName = `flex w-full items-center gap-2 px-3 py-2 text-left text-sm font-medium transition-colors ${
                  index > 0 ? 'border-t border-gray-100 ' : ''
                }${toneClasses[item.tone]}`;

                if (item.type === 'link') {
                  return (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={itemClassName}
                      onClick={() => setIsNodeVisible(false)}
                    >
                      {item.icon}
                      {item.label}
                    </Link>
                  );
                }

                return (
                  <button
                    key={item.label}
                    type="button"
                    className={itemClassName}
                    onClick={() => handleAction(item.action)}
                  >
                    {item.icon}
                    {item.label}
                  </button>
                );
              })}
            </div>
          ) : null}
        </div>
      ) : null}

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
