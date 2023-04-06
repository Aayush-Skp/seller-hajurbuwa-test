import React from 'react';

export default function AccountInfo() {
  return (
    <section>
      <div className="space-y-6">
        <div className="flex">
          <p className="w-56">Seller First Name</p>
          <p className="px-2 border py-1 border-black w-56">Patrick</p>
        </div>
        <div className="flex">
          <p className="w-56">Seller Last Name</p>
          <p className="px-2 border py-1 border-black w-56">Neupane</p>
        </div>{' '}
        <div className="flex">
          <p className="w-56">Seller Mobile Number</p>
          <p className="px-2 border py-1 border-black w-56">9745621452</p>
        </div>{' '}
        <div className="flex">
          <p className="w-56">Email Address</p>
          <p className="px-2 border py-1 border-black w-56">
            rabbitfoot@gmail.com
          </p>
        </div>{' '}
        <div className="flex">
          <p className="w-56">Business Name</p>
          <p className="px-2 py-1 border border-black w-56">
            Pratik Trading Pvt. Ltd.
          </p>
        </div>{' '}
        <div className="flex">
          <p className="w-56">PAN Number</p>
          <p className="px-2 py-1 border border-black w-56">609941532</p>
        </div>
        <div className="flex">
          <p className="w-56">PAN Document</p>
          <p className="px-2 py-1 border border-black w-56">
            sjankt aodnkaksa.jpg
          </p>
        </div>
      </div>
    </section>
  );
}
