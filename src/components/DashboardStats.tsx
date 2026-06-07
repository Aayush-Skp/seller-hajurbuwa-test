import Link from "next/link";
import { MdInsights } from "react-icons/md";
import { HiOutlineDocumentText } from "react-icons/hi";
import { FaShippingFast } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";

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
      className="flex flex-col justify-center items-start space-x-8 w-1/2 m-10 rounded-lg"
      style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)" }}
    >
      <div className="row py-4 w-full flex items-center justify-start px-10 text-xxl">
        <MdInsights /> <span className="ml-4">Key Insights </span>
      </div>
      <div className="border-t-2 w-11/12 pt-2 text-xl">
        Important! To increase buyer satisfaction, you need to check them
        reguralry.
        <div className="row py-4 w-full flex items-start justify-start">
          <Link
            href="/order-management"
            style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)" }}
            className="flex flex-col justify-around items-start space-x-8 h-42 py-5 w-full m-2 rounded-lg">

            <DashboardElements
              number={pendingOrders}
              text="Pending Orders"
              icon={<HiOutlineDocumentText />}
            />

          </Link>
          <Link
            href="/order-management?tab=unshipped"
            style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)" }}
            className="flex flex-col justify-around items-start space-x-8 h-42 py-5 w-full m-2 rounded-lg">

            <DashboardElements
              number={unshippedOrders}
              text="Unshipped Orders"
              icon={<FaShippingFast />}
            />

          </Link>
          <Link
            href={"/review-management"}
            style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)" }}
            className="flex flex-col justify-around items-start space-x-8 h-42 py-5 w-full m-2 rounded-lg">

            <DashboardElements
              number={newReviews}
              text="New Reviews"
              icon={<MdOutlineRateReview />}
            />

          </Link>
        </div>
      </div>
    </div>
  );
};

type dashboardProp = {
  number: number;
  text: string;
  icon: any;
};
const DashboardElements = (DashboardProp: dashboardProp) => {
  const { number, text, icon } = DashboardProp;
  return (
    <div
      className="flex flex-col justify-around items-start space-x-8 h-42 py-5 w-full m-2 rounded-lg"
    >
      <span
        className="ml-6 h-14 w-14 rounded-full text-brand-600 text-xxl flex justify-center items-center opacity-1 border-2 border-brand-600"
        style={{ backgroundColor: "rgba(199,1,1,0.25" }}
      >
        {icon}
      </span>
      <span className="ml-5 text-gray-700">{text}</span>
        <div className="text-3xl text-black underline">{number}</div>
    </div>
  );
};

export default DashboardStats;
