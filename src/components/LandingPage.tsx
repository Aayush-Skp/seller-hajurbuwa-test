import React, { useEffect, useState } from 'react';
import Hero from './Hero';
// import HotSellingProducts from './HotSellingProducts';
import DashboardStats from './DashboardStats';
import { getLandingPageData } from '../services/landingPageService';
import AddProductSection from './AddProductSection';
import Image from 'next/image';
import logo from '../../public/icons/hajurbuwa-logo.svg';

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [landingPageData, setLandingPageData] = useState<any>([]);

  useEffect(() => {
    getLandingPageData()
      .then((res) => {
        setIsLoading(false);
        setLandingPageData(res);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading)
    return (
      <div>
        <div className="flex items-center justify-center h-screen animate-ping">
          <Image height={50} width={50} src={logo} alt="logo" />
        </div>
      </div>
    );

  if (landingPageData.length === 0)
    return <div className="mt-16">Page Data cannot be loaded</div>;

  return (
    <div>
      <Hero
        openOrders={
          landingPageData.order_status_array[0].count +
          landingPageData.order_status_array[1].count
        }
        todaysSales={landingPageData?.data?.today_sells}
        onlineProducts={landingPageData.product_status_array[1].count}
      />
      <DashboardStats
        pendingOrders={landingPageData?.order_status_array[0]?.count}
        unshippedOrders={landingPageData?.order_status_array[1]?.count}
        newReviews={landingPageData?.data?.new_review}
      />
      <AddProductSection />
      {/* <HotSellingProducts products={[]} /> */}
    </div>
  );
}
