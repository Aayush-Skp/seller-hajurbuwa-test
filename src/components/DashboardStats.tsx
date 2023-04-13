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
    <div
      className="flex flex-col justify-center items-start w-1/2 m-10 rounded-lg"
      style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)' }}
    >
      <div className="border-b-[4px] border-gray-500 w-full p-2 text-center font-medium">
        Important! To increase buyer satisfaction, you need to check them
        regularly.
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
            <span>Orders</span>
          </div>
          <span>{newReviews}</span>
        </div>
      </div>
    </div>
  );
};

export default DashboardStats;
