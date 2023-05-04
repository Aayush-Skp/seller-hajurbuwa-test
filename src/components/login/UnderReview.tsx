import Image from 'next/image';
import accountUnderReview from '../../../public/images/accountUnderReview.svg';
import Link from 'next/link';

export default function UnderReview({ username }: { username: string }) {
  return (
    <section className="w-full">
      <div className="px-6 py-4 w-full my-5">
        <div className="flex flex-col items-center justify-center w-full space-y-5">
          <div className="flex flex-col items-center justify-center space-y-3">
            <span>Dear {username},</span>
            <span className="text-3xl font-semibold text-center">
              Your Business Account is under Review.
            </span>
            <span className="text-xs">
              It usually takes
              <span className="text-accent-primary mx-1">48 Hours</span>
              to verify a business.
            </span>
          </div>
          <div>
            <Image src={accountUnderReview} alt="" />
          </div>
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
