import Image from 'next/image';
import { BsArrowLeft, BsImages } from 'react-icons/bs';
import { useState, useEffect } from 'react';
import { getProductDescription } from '../../services/productService';
import { useRouter } from 'next/router';
import Link from 'next/link';
import PageWrapper from '../../components/PageWrapper';
import authenticatedRoute from '../../components/WithAuth';
import { imageServerBaseUrl } from '../../constants/serverConstants';
import { MdOutlineProductionQuantityLimits } from 'react-icons/md';
import { HiOutlineInformationCircle } from 'react-icons/hi';
import { BiDetail } from 'react-icons/bi';
import { GrDeliver } from 'react-icons/gr';
import { GiPriceTag } from 'react-icons/gi';
import Head from 'next/head';

function ProductDescriptionPage() {
  const [product, setProduct] = useState<any>({});

  const router = useRouter();

  useEffect(() => {
    router?.query?.id &&
      getProductDescription(router.query.id as string)
        .then((res) => {
          setProduct(res);
        })
        .catch(console.log);
  }, [router]);

  return (
    <>
      <Head>
        <meta name="viewport" content="width=1360" />
      </Head>
      <PageWrapper>
        <section className="p-24 pt-10" >
          <div className="flex flex-col rounded-md" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)" }}>
            <div className="flex">
              <div className="flex-row py-4 w-full flex items-center justify-start px-10 text-[1.5rem]">
                <MdOutlineProductionQuantityLimits /> <span className="ml-4">Product Management </span>
              </div>
            </div>
            <div className="flex flex-col items-start justify-between mx-10 pb-10 pt-4 border-t-2 border-[#d9d9d9] ">
              <div className="space-y-2">
                <div className="flex items-center">
                  <p className="w-36 text-gray-800">Product Id</p>
                  <p>{product.product_id}</p>
                </div>
              </div>
              <div className="flex items-center">
                <p className="w-36 text-gray-800">Product Name</p>
                <p>{product.product_name}</p>
              </div>
              <div className="flex items-center">
                <p className="w-36 text-gray-800">Product Status</p>
                <p className="capitalize">{product.status}</p>
              </div>
              <Link href="/product-management">
                <a className="flex items-center place-self-end space-x-1 text-blue-700">
                  <BsArrowLeft className="font-bold" />
                  <p>Back to Products List</p>
                </a>
              </Link>
            </div>

          </div>
          <div className="flex flex-row mt-4 w-full">
            <div className="flex flex-col w-1/2">
              <div className="flex w-full mr-4 flex-col rounded-md" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)" }}>
                <div className="flex-row py-4 w-full flex items-center justify-start px-10 text-xxl">
                  <HiOutlineInformationCircle /> <span className="ml-4">General Information</span>
                </div>
                <div className="flex items-start justify-start mx-10 pb-10 pt-4 border-t-2 border-[#d9d9d9] flex-col">
                  <div className="flex items-center py-1">
                    <p className="w-36 text-gray-800">Category</p>
                    <p>{product.category_tree}</p>
                  </div>
                  <div className="flex items-center py-1">
                    <p className="w-36 text-gray-800">Brand</p>
                    <p>{product.brand_specification}</p>
                  </div>
                </div>
              </div>
              <div className="flex w-full h-full mt-4 mr-4 flex-col rounded-md" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)" }}>
                <div className="flex-row py-4 w-full flex items-center justify-start px-10 text-xxl">
                  <GrDeliver /> <span className="ml-4">Service & Delivery</span>
                </div>
                <div className="flex items-start justify-start mx-10 pb-10 pt-4 border-t-2 border-[#d9d9d9]">
                  <p className="w-36 text-gray-800">Package Weight</p>
                  <p>{product.package_weight} kg</p>
                </div>
              </div>
            </div>

            <div className="flex w-1/2 ml-4 flex-col rounded-md" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)" }}>
              <div className="flex-rowz py-4 w-full flex items-center justify-start px-10 text-xxl">
                <BiDetail /> <span className="ml-4">Product Detail</span>
              </div>
              <div className="flex items-start justify-start mx-10 pb-10 pt-4 border-t-2 border-[#d9d9d9] flex-col">
                <div className="flex">
                  <p className="w-36 text-gray-800 text-sm">Featured Highlights</p>
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
                <div className="flex items-center py-1">
                  <p className="w-36 text-gray-800 text-sm">
                    Product Description?
                  </p>
                  <p>{product.description}</p>
                </div>
                <div className="flex items-center py-1">
                  <p className="w-36 text-gray-800">What&apos;s in the box?</p>
                  <p>{product.included_items}</p>
                </div>
              </div>
            </div>
          </div>
          <div className="flex mt-4">
            <div className="flex w-full mr-4 mt-4 flex-col rounded-md" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)" }}>
              <div className="flex-rowz py-4 w-full flex items-center justify-start px-10 text-xxl">
                <GiPriceTag /> <span className="ml-4">Price & Stock</span>
              </div>
              <div className="flex items-start justify-start mx-10 pb-10 pt-4 border-t-2 border-[#d9d9d9] flex-col">
                <div className="flex">
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
                <div className="flex items-center py-1">
                  <p className="w-36 text-gray-800">Selected Unit</p>
                  <p>{product.unit_selection}</p>
                </div>
                <div className="flex items-center py-1">
                  <p className="w-36 text-gray-800">Min Order</p>
                  <p>{product.minimum_order}</p>
                </div>
                <div className="flex items-center py-1">
                  <p className="w-36 text-gray-800">Stock Availability</p>
                  <p>{product.stock_availability ? 'Yes' : 'No'}</p>
                </div>
              </div>

            </div>
            <div className="flex w-full ml-4 mt-4 flex-col rounded-md" style={{ boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.25)" }}>
              <div className="flex-row py-4 w-full flex items-center justify-start px-10 text-xxl">
                <BsImages /> <span className="ml-4">Images</span>
              </div>
              <div className="grid grid-cols-4 gap-y-5 mx-10 pb-10 pt-4 border-t-2 border-[#d9d9d9]">
                <div className="flex flex-col items-center justify-center">
                  {product?.cover_image && (
                    <Image
                      width={100}
                      height={100}
                      src={`${imageServerBaseUrl}${product.cover_image}`}
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
                          src={`${imageServerBaseUrl}${item}`}
                          alt=""
                        />
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        </section>
      </PageWrapper >
    </>
  );
}

export default authenticatedRoute(ProductDescriptionPage);
