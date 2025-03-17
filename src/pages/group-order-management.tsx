// pages/group-order-management.tsx

import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import PageWrapper from '../components/PageWrapper';
import authenticatedRoute from '../components/WithAuth';
import GroupOrders from '../components/groupOrderManagement';

import Image from 'next/image';
import searchIcon from '../../public/icons/searchIcon.svg'; // Adjust path if needed
import { httpClient } from '../config/httpClient';

function GroupOrderManagementPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [groupOrders, setGroupOrders] = useState([]); // State for fetched data

  useEffect(() => {
    async function fetchGroupOrders() {
      try {
        // Retrieve token from localStorage (stored during login)
        const storedUserDetails = localStorage.getItem('userDetails');
        const userDetails = storedUserDetails ? JSON.parse(storedUserDetails) : null;
        const token = userDetails?.token || '';

        // Make the API call using httpClient with POST
        const response = await httpClient.post(
          '/seller/get-group-orders',
          {}, // If no request body is needed, pass an empty object
          {
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${token}`,
            },
          }
        );

        const result = response.data;
        if (result.status === 'success') {
          setGroupOrders(result.data); // Store the fetched group orders
        } else {
          console.error('Failed to fetch group orders');
        }
      } catch (error) {
        console.error('Error fetching group orders:', error);
      }
    }

    fetchGroupOrders();
  }, []);

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
        {/* Heading + search bar */}
        <div className="flex items-center justify-between mt-10 mb-2">
          <h2 className="text-xl font-bold">Group Order Management</h2>
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

        {/* Horizontal lines */}
        <div className="border-b border-gray-300" />
        <div className="border-b border-gray-300 mb-4" />

        {/* Group Orders Table */}
        <GroupOrders groupOrders={groupOrders} />
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(GroupOrderManagementPage);