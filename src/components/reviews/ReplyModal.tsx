import Image from 'next/image';
import Modal from 'react-modal';
import checkMark from '../../../public/icons/check-mark.svg';
import React, { useState } from 'react';
import { replyToAnOrder } from '../../services/orderServices';
import InputLabel from '../common/InputLabel';
import TextInput from '../common/TextInput';
import ErrorMessage from '../common/ErrorMessage';

export default function ReplyModal(props: any) {
  const { isReplyModalOpen, setIsReplyModalOpen, orderId } = props;

  const [responseState, setResponseState] = useState({
    isLoading: false,
  });

  const [replyMessageValidation, setReplyMessageValidation] = useState({
    isValid: true,
    message: '',
  });

  const [replyMessage, setReplyMessage] = useState('');

  function handleReplyMessageChange(e: React.ChangeEvent<HTMLInputElement>) {
    setReplyMessage(e.target.value);
    setReplyMessageValidation({
      isValid: true,
      message: '',
    });
  }

  function handleFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (replyMessage === '') {
      setReplyMessageValidation({
        isValid: false,
        message: 'Please enter reply message',
      });
      return;
    }

    // replyToAnOrder(orderId, replyMessage).then((res) => {
    //   setResponseState({
    //     isLoading: false,
    //   });
    // });
  }

  return (
    <div>
      <Modal
        isOpen={isReplyModalOpen}
        onRequestClose={() => setIsReplyModalOpen(false)}
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
            backgroundColor: 'rgba(0, 0, 0, 0.4)',
          },
        }}
      >
        <form onSubmit={handleFormSubmit} className="space-y-4 w-1/2">
          <div>
            <div className="flex items-center space-x-1">
              <Image src={checkMark} alt="" />
              <span>Write reply message to this review.</span>
            </div>
          </div>

          <div className="space-y-1">
            <InputLabel label="Message" htmlFor="replyMessage" />
            <TextInput onChange={handleReplyMessageChange} id="replyMessage" />
            <ErrorMessage message={replyMessageValidation.message} />
          </div>

          <div className="space-x-4">
            <button
              className="text-error-primary border border-error-primary hover:text-error-secondary hover:border-error-secondary transition-colors px-5 py-1 rounded"
              onClick={() => setIsReplyModalOpen(false)}
            >
              No, Cancel
            </button>
            <button
              type="submit"
              className="text-white border border-accent-primary bg-accent-primary  px-5 py-1 rounded hover:bg-accent-secondary transition-colors"
            >
              {!responseState.isLoading ? 'Submit' : 'Loading...'}
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
