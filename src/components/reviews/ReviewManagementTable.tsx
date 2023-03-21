import React, { useMemo, useState } from 'react';
import { useTable } from 'react-table';
import { BsSearch } from 'react-icons/bs';
import Image from 'next/image';
import Button from '../common/Button';
import StarRating from '../StarRating';

interface ITableData {
  orderId: string;
  content: {
    comment: string;
    commentDate: string;
    isReplied: boolean;
    reply: {
      productImage: string;
      message: string;
    };
  };
  product: {
    name: string;
    size: string;
  };
  rating: number;
  action: string;
}

type ProductManagementTableProps = {
  data: ITableData[];
};

type TableHeader = 'Order' | 'Product' | 'Content' | 'Rating' | 'Action';

type Accessor = 'orderId' | 'product' | 'content' | 'rating' | 'action';

const columns: { Header: TableHeader; accessor: Accessor }[] = [
  { Header: 'Order', accessor: 'orderId' },
  { Header: 'Content', accessor: 'content' },
  { Header: 'Product', accessor: 'product' },
  { Header: 'Rating', accessor: 'rating' },
  { Header: 'Action', accessor: 'action' },
];

const ReviewsManagementTable: React.FC<ProductManagementTableProps> = ({
  data,
}) => {
  const [pageSize, setPageSize] = useState(25);
  const [pageIndex, setPageIndex] = useState(0);

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
                      {cell.column.Header === 'Content' ? (
                        <div className="flex flex-col items-center space-y-2 py-2">
                          <div>
                            <p className="text-sm">{cell.value.comment}</p>
                            <p className="text-xs max-w-max p-1 bg-gray-200 text-start">
                              {cell.value.commentDate}
                            </p>
                          </div>
                          {cell.value.isReplied ? (
                            <div>
                              <Image
                                height={80}
                                width={80}
                                src={cell.value.reply.productImage}
                                alt=""
                              />
                              <p className="text-xs p-1 bg-gray-200">
                                Seller Replied: {cell.value.reply.message}
                              </p>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      ) : cell.column.Header === 'Product' ? (
                        <div>
                          <div className="flex flex-col justify-start text-xs text-blue-700">
                            <span>{cell.value.name}</span>
                            <span>{cell.value.size}</span>
                          </div>
                        </div>
                      ) : cell.column.Header === 'Rating' ? (
                        <div className="flex items-center justify-center">
                          <StarRating rating={cell.value} />
                        </div>
                      ) : cell.column.Header === 'Action' &&
                        !row.values.content.isReplied ? (
                        <Button className="">Reply</Button>
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

export default ReviewsManagementTable;
