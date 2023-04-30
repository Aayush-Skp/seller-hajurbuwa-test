import React, { useState } from 'react';
import { useTable } from 'react-table';
import Image from 'next/image';
import StockAvailabilityModal from './StockAvailabilityModal';
import PriceEditModal from './PriceEditModal';
import QuantityDiscountModal from './QuantityDiscountModal';
import ActionButtons from './ActionButtons';
import { updateProduct } from '../../services/productService';
import AddQuantityDiscountModal from './AddQuantityDiscountModal';
import { MdContentCopy } from 'react-icons/md';
import { imageServerBaseUrl } from '../../constants/serverConstants';
import useCopyToClipboard from '../../hooks/useCopyToClipBoard';
import InputLabel from '../common/InputLabel';
import CheckboxInput from '../common/CheckboxInput';

type ITableData = {
  product_id: string;
  product_name: string;
  price_per_unit: number | string;
  bulk_pricing: { quantity: string; price: string }[];
  in_stock?: string;
  action?: string;
  suspension_reason?: string;
};

type ProductManagementTableProps = {
  data: ITableData[];
  productStatus: {
    id: string;
    label: string;
  };
  getAllProducts: () => void;
};

type TableHeader =
  | 'Product'
  | 'Price'
  | 'Business Price'
  | 'Stock Availability'
  | 'Suspension Reason'
  | 'Action';

type Accessor =
  | 'product_name'
  | 'price_per_unit'
  | 'bulk_pricing'
  | 'in_stock'
  | 'suspension_reason'
  | 'action';

const columns: { Header: TableHeader; accessor: Accessor }[] = [
  { Header: 'Product', accessor: 'product_name' },
  { Header: 'Price', accessor: 'price_per_unit' },
  { Header: 'Business Price', accessor: 'bulk_pricing' },
  { Header: 'Stock Availability', accessor: 'in_stock' },
  { Header: 'Action', accessor: 'action' },
];

const columnsWithSuspensionReason: {
  Header: TableHeader;
  accessor: Accessor;
}[] = [
  { Header: 'Product', accessor: 'product_name' },
  { Header: 'Price', accessor: 'price_per_unit' },
  { Header: 'Business Price', accessor: 'bulk_pricing' },
  { Header: 'Suspension Reason', accessor: 'suspension_reason' },
  { Header: 'Action', accessor: 'action' },
];

