import React, { Dispatch, SetStateAction, useState } from 'react';
import { useTable } from 'react-table';
import Image from 'next/image';
import Link from 'next/link';
import PriceEditModal from './PriceEditModal';
import QuantityDiscountModal from './QuantityDiscountModal';
import CheckboxInput from '../common/CheckboxInput';
import ActionButtons from './ActionButtons';
import { updateProduct } from '../../services/productService';
import AddQuantityDiscountModal from './AddQuantityDiscountModal';
import { MdContentCopy } from 'react-icons/md';
import { imageServerBaseUrl } from '../../constants/serverConstants';
import useCopyToClipboard from '../../hooks/useCopyToClipBoard';
import ViolationDescriptionModal from './ViolationDescriptionModal';
import logo from '../../../public/icons/hajurbuwa-logo.svg';
import StockAvailabilityModal from './StockAvailabilityModal';
import Pagination from '../Pagination';

type ITableData = {
  product_id: string;
  product_name: string;
  price_per_unit: number | string;
  bulk_pricing: { quantity: string; price: string }[];
  in_stock?: string;
  action?: string;
  suspend_reason?: string;
  lock_reason?: string;
};

type ProductManagementTableProps = {
  data: ITableData[];
  setCurrentPageUrl: Dispatch<SetStateAction<string | null>>;
  productStatus: {
    id: string;
    label: string;
  };
  isLoading: boolean;
  getAllProducts: (pageNo?: number) => void;
  paginationData: any;
};

type TableHeader =
  | 'Product'
  | 'Price'
  | 'Business Price'
  | 'Stock Availability'
  | 'Suspension Reason'
  | 'Violation Description'
  | 'Action';

type Accessor =
  | 'product_name'
  | 'price_per_unit'
  | 'bulk_pricing'
  | 'in_stock'
  | 'suspend_reason'
  | 'lock_reason'
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
  { Header: 'Stock Availability', accessor: 'in_stock' },
  { Header: 'Violation Description', accessor: 'suspend_reason' },
  { Header: 'Action', accessor: 'action' },
];

const columnsWithViolationDescription: {
  Header: TableHeader;
  accessor: Accessor;
}[] = [
  { Header: 'Product', accessor: 'product_name' },
  { Header: 'Price', accessor: 'price_per_unit' },
  { Header: 'Business Price', accessor: 'bulk_pricing' },
  { Header: 'Stock Availability', accessor: 'in_stock' },
  { Header: 'Violation Description', accessor: 'lock_reason' },
  { Header: 'Action', accessor: 'action' },
];

