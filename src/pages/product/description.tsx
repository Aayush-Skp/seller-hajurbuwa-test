import Image from 'next/image';
import { BsArrowLeft } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { getProductDescription } from '../../services/productService';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';

function ProductDescriptionPage() {
  const [product, setProduct] = useState<any>({});

  const router = useRouter();

  useEffect(() => {
    router?.query?.id &&
      getProductDescription(router.query.id as string)
        .then((res) => {
          console.log(res);
          setProduct(res);
        })
        .catch(console.log);
  }, [router]);

  return (
    <>
      <PageWrapper>
        <div className="space-y-2 h-20 flex border-b-4 justify-start items-end">
          <span className="text-2xl font-bold pl-24 px-10">
            Product Description
          </span>
        </div>
        <section className="pl-24 py-1 pb-56">
          <div className="flex items-center justify-between pl-2 pr-6 pt-4">
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="w-36 text-gray-800">Product Id</p>
                <p>{product.product_id}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center">
                <p className="w-36 text-gray-800">Product Name</p>
                <p>{product.product_name}</p>
              </div>
              <div className="flex items-center">
                <p className="w-36 text-gray-800">Product Status</p>
                <p className="capitalize">{product.status}</p>
              </div>
            </div>
            <Link href="/product-management">
              <a className="flex items-center place-self-end space-x-1 text-blue-700">
                <BsArrowLeft className="font-bold" />
                <p>Back to Products List</p>
              </a>
            </Link>
          </div>
          <div className="py-2 pl-2 pr-6 space-y-3">
            <div>
              <p className="text-sm underline">General Information</p>
              <div className="flex items-center border-b border-gray-900 py-1">
                <p className="w-36 text-gray-800">Category</p>
                <p>{product.product_type}</p>
              </div>
              <div className="flex items-center border-b border-gray-900 py-1">
                <p className="w-36 text-gray-800">Brand</p>
                <p>{product.brand_specification}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm underline">Product Details</p>
              <div className="flex space-x-2 border-b border-gray-900 py-1">
                <p className="w-36 text-gray-800 text-sm">
                  Featured Highlights
                </p>
                <ul>
                  {product.featured_highlights &&
                    product.featured_highlights.map(
                      (item: any, index: number) => {
                        return (
                          <li
                            className="flex space-x-2 items-center"
                            key={index}
                          >
                            <div className="w-2 h-2 bg-black rounded-full" />
                            <span>{item}</span>
                          </li>
                        );
                      }
                    )}
                </ul>
              </div>
              <div className="flex items-center border-b border-gray-900 py-1">
                <p className="w-36 text-gray-800 text-sm">
                  Product Description?
                </p>
                <p>{product.description}</p>
              </div>
              <div className="flex items-center border-b border-gray-900 py-1">
                <p className="w-36 text-gray-800">What&apos;s in the box?</p>
                <p>{product.included_items}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm underline">Price And Stock</p>
              <div className="flex border-b border-gray-900">
                <p className="w-36 text-gray-800">Price</p>
                <ul>
                  {product.price_per_unit ? (
                    <>{product.price_per_unit}</>
                  ) : (
                    <>
                      {product.bulk_price &&
                        product.bulk_price.map((item: any, index: number) => {
                          return (
                            <li key={index}>
                              {item.quantity} {product.unit} for {item.price}
                            </li>
                          );
                        })}
                    </>
                  )}
                </ul>
              </div>
              <div className="flex items-center border-b border-gray-900 py-1">
                <p className="w-36 text-gray-800">Selected Unit</p>
                <p>{product.unit_selection}</p>
              </div>
              <div className="flex items-center border-b border-gray-900 py-1">
                <p className="w-36 text-gray-800">Min Order</p>
                <p>{product.minimum_order}</p>
              </div>
              <div className="flex items-center border-b border-gray-900 py-1">
                <p className="w-36 text-gray-800">Stock Availability</p>
                <p>{product.stock_availability ? 'Yes' : 'No'}</p>
              </div>
            </div>
            <div className="space-y-2">
              <p className="text-sm underline">Images</p>
              <div className="w-3/5 pt-5 grid grid-cols-4 gap-y-5">
                <div className="flex flex-col items-center justify-center">
                  {product?.cover_image && (
                    <Image
                      width={100}
                      height={100}
                      src={`https://hajurbuwa-s3-bucket.s3.ap-south-1.amazonaws.com${product.cover_image}`}
                      alt=""
                    />
                  )}
                  <p className="">Cover</p>
                </div>
                {product.sub_images &&
                  product.sub_images.map((item: any, index: number) => {
                    return (
                      <div
                        key={index}
                        className="flex flex-col items-center justify-center"
                      >
                        <Image
                          width={100}
                          height={100}
                          src={`https://hajurbuwa-s3-bucket.s3.ap-south-1.amazonaws.com${item}`}
                          alt=""
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
            <div>
              <p className="text-sm underline">Services and Delivery </p>
              <div className="flex items-center py-1">
                <p className="w-36 text-gray-800">Package Weight</p>
                <p>{product.package_weight}</p>
              </div>
            </div>
          </div>
        </section>
      </PageWrapper>
    </>
  );
}

export default authenticatedRoute(ProductDescriptionPage);
