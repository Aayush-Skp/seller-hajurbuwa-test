import Link from 'next/link';

type DashboardStatsProps = {
  pendingOrders: number;
  unshippedOrders: number;
  newReviews: number;
};

const DashboardStats = ({
  pendingOrders,
  unshippedOrders,
  newReviews,
}: DashboardStatsProps) => {
  return (
    <div className="">
      <div
        className="flex flex-col justify-center items-start w-1/2 m-10 rounded-lg bg-[#f2f2f2]"
        style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)' }}
      >
        <div className="border-b-[4px] border-gray-500 w-full pl-7 pr-3 py-1 text-center font-medium">
          Important! To increase visibility and buyer satisfaction, you need to
          check them regularly.
        </div>
        <div className="flex items-center justify-between w-full p-10">
          <div className="w-32 h-32 bg-gray-300 text-black text-center rounded-full flex flex-col items-center justify-center">
            <div className="uppercase flex flex-col text-sm">
              <span>Pending</span>
              <span>Orders</span>
            </div>
            <span>{pendingOrders}</span>
          </div>
          <div className="w-32 h-32 bg-gray-300 text-black text-center rounded-full flex flex-col items-center justify-center">
            <div className="uppercase flex flex-col text-sm">
              <span>Unshipped</span>
              <span>Orders</span>
            </div>
            <span>{unshippedOrders}</span>
          </div>
          <div className="w-32 h-32 bg-gray-300 text-black text-center rounded-full flex flex-col items-center justify-center">
            <div className="uppercase flex flex-col text-sm">
              <span>New</span>
              <span>Reviews</span>
            </div>
            <span>{newReviews}</span>
          </div>
        </div>
      </div>
      <div
        className="flex flex-col w-1/2 m-10 rounded-lg bg-[#f2f2f2] py-5"
        style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)' }}
      >
        <div className="px-10 border-b-[4px] border-gray-500 w-full font-medium">
          Get started with your product listing.
        </div>
        <div className="flex items-center justify-between w-full p-10">
          Easy to list a product system steps through all the requirements for
          creating your listing.
        </div>

        <div className="w-full pl-10">
          <Link href="/product/add">
            <a className="px-5 py-2 bg-blue-700 text-white">Add Product</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
