import checkMark from '../../../public/icons/check-mark.svg';

import Modal from 'react-modal';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';

type ProductAddSuccessModalProps = {
  isProductAddSuccessModalOpen: boolean;
  setIsProductAddSuccessModalOpen: (value: boolean) => void;
  isUpdate: boolean;
};

export default function ProductAddSuccessModal(
  props: ProductAddSuccessModalProps
) {
  const {
    isProductAddSuccessModalOpen,
    setIsProductAddSuccessModalOpen,
    isUpdate,
  } = props;

  const router = useRouter();

  return (
    <div>
      <div>
        <button
          onClick={() => setIsProductAddSuccessModalOpen(true)}
          type="button"
          className="py-3 px-16 text-sm border border-blue-700 rounded bg-blue-700 text-white"
        >
          Discard
        </button>
      </div>
      <Modal
        isOpen={isProductAddSuccessModalOpen}
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
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          },
        }}
      >
        <div className="">
          <div className="flex flex-col space-y-5">
            <div className="flex items-center space-x-1">
              <Image src={checkMark} alt="" />
              <span>
                Your product has been {isUpdate ? 'updated' : 'added'}{' '}
                successfully.
              </span>
            </div>
            <div className="flex justify-center">
              <div className="flex space-x-5">
                <Link
                  href="/product-management"
                  className="px-3 py-2 rounded border border-accent-primary text-sm">
                  
                    View products list
                  
                </Link>
                <button
                  onClick={() => router.reload()}
                  className="px-3 py-2 rounded border text-white bg-accent-primary border-accent-primary text-sm"
                >
                  Add another product
                </button>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