const ProductManagementTable: React.FC<ProductManagementTableProps> = ({
  data,
  productStatus,
  getAllProducts,
}) => {
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

  const [isStockAvailabilityModalOpen, setIsStockAvailabilityModalOpen] =
    useState(false);

  const [stockToBeUpdated, setStockToBeUpdated] = useState<{
    id: string | number;
    value: number | null;
  }>({
    id: '',
    value: null,
  });

  const [isQuantityDiscountModalOpen, setIsQuantityDiscountModalOpen] =
    useState(false);

  const [isAddQuantityDiscountModalOpen, setIsAddQuantityDiscountModalOpen] =
    useState(false);

  const [newQuantityDiscountsToBeAdded, setNewQuantityDiscountsToBeAdded] =
    useState<any>({
      unit: '',
      quantityDiscounts: [],
    });

  const [quantityDiscountToBeEdited, setQuantityDiscountToBeEdited] =
    useState<any>({
      id: '',
    });

  const [minOrderForNewQuantityDiscount, setMinOrderForNewQuantityDiscount] =
    useState<any>({
      productId: '',
      minOrder: 0,
    });

  const [selectedPriceForUpdate, setSelectedPriceForUpdate] = useState({
    productId: 0,
    value: '',
  });

  const tableInstance = useTable({
    columns:
      productStatus.id === 'suspended' ? columnsWithSuspensionReason : columns,
    data,
  });

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    tableInstance;

  const [__, copyProductId] = useCopyToClipboard();

  function updateProductAttribute(
    productId: string | number,
    updatedField: FormData
  ) {
    return updateProduct(productId, updatedField).then((res) =>
      getAllProducts()
    );
  }

  return (
    <div className="">
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
                        <div className="flex items-center space-x-2 py-2 px-2">
                          {row?.original?.cover_image ? (
                            <div>
                              <Image
                                height={80}
                                width={80}
                                src={`${imageServerBaseUrl}${row.original.cover_image}`}
                                alt=""
                              />
                            </div>
                          ) : null}
                          <div className="flex flex-col items-start space-y-1">
                            <p className="text-sm text-accent-primary">
                              {cell.value}
                            </p>
                            <p className="text-sm text-accent-primary">
                              {row.original.included_items}
                            </p>
                            <p className="text-sm space-x-2 items-center">
                              <span>Id: {row.original.product_id}</span>
                              <button
                                className="group"
                                onClick={() =>
                                  copyProductId(row.original.product_id)
                                }
                              >
                                <MdContentCopy className="group-hover:scale-110 transition-transform" />
                              </button>
                            </p>
                          </div>
                        </div>
                      ) : cell.column.Header === 'Stock Availability' ? (
                        <div>
                          <div className="flex flex-col items-center space-y-2">
                            <div className="flex justify-center items-center space-x-1">
                              <InputLabel label="Yes" />
                              <CheckboxInput
                                checked={cell.value === 1 ? true : false}
                                onChange={() => {
                                  if (cell.value === 0) {
                                    setStockToBeUpdated({
                                      id: `${row.original.id}`,
                                      value: 1,
                                    });

                                    setIsStockAvailabilityModalOpen(true);
                                  }
                                }}
                              />
                            </div>
                            <div className="flex justify-center items-center space-x-1">
                              <InputLabel label="No" />
                              <CheckboxInput
                                checked={cell.value === 0 ? true : false}
                                onChange={() => {
                                  if (cell.value === 1) {
                                    setStockToBeUpdated({
                                      id: `${row.original.id}`,
                                      value: 0,
                                    });

                                    setIsStockAvailabilityModalOpen(true);
                                  }
                                }}
                              />
                            </div>
                          </div>
                          {isStockAvailabilityModalOpen ? (
                            <StockAvailabilityModal
                              isStockAvailabilityModalOpen={
                                isStockAvailabilityModalOpen
                              }
                              setIsStockAvailabilityModalOpen={
                                setIsStockAvailabilityModalOpen
                              }
                              stockToBeUpdated={stockToBeUpdated}
                              updateProductAttribute={updateProductAttribute}
                            />
                          ) : null}
                        </div>
                      ) : cell.column.Header === 'Action' ? (
                        <div className="relative">
                          <ActionButtons
                            productId={row.original.id}
                            currentTab={productStatus}
                            getAllProducts={getAllProducts}
                          />
                        </div>
                      ) : cell.column.Header === 'Price' ? (
                        <div className="flex items-center justify-center">
                          {row.original.is_bulk_pricing ? (
                            <div className="flex space-x-1 items-center">
                              <button
                                onClick={() => {
                                  setSelectedPriceForUpdate({
                                    productId: row.original.id,
                                    value: '',
                                  });
                                  setIsPriceModalOpen(true);
                                }}
                                className="text-sm text-accent-primary hover:underline"
                              >
                                Add Singular Price
                              </button>
                            </div>
                          ) : (
                            <div className="flex items-center text-sm space-x-2">
                              <span>Rs. {cell.value}</span>
                              <button
                                onClick={() => {
                                  setSelectedPriceForUpdate({
                                    productId: row.original.id,
                                    value: cell.value,
                                  });
                                  setIsPriceModalOpen(true);
                                }}
                                className="text-accent-primary hover:underline"
                              >
                                Edit
                              </button>
                            </div>
                          )}
                          {isPriceModalOpen ? (
                            <PriceEditModal
                              productId={selectedPriceForUpdate.productId}
                              value={selectedPriceForUpdate.value}
                              setIsPriceModalOpen={setIsPriceModalOpen}
                              isPriceModalOpen={isPriceModalOpen}
                              updateProductAttribute={updateProductAttribute}
                            />
                          ) : null}
                        </div>
                      ) : cell.column.Header === 'Business Price' ? (
                        <div>
                          {!row?.original?.is_bulk_pricing ? (
                            <div>
                              <button
                                onClick={() => {
                                  setIsAddQuantityDiscountModalOpen(true);
                                  setMinOrderForNewQuantityDiscount({
                                    productId: row.original.id,
                                    minOrder: row.original.minimum_order,
                                  });
                                }}
                                className="text-xs text-blue-700 hover:underline decoration-blue-700 cursor-pointer"
                              >
                                Add Quantity Discounts
                              </button>

                              {isAddQuantityDiscountModalOpen ? (
                                <AddQuantityDiscountModal
                                  productId={
                                    minOrderForNewQuantityDiscount.productId
                                  }
                                  minimumOrder={
                                    minOrderForNewQuantityDiscount.minOrder
                                  }
                                  isQuantityDiscountModalOpen={
                                    isAddQuantityDiscountModalOpen
                                  }
                                  setIsQuantityDiscountModelOpen={
                                    setIsAddQuantityDiscountModalOpen
                                  }
                                  updateProductAttribute={
                                    updateProductAttribute
                                  }
                                />
                              ) : null}
                            </div>
                          ) : (
                            <div className="text-sm flex space-x-3 justify-center items-center">
                              <div>
                                {cell?.value?.map((val: any) => {
                                  return (
                                    <div
                                      key={val.id}
                                      className="text-xs flex space-x-3 justify-center"
                                    >
                                      <div>
                                        <span>{val.price} NPR for </span>
                                        <span>
                                          {val.quantity}+ {row.original.unit}
                                        </span>
                                      </div>
                                    </div>
                                  );
                                })}
                              </div>
                              <button
                                className="text-accent-primary hover:underline"
                                onClick={() => {
                                  setQuantityDiscountToBeEdited({
                                    id: row.original.id,
                                  });
                                  setNewQuantityDiscountsToBeAdded(() => {
                                    return {
                                      unit: row.original.unit,
                                      quantityDiscounts: cell.value.map(
                                        (val: any) => {
                                          return {
                                            ...val,
                                          };
                                        }
                                      ),
                                    };
                                  });
                                  setIsQuantityDiscountModalOpen(true);
                                }}
                              >
                                Edit
                              </button>
                            </div>
                          )}
                          {isQuantityDiscountModalOpen ? (
                            <QuantityDiscountModal
                              productId={quantityDiscountToBeEdited.id}
                              quantityDiscountPrices={
                                newQuantityDiscountsToBeAdded
                              }
                              setIsQuantityDiscountModelOpen={
                                setIsQuantityDiscountModalOpen
                              }
                              isQuantityDiscountModalOpen={
                                isQuantityDiscountModalOpen
                              }
                              updateProductAttribute={updateProductAttribute}
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

export default ProductManagementTable;
