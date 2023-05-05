import Image from 'next/image';
import Modal from 'react-modal';
import checkMark from '../../../public/icons/check-mark.svg';

type violationDescriptionModalProps = {
  isViolationDescriptionModalOpen: boolean;
  setIsViolationDescriptionModalOpen: (value: boolean) => void;
  violationDescription: string;
};

export default function ViolationDescriptionModal({
  isViolationDescriptionModalOpen,
  violationDescription,
  setIsViolationDescriptionModalOpen,
}: violationDescriptionModalProps) {
  return (
    <div>
      <Modal
        isOpen={isViolationDescriptionModalOpen}
        onRequestClose={() => {
          setIsViolationDescriptionModalOpen(false);
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
            backgroundColor: 'rgba(0, 0, 0, 0.2)',
          },
        }}
        ariaHideApp={false}
      >
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="flex items-center space-x-1">
            <Image src={checkMark} alt="" />
            <span>Violation Description</span>
          </div>
          <span className="text-sm">{violationDescription}</span>
          <button
            className="bg-accent-primary px-20 rounded py-2 text-white"
            onClick={() => setIsViolationDescriptionModalOpen(false)}
          >
            Okay
          </button>
        </div>
      </Modal>
    </div>
  );
}
