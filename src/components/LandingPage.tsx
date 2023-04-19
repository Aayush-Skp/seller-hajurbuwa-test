import React, { useEffect, useState } from 'react';
import Hero from './Hero';
import HotSellingProducts from './HotSellingProducts';
import DashboardStats from './DashboardStats';
import { getLandingPageData } from '../services/landingPageService';
// import { getLandingPageData } from '@/services/landingPageService';

export default function LandingPage() {
  const [isLoading, setIsLoading] = useState(true);
  const [landingPageData, setLandingPageData] = useState<any>([]);

  useEffect(() => {
    getLandingPageData()
      .then((res) => {
        console.log(res);
        setIsLoading(false);
        setLandingPageData(res);
      })
      .catch(() => {
        setIsLoading(false);
      });
  }, []);

  if (isLoading) return <div>Loading...</div>;

  if (landingPageData.length === 0)
    return <div>Page Data cannot be loaded</div>;

  return (
    <div>
      <Hero
        openOrders={5}
        todaysSales={landingPageData?.data?.today_sells}
        onlineProducts={landingPageData.product_status_array[0].count}
      />
      <DashboardStats
        pendingOrders={landingPageData?.order_status_array[0]?.count}
        unshippedOrders={landingPageData?.order_status_array[1]?.count}
        newReviews={landingPageData?.data?.new_review}
      />
      {/* <HotSellingProducts products={[]} /> */}
    </div>
  );
}
