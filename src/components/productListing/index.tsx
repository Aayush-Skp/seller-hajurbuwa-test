import React, { useEffect, useState } from 'react';
import { getBrands } from '../../services/getBrandService';
import { getUnits } from '../../services/getUnitService';
import GeneralInformation from './GeneralInformation';
import PriceAndStock from './PriceAndStock';
import ProductDetails from './ProductDetails';
import ProductImagesAndVideos from './ProductImagesAndVideos';
import ServicesAndDelivery from './ServicesAndDelivery';
import { useRouter } from 'next/router';
import { getProductById } from '../../services/productService';

const listingSteps = [
  { id: 1, label: 'General Information' },
  { id: 2, label: 'Product Details' },
  { id: 3, label: 'Price and Stock' },
  { id: 4, label: 'Images and Videos' },
  { id: 5, label: 'Services and Delivery' },
];

export type ProductListingMode = 'add' | 'edit' | 'duplicate';

const PAGE_TITLES: Record<ProductListingMode, string> = {
  add: 'Add Product',
  edit: 'Edit Product',
  duplicate: 'Duplicate Product',
};

type ProductListingProps = {
  mode?: ProductListingMode;
};

const initialProductDetails = {
  featured_highlights: [''],
  minimum_order: 1,
  included_items: '',
  price_per_unit: '',
  package_weight: '',
  category_id: null,
  unitName: '',
  is_bulk_price: false,
  bulk_pricing: [],
  product_name: '',
  description: '',
  cover_image: '',
  sub_images: [],
  in_stock: true,
  brand: '',
  unit: '',
  category_tree: '',
  images: {
    first: '',
    second: '',
    third: '',
    fourth: '',
    fifth: '',
    sixth: '',
    seventh: '',
    eighth: '',
  },
};

export default function ProductListing({ mode = 'add' }: ProductListingProps) {
  const [currentStep, setCurrentStep] = useState(1);

  const [defaultValues, setDefaultValues] = useState({
    brands: [],
    units: [],
  });

  const isUpdate = mode === 'edit';
  const isDuplicate = mode === 'duplicate';

  const router = useRouter();

  const [productDetails, setProductDetails] = useState(initialProductDetails);
  const [isFormLoading, setIsFormLoading] = useState(
    mode === 'edit' || mode === 'duplicate'
  );

  useEffect(() => {
    if (!router.isReady) return;

    let isMounted = true;
    const shouldLoadProduct = mode === 'edit' || mode === 'duplicate';
    const productId = router.query.id as string | undefined;
    const productRequest =
      shouldLoadProduct && productId
        ? getProductById(productId)
        : Promise.resolve(null);

    setIsFormLoading(shouldLoadProduct);

    Promise.allSettled([getBrands(), getUnits(), productRequest]).then(
      ([brandsResult, unitsResult, productResult]) => {
        if (!isMounted) return;

        setDefaultValues({
          brands:
            brandsResult.status === 'fulfilled' ? brandsResult.value : [],
          units: unitsResult.status === 'fulfilled' ? unitsResult.value : [],
        });

        if (productResult.status === 'fulfilled' && productResult.value) {
          setProductDetails(productResult.value);
        } else if (shouldLoadProduct) {
          console.log(productResult);
        }

        setIsFormLoading(false);
      }
    );

    return () => {
      isMounted = false;
    };
  }, [router.isReady, router.query.id, mode]);

  function incStep() {
    setCurrentStep((prev) => prev + 1);
  }

  function decStep() {
    setCurrentStep((prev) => prev - 1);
  }

  return (
    <section className=" w-full min-h-[75vh]">
      <div className="flex flex-col justify-between h-28 space-y-5 bg-white">
        <div className="max-w-max px-4 pt-4 text-xl font-medium underline decoration-gray-400 underline-offset-8">
          {PAGE_TITLES[mode]}
        </div>
        <ul className="flex h-8 space-x-10 justify-center w-full border-b border-gray-300">
          {listingSteps.map((step) => (
            <li
              key={step.id}
              className={`text-xl ${
                step.id === currentStep
                  ? 'border-blue-700 border-b-[3px] text-gray-700'
                  : 'text-gray-400'
              } `}
            >
              {step.label}
            </li>
          ))}
        </ul>
      </div>
      <div className="flex">
        <div className="w-44 min-h-full "></div>
        <div className="w-full min-h-full px-5 py-5 space-y-5 border-l-2">
          {currentStep === 1 && (
            <GeneralInformation
              setProductDetails={setProductDetails}
              productDetails={productDetails}
              defaultValues={defaultValues}
              currentStep={currentStep}
              isFormLoading={isFormLoading}
              incStep={incStep}
            />
          )}
          {currentStep === 2 && (
            <ProductDetails
              setProductDetails={setProductDetails}
              productDetails={productDetails}
              currentStep={currentStep}
              incStep={incStep}
              decStep={decStep}
            />
          )}
          {currentStep === 3 && (
            <PriceAndStock
              setProductDetails={setProductDetails}
              productDetails={productDetails}
              defaultValues={defaultValues}
              currentStep={currentStep}
              incStep={incStep}
              decStep={decStep}
            />
          )}
          {currentStep === 4 && (
            <ProductImagesAndVideos
              setProductDetails={setProductDetails}
              productDetails={productDetails}
              currentStep={currentStep}
              incStep={incStep}
              decStep={decStep}
            />
          )}
          {currentStep === 5 && (
            <ServicesAndDelivery
              setProductDetails={setProductDetails}
              productDetails={productDetails}
              currentStep={currentStep}
              isUpdate={isUpdate}
              isDuplicate={isDuplicate}
              incStep={incStep}
              decStep={decStep}
            />
          )}
        </div>
      </div>
    </section>
  );
}
