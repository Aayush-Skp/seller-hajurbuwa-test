import React, { useState } from 'react';
import checkMark from '../../../public/icons/check-mark.svg';

import Modal from 'react-modal';
import Button from '../common/Button';
import Link from 'next/link';
import Image from 'next/image';

export default function DiscardModal() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div>
        <button
          onClick={() => setIsOpen(true)}
          type="button"
          className="py-3 px-16 text-sm border border-blue-700 rounded bg-blue-700 text-white"
        >
          Discard
        </button>
      </div>
      <Modal
        isOpen={isOpen}
        onRequestClose={() => setIsOpen(false)}
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
                Are you sure want to discard? This process is not reversible.
              </span>
            </div>
            <div className="flex justify-center">
              <div className="flex space-x-5">
                <button
                  onClick={() => setIsOpen(false)}
                  className="px-3 py-2 rounded border border-accent-primary text-sm"
                >
                  No, Cancel
                </button>
                <Link href="/dashboard">
                  <a className="px-3 py-2 rounded border text-white bg-accent-primary border-accent-primary text-sm">
                    Yes, Confirm
                  </a>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
