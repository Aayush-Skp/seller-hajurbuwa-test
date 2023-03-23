import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import Image from 'next/image';
import CheckboxInput from '../common/CheckboxInput';
import Button from '../common/Button';
import InputLabel from '../common/InputLabel';
import ActionModal from '../productManagement/ActionsModal';
import StockAvailabilityModal from '../productManagement/StockAvailabilityModal';
import PriceEditModal from '../productManagement/PriceEditModal';
import QuantityDiscountModal from '../productManagement/QuantityDiscountModal';
import OrderActionModal from './OrderActionModal';

interface ITableData {
  id: number;
  product: {
    name: string;
    image: string;
  };
  orderDetails: {
    orderId: string;
    quantity: number;
    subTotal: number;
  };
  orderStatus: string;
  timeLeft: string;
  action: string;
}

type ProductManagementTableProps = {
  data: ITableData[];
  productStatus: string;
};

type TableHeader =
  | 'ID'
  | 'Product'
  | 'Order Details'
  | 'Order Status'
  | 'Time Left'
  | 'Action';

type Accessor =
  | 'id'
  | 'product'
  | 'orderDetails'
  | 'orderStatus'
  | 'timeLeft'
  | 'action';

const columns: { Header: TableHeader; accessor: Accessor }[] = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Product', accessor: 'product' },
  { Header: 'Order Details', accessor: 'orderDetails' },
  { Header: 'Order Status', accessor: 'orderStatus' },
  { Header: 'Time Left', accessor: 'timeLeft' },
  { Header: 'Action', accessor: 'action' },
];

const OrdersTable: React.FC<ProductManagementTableProps> = ({
  data,
  productStatus,
}) => {
  const [pageSize, setPageSize] = useState(25);
  const [pageIndex, setPageIndex] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const [action, setAction] = useState('');

  const tableData = useMemo(() => {
    const start = pageIndex * pageSize;
    const end = (pageIndex + 1) * pageSize;
    return data.slice(start, end);
  }, [data, pageIndex, pageSize]);

  const tableInstance = useTable({ columns, data: tableData });
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const pageCount = Math.ceil(data.length / pageSize);

  const handlePageSizeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageSize(parseInt(e.target.value));
    setPageIndex(0);
  };

  const handlePrevClick = () => {
    setPageIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNextClick = () => {
    setPageIndex((prev) => Math.min(prev + 1, pageCount - 1));
  };

  function handleOrderAction(actionType: string) {
    setIsOpen(true);
    setAction(actionType);
  }

  return (
    <div className="border-3">
      <div className="flex p-3 border-x-4 grid-cols-5 gap-3">
        <input
          type="text"
          className="relative w-1/3 border-0 bg-gray-150 p-2 pl-10 col-span-2"
          placeholder={`Search by Name, Phone Number and PAN No.`}
        />
        <BsSearch className="absolute flex items-center justify-center mt-3 ml-3 text-gray-900" />
        <div className="w-72"></div>
        <div className="w-96"></div>
        <div
          className="col-start-4 flex justify-center items-center"
          style={{ alignSelf: 'flex-end', justifySelf: 'flex-end' }}
        >
          <span>Show: </span>
          <select
            className="bg-gray-150 p-2 pr-4"
            onChange={(e) => handlePageSizeChange(e)}
          >
            <option value="25">25</option>
            <option value="50">50</option>
            <option value="100">100</option>
          </select>
        </div>
      </div>
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
                        <div className="flex flex-col justify-center items-center space-y-2 py-2">
                          <Image
                            height={80}
                            width={80}
                            src={cell.value.image}
                            alt=""
                          />
                          <p className="text-sm">{cell.value.name}</p>
                        </div>
                      ) : cell.column.Header === 'Order Details' ? (
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="flex flex-col items-center justify-between space-y-1 text-xs">
                            <div className="space-x-1">
                              <span>Order Id: </span>
                              <span className="font-semibold">
                                {cell.value.orderId}
                              </span>
                            </div>
                            <div className="space-x-1">
                              <span>Quantity: </span>
                              <span className="font-semibold">
                                {cell.value.quantity} Kg
                              </span>
                            </div>
                            <div className="space-x-1">
                              <span>Item Subtotal:</span>
                              <span className="font-semibold">
                                {cell.value.subTotal} NPR
                              </span>
                            </div>
                          </div>
                        </div>
                      ) : cell.column.Header === 'Action' ? (
                        <div className="flex flex-col space-y-2 px-1">
                          {productStatus === 'pending' && (
                            <div className="flex flex-col space-y-2">
                              <Button
                                onClick={(e) =>
                                  handleOrderAction('confirmOrder')
                                }
                                className="text-sm"
                              >
                                Confirm Order
                              </Button>
                              <Button
                                className="bg-red-200 text-sm"
                                onClick={() => handleOrderAction('cancelOrder')}
                              >
                                Cancel Order
                              </Button>
                            </div>
                          )}
                          {productStatus === 'unShipped' && (
                            <div className="flex flex-col space-y-2">
                              <Button
                                className="text-sm"
                                onClick={() =>
                                  handleOrderAction('requestPickUp')
                                }
                              >
                                Print Package Slip
                              </Button>
                              <Button
                                className="text-sm"
                                onClick={() =>
                                  handleOrderAction('requestPickUp')
                                }
                              >
                                Request Pickup
                              </Button>
                            </div>
                          )}
                          <OrderActionModal
                            isOpen={isOpen}
                            action={action}
                            setIsOpen={setIsOpen}
                          />
                        </div>
                      ) : cell.column.Header === 'Order Status' ? (
                        <div className="flex items-center justify-center space-x-2">
                          <span className="text-red-200 text-sm capitalize">
                            {cell.value}
                          </span>
                        </div>
                      ) : cell.column.Header === 'Time Left' ? (
                        <div className="flex flex-col text-xs">
                          <span className="">
                            For packing and scheduling for pickup
                          </span>
                          <span className="text-red-200">48 Hours Left</span>
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
        <tfoot className="">
          <tr>
            <td colSpan={6}>
              <div className="flex justify-between items-center">
                <div className="flex justify-center items-center">
                  <button
                    className="bg-accent-primary text-white px-3 py-3 w-24 m-2"
                    onClick={handlePrevClick}
                    disabled={pageIndex === 0}
                  >
                    Previous
                  </button>
                  <button
                    className="bg-accent-primary text-white px-3 py-3 w-24 m-2"
                    onClick={handleNextClick}
                    disabled={pageIndex === pageCount - 1}
                  >
                    Next
                  </button>
                </div>
                <div className="flex justify-center items-center">
                  <span>
                    Page
                    <strong>
                      {pageIndex + 1} of {pageCount}
                    </strong>
                  </span>
                </div>
              </div>
            </td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default OrdersTable;
