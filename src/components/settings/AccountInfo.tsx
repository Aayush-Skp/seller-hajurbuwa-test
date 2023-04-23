import React, { useEffect, useState } from 'react';
import { imageServerBaseUrl } from '../../constants/serverConstants';

export default function AccountInfo() {
  const [sellerDetails, setSellerDetails] = useState<any>(null);

  useEffect(() => {
    const value = localStorage.getItem('userDetails');

    if (typeof value === 'string') {
      setSellerDetails(JSON.parse(value));
    }
  }, []);

  return (
    <section>
      <div className="space-y-6">
        <div className="flex">
          <p className="w-56">Seller First Name</p>
          <p className="px-2 border py-1 border-black w-56">
            {sellerDetails?.first_name}
          </p>
        </div>
        <div className="flex">
          <p className="w-56">Seller Last Name</p>
          <p className="px-2 border py-1 border-black w-56">
            {sellerDetails?.last_name}
          </p>
        </div>
        <div className="flex">
          <p className="w-56">Seller Mobile Number</p>
          <p className="px-2 border py-1 border-black w-56">
            {sellerDetails?.phone}
          </p>
        </div>
        <div className="flex">
          <p className="w-56">Email Address</p>
          <p className="px-2 border py-1 border-black w-56">
            {sellerDetails?.email}
          </p>
        </div>
        <div className="flex">
          <p className="w-56">Business Name</p>
          <p className="px-2 py-1 border border-black w-56">
            {sellerDetails?.business_name}
          </p>
        </div>
        <div className="flex">
          <p className="w-56">PAN Number</p>
          <p className="px-2 py-1 border border-black w-56">
            {sellerDetails?.pan}
          </p>
        </div>
        <div className="flex">
          <p className="w-56">PAN Document</p>
          <a
            href={`${imageServerBaseUrl}${sellerDetails?.pan_image}`}
            target="_blank"
            className="px-2 py-1 border border-black w-56"
          >
            Pan image
          </a>
        </div>
      </div>
    </section>
  );
}
