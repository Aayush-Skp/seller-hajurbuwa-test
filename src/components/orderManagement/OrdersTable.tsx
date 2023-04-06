import React, { useState } from 'react';
import { useTable } from 'react-table';
import Image from 'next/image';
import Button from '../common/Button';
import Link from 'next/link';
import ChangeOrderStatusModal from './ChangeOrderStatusModal';
import PackagingSlip from './PackagingSlip';
import cancelIcon from '../../../public/icons/cancel.svg';
import { Tab } from '.';

interface ITableData {
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
}

type ProductManagementTableProps = {
  data: ITableData[];
  productStatus: Tab;
  getAllOrders: () => void;
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
}) => {
  const [isPrintSlip, setIsPrintSlip] = useState(false);

  const [isOrderStatusModelOpen, setIsOrderStatusModelOpen] = useState(false);

  const [orderStatus, setOrderStatus] = useState({
    orderId: '',
    status: '',
  });

  const tableInstance = useTable({ columns, data });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  return (
    <div className="border-3">
      <table {...getTableProps()} className="w-full border-x-4">
        <thead className="border-b-4 h-5 font-bold bg-gray-150">
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
                  return (
                    <td
                      {...cell.getCellProps()}
                      className="text-md text-black"
                      key={i}
                    >
                      {cell.column.Header === 'Product' ? (
                        <div className="flex justify-center items-center space-y-2 py-2">
                          <div>
                            <Image
                              height={80}
                              width={80}
                              src={row.original.cover_image}
                              alt=""
                            />
                          </div>
                          <div className="flex flex-col items-start space-y-1">
                            <div className="text-sm text-accent-primary text-start">
                              <p>{cell.value.product_name}</p>
                              <p>{row.original.included_items}</p>
                            </div>
                            <div>
                              <p>{row.original.product_id}</p>
                            </div>
                          </div>
                        </div>
                      ) : cell.column.Header === 'Order Details' ? (
                        <div className="w-full flex items-center justify-center">
                          <div className="flex flex-col items-start justify-between space-y-1 text-xs">
                            <div className="space-x-1">
                              <span>Order Id: </span>
                              <span className="font-semibold">
                                {row.original.order_code}
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
                                {row.original.sub_total} NPR
                              </span>
                            </div>
                            <div className="space-x-1">
                              <span>Order Date:</span>
                              <span className="font-semibold">
                                {row.original.order_date}
                              </span>
                            </div>
                            <Link href={`/order?order_id=${row.original.id}`}>
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
                                className="bg-red-200 text-sm"
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
                          ) : productStatus.id === 'sent' ? (
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
                            getAllOrders={getAllOrders}
                            isOrderStatusModelOpen={isOrderStatusModelOpen}
                            orderStatus={orderStatus}
                            setIsOrderStatusModelOpen={
                              setIsOrderStatusModelOpen
                            }
                          />
                          <div className="absolute w-full flex justify-center top-0 left-0 z-50">
                            {isPrintSlip ? (
                              <div className="relative w-3/4 py-10 h-full bg-gray-400 flex items-center justify-center rounded">
                                <div>
                                  <PackagingSlip companyName="Bishal" />
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
                          <span className="text-red-200 text-sm capitalize">
                            {productStatus.label}
                          </span>
                        </div>
                      ) : cell.column.Header === 'Time Left' ? (
                        <div className="flex flex-col text-xs">
                          <span className="">
                            For packing and scheduling for pickup
                          </span>
                          <span className="text-red-200">{cell.value}</span>
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
    </div>
  );
};

export default OrdersTable;
