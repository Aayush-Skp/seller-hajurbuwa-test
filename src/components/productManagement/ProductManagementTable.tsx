import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { AiFillCaretDown } from 'react-icons/ai';
import { BsSearch } from 'react-icons/bs';
import { FaEdit } from 'react-icons/fa';
import Image from 'next/image';
import CheckboxInput from '../common/CheckboxInput';
import Button from '../common/Button';
import InputLabel from '../common/InputLabel';
import ActionModal from './ActionsModal';
import StockAvailabilityModal from './StockAvailabilityModal';
import PriceEditModal from './PriceEditModal';
import QuantityDiscountModal from './QuantityDiscountModal';
import ActionButtons from './ActionButtons';

interface ITableData {
  id: number;
  product: {
    name: string;
    image: string;
  };
  price: number;
  businessPrice: string;
  stockAvailability: boolean;
  action: string;
}

type ProductManagementTableProps = {
  data: ITableData[];
  productStatus: string;
};

type TableHeader =
  | 'ID'
  | 'Product'
  | 'Price'
  | 'Business Price'
  | 'Stock Availability'
  | 'Action';

type Accessor =
  | 'id'
  | 'product'
  | 'price'
  | 'businessPrice'
  | 'stockAvailability'
  | 'action';

const columns: { Header: TableHeader; accessor: Accessor }[] = [
  { Header: 'ID', accessor: 'id' },
  { Header: 'Product', accessor: 'product' },
  { Header: 'Price', accessor: 'price' },
  { Header: 'Business Price', accessor: 'businessPrice' },
  { Header: 'Stock Availability', accessor: 'stockAvailability' },
  { Header: 'Action', accessor: 'action' },
];

const ProductManagementTable: React.FC<ProductManagementTableProps> = ({
  data,
  productStatus,
}) => {
  const [pageSize, setPageSize] = useState(25);
  const [pageIndex, setPageIndex] = useState(0);

  console.log('rendered');

  const [isStockModalOpen, setIsStockModalOpen] = useState(false);
  const [isPriceEditModalOpen, setIsPriceEditModalOpen] = useState(false);
  const [isDiscountModalOpen, setIsDiscountModalOpen] = useState(false);
  const [selectedPriceForUpdate, setSelectedPriceForUpdate] = useState(0);

  const [quantityDiscountPrices, setQuantityDiscountPrices] = useState([
    { id: '1', quantity: 3, pricePerPc: 3000 },
  ]);

  const [isOpen, setIsOpen] = useState(false);

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

  function handleStockModalClose() {
    setIsStockModalOpen(false);
  }

  function handlePriceEditModelClose() {
    setIsPriceEditModalOpen(false);
  }

  function handleDiscountModelClose() {
    setIsDiscountModalOpen(false);
  }

  function handlePriceClick(price: number) {
    setIsPriceEditModalOpen(true);
    setSelectedPriceForUpdate(price);
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
                      ) : cell.column.Header === 'Stock Availability' ? (
                        <div className="flex flex-col items-center justify-center space-y-2">
                          <div className="flex items-center justify-between space-x-1">
                            <InputLabel
                              label="Yes"
                              htmlFor={`stockAvailability${i}`}
                            />
                            <CheckboxInput
                              id={`stockAvailability${i}`}
                              name="stockAvailability"
                              onClick={() => setIsStockModalOpen(true)}
                              checked={cell.value}
                            />
                          </div>
                          <div className="flex items-center justify-between space-x-1">
                            <InputLabel
                              label="No"
                              htmlFor={`!stockAvailability${i}`}
                            />
                            <CheckboxInput
                              id={`!stockAvailability${i}`}
                              name="stockAvailability"
                              onClick={() => setIsStockModalOpen(true)}
                              checked={!cell.value}
                            />
                          </div>
                          <StockAvailabilityModal
                            isStockModalOpen={isStockModalOpen}
                            handleStockModelClose={handleStockModalClose}
                          />
                        </div>
                      ) : cell.column.Header === 'Action' ? (
                        <div className="relative">
                          <ActionButtons currentTab={productStatus} />
                        </div>
                      ) : cell.column.Header === 'Price' ? (
                        <div className="flex items-center justify-center space-x-2">
                          <span>
                            <span className="text-success-primary">Rs. </span>
                            {cell.value}
                          </span>
                          <FaEdit
                            onClick={() => handlePriceClick(cell.value)}
                            className="w-4 h-4 text-warning-primary cursor-pointer"
                          />
                          {isPriceEditModalOpen && (
                            <PriceEditModal
                              value={selectedPriceForUpdate}
                              isPriceEditModalOpen={isPriceEditModalOpen}
                              handlePriceEditModelClose={
                                handlePriceEditModelClose
                              }
                            />
                          )}
                        </div>
                      ) : cell.column.Header === 'Business Price' ? (
                        <div>
                          <button
                            onClick={() => setIsDiscountModalOpen(true)}
                            className="text-xs text-blue-700 hover:underline decoration-blue-700 cursor-pointer"
                          >
                            Add Quantity Discounts
                          </button>
                          <QuantityDiscountModal
                            quantityDiscountPrices={quantityDiscountPrices}
                            setQuantityDiscountPrices={
                              setQuantityDiscountPrices
                            }
                            handleDiscountModelClose={handleDiscountModelClose}
                            isDiscountModalOpen={isDiscountModalOpen}
                          />
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

export default ProductManagementTable;
