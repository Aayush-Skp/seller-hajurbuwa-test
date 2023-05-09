import React, { useState } from 'react';
import { useTable } from 'react-table';
import Image from 'next/image';
import Button from '../common/Button';
import Link from 'next/link';
import ChangeOrderStatusModal from './ChangeOrderStatusModal';
import PackagingSlip from './PackagingSlip';
import searchIcon from '../../../public/icons/searchIcon.svg';
import cancelIcon from '../../../public/icons/cancel.svg';
import { Tab } from '.';
import { imageServerBaseUrl } from '../../constants/serverConstants';
import logo from '../../../public/icons/hajurbuwa-logo.svg';

type ITableData = {
  id?: string | number;
  product_name: string;
  product_id: string;
  items_included: string;
  cover_image: string;
  order_code: string;
  quantity: number;
  sub_total: number;
  order_date: string;
  order_status: string;
  time_left: string;
  action?: string;
};

type ProductManagementTableProps = {
  data: ITableData[];
  productStatus: Tab;
  getAllOrders: () => void;
  isLoading: boolean;
};

type TableHeader =
  | 'Product'
  | 'Order Details'
  | 'Order Status'
  | 'Time Left'
  | 'Action';

type Accessor =
  | 'product_name'
  | 'order_code'
  | 'order_status'
  | 'time_left'
  | 'action';

const columns: { Header: TableHeader; accessor: Accessor }[] = [
  { Header: 'Product', accessor: 'product_name' },
  { Header: 'Order Details', accessor: 'order_code' },
  { Header: 'Order Status', accessor: 'order_status' },
  { Header: 'Time Left', accessor: 'time_left' },
  { Header: 'Action', accessor: 'action' },
];

