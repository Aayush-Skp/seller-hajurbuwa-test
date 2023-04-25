import React, { useState } from 'react';
import { useTable } from 'react-table';
import Image from 'next/image';
import Button from '../common/Button';
import StarRating from '../StarRating';
import ReplyModal from './ReplyModal';
import { imageServerBaseUrl } from '../../constants/serverConstants';

interface ITableData {
  order_id: string;
  product_name: string;
  id: string | number;
  review: any;
  action?: string;
}

type ProductManagementTableProps = {
  data: ITableData[];
  isLoading: boolean;
  getReviewsList: () => void;
};

type TableHeader = 'Order' | 'Product' | 'Content' | 'Rating' | 'Action';

type Accessor = 'order_id' | 'product_name' | 'id' | 'action' | 'review';

const columns: { Header: TableHeader; accessor: Accessor }[] = [
  { Header: 'Order', accessor: 'order_id' },
  { Header: 'Content', accessor: 'review' },
  { Header: 'Product', accessor: 'product_name' },
  { Header: 'Rating', accessor: 'id' },
  { Header: 'Action', accessor: 'action' },
];

const ReviewsManagementTable: React.FC<ProductManagementTableProps> = ({
  data,
  getReviewsList,
}) => {
  const [replyOrderId, setReplyOrderId] = useState('');

  const [isReplyModalOpen, setIsReplyModalOpen] = useState(false);

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
                      {cell.column.Header === 'Content' ? (
                        <div className="flex flex-col items-center space-y-2 py-2">
                          <div>
                            <p className="text-sm">
                              {row?.original?.review[0]?.review}
                            </p>
                            <div>
                              <Image
                                height={80}
                                width={80}
                                src={`${imageServerBaseUrl}/${row?.original?.review[0]?.image}`}
                                alt=""
                              />
                            </div>
                            {/* <p className="text-xs max-w-max p-1 bg-gray-200 text-start">
                              {cell.value.commentDate}
                            </p> */}
                          </div>
                          {row?.original?.reply_message ? (
                            <div className="flex items-center space-x-1 text-xs">
                              <p className="p-1 bg-gray-200">Seller Replied:</p>
                              <span>{row?.original?.reply_message}</span>
                            </div>
                          ) : (
                            ''
                          )}
                        </div>
                      ) : cell.column.Header === 'Product' ? (
                        <div>
                          <div className="flex flex-col justify-start text-xs text-blue-700 space-y-1">
                            <span>{row?.original?.product_name}</span>
                            <span>{row?.original?.product_included_item}</span>
                          </div>
                        </div>
                      ) : cell.column.Header === 'Rating' ? (
                        <div className="flex items-center justify-center">
                          <StarRating
                            rating={row?.original?.review[0]?.rating}
                          />
                        </div>
                      ) : cell.column.Header === 'Action' &&
                        !row?.original?.reply_message ? (
                        <div>
                          <Button
                            onClick={() => {
                              setIsReplyModalOpen(true);
                              setReplyOrderId(row.original.id);
                            }}
                            className=""
                          >
                            Reply
                          </Button>
                          {isReplyModalOpen ? (
                            <ReplyModal
                              isReplyModalOpen={isReplyModalOpen}
                              setIsReplyModalOpen={setIsReplyModalOpen}
                              orderId={replyOrderId}
                              getAllReviews={getReviewsList}
                            />
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
    </div>
  );
};

export default ReviewsManagementTable;