const ProductManagementTable: React.FC<ProductManagementTableProps> = ({
  data,
  productStatus,
  isLoading,
  getAllProducts,
  paginationData,
}) => {
  const [isPriceModalOpen, setIsPriceModalOpen] = useState(false);

  const [isViolationDescriptionModalOpen, setIsViolationDescriptionModalOpen] =
    useState(false);

  const [isStockAvailabilityModalOpen, setIsStockAvailabilityModalOpen] =
    useState(false);

  const [isQuantityDiscountModalOpen, setIsQuantityDiscountModalOpen] =
    useState(false);

  const [isAddQuantityDiscountModalOpen, setIsAddQuantityDiscountModalOpen] =
    useState(false);

  const [violationDescription, setViolationDescription] = useState('');

  const [newQuantityDiscountsToBeAdded, setNewQuantityDiscountsToBeAdded] =
    useState<any>({
      unit: '',
      quantityDiscounts: [],
    });

  const [quantityDiscountToBeEdited, setQuantityDiscountToBeEdited] =
    useState<any>({
      id: '',
    });

  const [stockAvailabilityToBeEdited, setStockAvailabilityToBeEdited] =
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

  const [_, copyProductId] = useCopyToClipboard();

  const { rows, prepareRow, headerGroups, getTableProps, getTableBodyProps } =
    useTable({
      columns:
        productStatus.id === 'suspended'
          ? columnsWithSuspensionReason
          : productStatus.id === 'locked'
          ? columnsWithViolationDescription
          : columns,
      data,
    });

  function updateProductAttribute(
    productId: string | number,
    updatedField: FormData
  ) {
    return updateProduct(productId, updatedField).then((res) =>
      getAllProducts(2)
    );
  }

  return (
    <div className="border-3 border-gray-150">
      {!isLoading ? (
        data?.length === 0 ? (
          <div className="flex justify-center mt-10">No products available</div>
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
                      return (
                        <td
                          {...cell.getCellProps()}
                          className="text-md text-black"
                          key={i}
                        >
                          {cell.column.Header === 'Product' ? (
                            <div className="flex items-center justify-start space-x-2 py-2 px-2">
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
                              <div className="flex flex-col items-start justify-center space-y-1">
                                <Link
                                  href={`/product/description/?id=${row.original.id}`}
                                >
                                  <a
                                    target="_blank"
                                    className="text-sm text-accent-primary"
                                  >
                                    {cell.value}
                                  </a>
                                </Link>
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
                          ) : cell.column.Header === 'Violation Description' ? (
                            <div>
                              <button
                                onClick={() => {
                                  setIsViolationDescriptionModalOpen(true);
                                  setViolationDescription(cell.value);
                                }}
                                className="text-blue-700 hover:underline text-sm"
                              >
                                See reason
                              </button>
                              {isViolationDescriptionModalOpen ? (
                                <ViolationDescriptionModal
                                  violationDescription={violationDescription}
                                  isViolationDescriptionModalOpen={
                                    isViolationDescriptionModalOpen
                                  }
                                  setIsViolationDescriptionModalOpen={
                                    setIsViolationDescriptionModalOpen
                                  }
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
                            <div className="flex items-center justify-start w-full">
                              {row.original.is_bulk_pricing ? (
                                <div className="flex space-x-1 items-center justify-center w-full">
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
                                    {productStatus.id !== 'locked' ? (
                                      'Add Singular Price'
                                    ) : (
                                      <span className="text-black text-xl">
                                        -
                                      </span>
                                    )}
                                  </button>
                                </div>
                              ) : (
                                <div className="flex items-center justify-center w-full text-sm space-x-2">
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
                                    {productStatus.id !== 'locked'
                                      ? 'Edit'
                                      : null}
                                  </button>
                                </div>
                              )}
                              {isPriceModalOpen ? (
                                <PriceEditModal
                                  productId={selectedPriceForUpdate.productId}
                                  value={selectedPriceForUpdate.value}
                                  setIsPriceModalOpen={setIsPriceModalOpen}
                                  isPriceModalOpen={isPriceModalOpen}
                                  updateProductAttribute={
                                    updateProductAttribute
                                  }
                                />
                              ) : null}
                            </div>
                          ) : cell.column.Header === 'Business Price' ? (
                            <div className="flex flex-col justify-start items-center">
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
                                    {productStatus.id !== 'locked' ? (
                                      'Add Quantity Discounts'
                                    ) : (
                                      <span className="text-black text-xl">
                                        -
                                      </span>
                                    )}
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
                                              {val.quantity}+{' '}
                                              {row.original.unit}
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
                                    {productStatus.id !== 'locked'
                                      ? 'Edit'
                                      : null}
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
                                  updateProductAttribute={
                                    updateProductAttribute
                                  }
                                />
                              ) : null}
                            </div>
                          ) : cell.column.Header === 'Stock Availability' ? (
                            <div>
                              {productStatus.id !== 'locked' ? (
                                <div className="flex flex-col items-center space-y-2 text-sm">
                                  <div
                                    onClick={() => {
                                      setIsStockAvailabilityModalOpen(true);
                                      setStockAvailabilityToBeEdited({
                                        id: row.original.id,
                                        value: 1,
                                      });
                                    }}
                                    className="flex items-center space-x-5"
                                  >
                                    <span>Yes</span>
                                    <CheckboxInput
                                      checked={!!cell.value ? true : false}
                                      onChange={() => {}}
                                    />
                                  </div>
                                  <div
                                    onClick={() => {
                                      setIsStockAvailabilityModalOpen(true);
                                      setStockAvailabilityToBeEdited({
                                        id: row.original.id,
                                        value: 0,
                                      });
                                    }}
                                    className="flex items-center space-x-5"
                                  >
                                    <span>No</span>
                                    <CheckboxInput
                                      checked={!!cell.value ? false : true}
                                      onChange={() => {}}
                                    />
                                  </div>

                                  {isStockAvailabilityModalOpen ? (
                                    <StockAvailabilityModal
                                      in_stock={cell.value}
                                      isStockAvailabilityModalOpen={
                                        isStockAvailabilityModalOpen
                                      }
                                      setIsStockAvailabilityModalOpen={
                                        setIsStockAvailabilityModalOpen
                                      }
                                      updateProductAttribute={
                                        updateProductAttribute
                                      }
                                      value={stockAvailabilityToBeEdited}
                                    />
                                  ) : null}
                                </div>
                              ) : (
                                <span>{!!cell.value ? 'Yes' : 'No'}</span>
                              )}
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

export default ProductManagementTable;
