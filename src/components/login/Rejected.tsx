import Image from 'next/image';
import accountVerificationRejected from '../../../public/images/accountVerificaitonRejected.svg';
import Link from 'next/link';

export default function Rejected(sellerData: any) {
  console.log(sellerData);
  return (
    <section className="my-10">
      <div className="px-6 py-4 w-full my-5">
        <div className="flex flex-col items-center justify-center w-full space-y-5">
          <div className="flex flex-col items-center justify-center space-y-3">
            <span>Dear {sellerData?.sellerData.fname},</span>
            <span className="text-3xl font-semibold text-center">
              Your Business Account has been Rejected
            </span>
            <span className="text-xs text-error-primary text-center">
              {sellerData?.sellerData?.rejection_reason}
            </span>
          </div>
          <div>
            <Image src={accountVerificationRejected} alt="" />
          </div>
          <span className="text-xs">
            Please update your details to re-submit Profile for review.
          </span>
          <Link
            as="/update-business-details"
            href={{
              pathname: '/update-business-details',
              query: sellerData?.sellerData,
            }}
          >
            <a className="w-full px-20 text-center bg-accent-primary py-3 border border-accent-primary rounded text-white font-semibold">
              Update Seller Account
            </a>
          </Link>
          <Link href="/">
            <a className="w-full text-center px-20 py-3 border border-accent-primary rounded text-accent-primary font-semibold">
              Back To Homepage
            </a>
          </Link>
        </div>
      </div>
    </section>
  );
}