const OrdersTable: React.FC<ProductManagementTableProps> = ({
  data,
  productStatus,
  getAllOrders,
  isLoading,
}) => {
  const [isPrintSlip, setIsPrintSlip] = useState(false);

  const [isOrderStatusModelOpen, setIsOrderStatusModelOpen] = useState(false);

  const [orderStatus, setOrderStatus] = useState({
    orderId: '',
    status: '',
  });

  const { rows, prepareRow, headerGroups, getTableProps, getTableBodyProps } =
    useTable({ columns, data });

  function formatDate(date: string) {
    return new Date(date).toLocaleTimeString('en-us', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
    });
  }

  return (
    <div className="border-3 border-gray-150">
      {!isLoading ? (
        data?.length === 0 ? (
          <div className="flex justify-center mt-10">No orders available</div>
        ) : (
          <table {...getTableProps()} className="w-full border-x-4">
            <thead className="border-b-2 h-5 font-bold bg-[#f5f5f5]">
              {headerGroups.map((headerGroup: any, i: number) => (
                <tr
                  className="text-center"
                  {...headerGroup.getHeaderGroupProps()}
                  key={i}
                >
                  {headerGroup.headers.map((column: any, i: number) => {
                    return (
                      <th
                        {...column.getHeaderProps()}
                        className="py-2 text-base uppercase text-black opacity-50"
                        key={i}
                      >
                        {column.render('Header')}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody {...getTableBodyProps()} className="text-center">
              {rows.map((row: any, i: number) => {
                prepareRow(row);
                return (
                  <tr
                    {...row.getRowProps()}
                    className="border-b-2 py-5 text-md"
                    key={i}
                  >
                    {row.cells.map((cell: any, i: number) => {
                      console.log(row.original)
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="text-md text-black"
                          key={i}
                        >
                          {cell.column.Header === 'Product' ? (
                            <div className="flex space-x-2 py-1 px-2">
                              <div>
                                {row?.original?.product_cover_image ? (
                                  <Image
                                    height={80}
                                    width={80}
                                    src={`${imageServerBaseUrl}${row.original.product_cover_image}`}
                                    alt=""
                                  />
                                ) : null}
                              </div>
                              <div className="flex flex-col items-start space-y-1">
                                <div className="text-sm text-accent-primary text-start">
                                  <p>{row.original.product_name}</p>
                                  <p>{row.original.product_included_item}</p>
                                </div>
                                <div>
                                  <p>Id: {row.original.product_id}</p>
                                </div>
                              </div>
                            </div>
                          ) : cell.column.Header === 'Order Details' ? (
                            <div className="w-full flex items-center justify-center">
                              <div className="flex flex-col items-start justify-between space-y-1 text-xs">
                                <div className="space-x-1">
                                  <span>Order Id: </span>
                                  <span className="font-semibold">
                                    {row.original.order_id}
                                  </span>
                                </div>
                                <div className="space-x-1">
                                  <span>Quantity: </span>
                                  <span className="font-semibold">
                                    {row.original.quantity}{' '}
                                    {row.original.unit === 'per pc'
                                      ? 'pcs'
                                      : row.original.unit}
                                  </span>
                                </div>
                                <div className="space-x-1">
                                  <span>Item Subtotal:</span>
                                  <span className="font-semibold">
                                    {row.original.amount} NPR
                                  </span>
                                </div>
                                <div className="space-x-1">
                                  <span>Order Date:</span>
                                  <span className="font-semibold">
                                    {formatDate(row.original.order_date)}
                                  </span>
                                </div>
                                <Link
                                  href={`/order?order_id=${row.original.id}`}
                                >
                                  <a
                                    target="_blank"
                                    className="text-xs text-accent-primary hover:underline"
                                  >
                                    See order details
                                  </a>
                                </Link>
                              </div>
                            </div>
                          ) : cell.column.Header === 'Action' ? (
                            <div className="flex flex-col space-y-2 px-1">
                              {productStatus.id === 'pending' ? (
                                <div className="flex flex-col space-y-2">
                                  <Button
                                    onClick={() => {
                                      setIsOrderStatusModelOpen(true);
                                      setOrderStatus({
                                        orderId: row.original.id,
                                        status: 'unshipped',
                                      });
                                    }}
                                    className="text-sm"
                                  >
                                    Confirm Order
                                  </Button>
                                  <Button
                                    className="bg-error-primary text-sm"
                                    onClick={(e) => {
                                      setIsOrderStatusModelOpen(true);
                                      setOrderStatus({
                                        orderId: row.original.id,
                                        status: 'cancelled',
                                      });
                                    }}
                                  >
                                    Cancel Order
                                  </Button>
                                </div>
                              ) : productStatus.id === 'sent' ||
                                productStatus.id === 'picked_up' ||
                                productStatus.id === 'waiting_for_pickup' ? (
                                <div>
                                  <Button
                                    className="text-sm"
                                    onClick={() => setIsPrintSlip(true)}
                                  >
                                    Print Package Slip
                                  </Button>
                                </div>
                              ) : productStatus.id === 'unshipped' ? (
                                <div className="flex flex-col space-y-2">
                                  <Button
                                    className="text-sm"
                                    onClick={() => setIsPrintSlip(true)}
                                  >
                                    Print Package Slip
                                  </Button>
                                  <Button
                                    className="text-sm"
                                    onClick={() => {
                                      setIsOrderStatusModelOpen(true);
                                      setOrderStatus({
                                        orderId: row.original.id,
                                        status: 'waiting_for_pickup',
                                      });
                                    }}
                                  >
                                    Request Pickup
                                  </Button>
                                </div>
                              ) : null}
                              <ChangeOrderStatusModal
                                orderStatus={orderStatus}
                                getAllOrders={getAllOrders}
                                setIsOrderStatusModelOpen={
                                  setIsOrderStatusModelOpen
                                }
                                isOrderStatusModelOpen={isOrderStatusModelOpen}
                              />
                              <div className="absolute w-full flex justify-center top-0 left-0 z-50">
                                {isPrintSlip ? (
                                  <div className="relative w-3/4 py-10 h-full bg-gray-400 flex items-center justify-center rounded">
                                    <div>
                                      <PackagingSlip
                                        packing_slip_id={
                                          row.original.packing_slip_id
                                        }
                                        seller_pan_no={
                                          row.original.seller_pan_no
                                        }
                                        total_amount={row.original.total_amount}
                                        seller_company_name={
                                          row.original.seller_company_name
                                        }
                                        product_included_item={
                                          row.original.product_included_item
                                        }
                                        product_name={row.original.product_name}
                                        quantity={row.original.quantity}
                                        payment_status={row.original.payment_status}
                                      />
                                    </div>
                                    <div
                                      className="absolute flex items-center justify-center top-4 right-6 bg-white rounded-full cursor-pointer"
                                      onClick={() => setIsPrintSlip(false)}
                                    >
                                      <Image src={cancelIcon} alt="cancel" />
                                    </div>
                                  </div>
                                ) : null}
                              </div>
                            </div>
                          ) : cell.column.Header === 'Order Status' ? (
                            <div className="flex items-center justify-center space-x-2">
                              <span className="text-sm capitalize">
                                {cell.value === 'cancelled' ? (
                                  <div>
                                    <p className="text-error-primary">
                                      Cancelled by {row.original.cancelled_by}
                                    </p>
                                    <p className="">
                                      Cancellation Reason:{' '}
                                      {row.original.cancel_reason}
                                    </p>
                                  </div>
                                ) : cell.value === 'failed' ? (
                                  <div>
                                    <p className="text-error-primary">Failed</p>
                                    <p className="">
                                      Failed reason: {row.original.fail_reason}
                                    </p>
                                  </div>
                                ) : cell.value === 'delivered' ? (
                                  <div>
                                    <span className="text-accent-primary">
                                      Delivered
                                    </span>
                                  </div>
                                ) : cell.value === 'unshipped' ||
                                  cell.value === 'pending' ? (
                                  <div className="text-red-200">
                                    {productStatus.label}
                                  </div>
                                ) : (
                                  productStatus.label
                                )}
                              </span>
                            </div>
                          ) : cell.column.Header === 'Time Left' ? (
                            <div className="flex flex-col text-xs">
                              {row.original.order_status === 'unshipped' ||
                              row.original.order_status === 'pending' ? (
                                <div>
                                  <p className="">
                                    For packing and scheduling for pickup
                                  </p>
                                  <p className="text-red-200">{cell.value}</p>
                                </div>
                              ) : null}
                            </div>
                          ) : (
                            cell.render('Cell')
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        )
      ) : (
        <div className="flex items-center justify-center mt-10 animate-ping">
          <Image height={50} width={50} src={logo} alt="logo" />
        </div>
      )}
    </div>
  );
};

export default OrdersTable;
