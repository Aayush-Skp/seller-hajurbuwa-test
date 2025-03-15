// pages/group-order-management.tsx

import React, { useState } from 'react';
import Head from 'next/head';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';
import GroupOrders from '../components/groupOrderManagement';

import Image from 'next/image';
import searchIcon from '../../public/icons/searchIcon.svg'; // Adjust path if needed

function GroupOrderManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');

  // Placeholder search handler
  function handleSearch(e: React.FormEvent) {
    e.preventDefault();
    console.log('Searching for:', searchTerm);
  }

  return (
    <>
      <Head>
        <meta name="viewport" content="width=1360" />
      </Head>

      <PageWrapper>
        {/* 
          1) Heading + search bar on the same line 
          Add some top margin (mt-4) to push it down from the nav,
          and bottom margin (mb-2) for spacing before the lines.
        */}
        <div className="flex items-center justify-between mt-10 mb-2">
          <h2 className="text-xl font-bold">Group Order Management</h2>

          {/* Search bar */}
          <form onSubmit={handleSearch} className="relative">
            <div className="absolute flex items-center h-full pl-2 pointer-events-none">
              <Image src={searchIcon} alt="search" width={16} height={16} />
            </div>
            <input
              type="text"
              placeholder="Search Orders(s) by Order Id"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 text-base font-normal w-[300px] sm:w-[400px] md:w-[500px] h-[35px] bg-gray-100 rounded-md outline-none"
            />
          </form>
        </div>

        {/* 
          2) Two horizontal lines below the heading. 
          The first line is border-gray-300, 
          the second line also border-gray-300 (you can change colors if you want).
        */}
        <div className="border-b border-gray-300" />
        <div className="border-b border-gray-300 mb-4" />

        {/* 
          3) The row of 4 clickable headings + placeholder table 
          from your existing "groupOrderManagement.tsx" in components.
        */}
        <GroupOrders />
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(GroupOrderManagementPage);
