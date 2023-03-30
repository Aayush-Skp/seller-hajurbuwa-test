import React, { useEffect, useState } from 'react';
import { getBrands } from '../../services/getBrandService';
import { getUnits } from '../../services/getUnitService';
import GeneralInformation from './GeneralInformation';
import PriceAndStock from './PriceAndStock';
import ProductDetails from './ProductDetails';
import ProductImagesAndVideos from './ProductImagesAndVideos';
import ServicesAndDelivery from './ServicesAndDelivery';

const listingSteps = [
  { id: 1, label: 'General Information' },
  { id: 2, label: 'Product Details' },
  { id: 3, label: 'Price and Stock' },
  { id: 4, label: 'Images and Videos' },
  { id: 5, label: 'Services and Delivery' },
];

export default function ProductListing() {
  const [currentStep, setCurrentStep] = useState(3);
  const [defaultValues, setDefaultValues] = useState({
    brands: [],
    units: [],
  });

  const [productDetails, setProductDetails] = useState({
    product_name: '',
    product_type: '',
    brand: '',
    unit: '',
    minimum_order: 1,
    description: '',
    featured_highlights: [],
    included_items: '',
    price_per_unit: '',
    in_stock: '',
    package_weight: '',
    cover_image: '',
    sub_images: '',
    isBulkPrice: false,
    bulkPrices: [],
  });

  useEffect(() => {
    getBrands()
      .then((brands) => {
        getUnits().then((units) =>
          setDefaultValues({
            units: units,
            brands: brands,
          })
        );
      })
      .catch(console.log);
  }, []);

  function incStep() {
    setCurrentStep((prev) => prev + 1);
  }

  function decStep() {
    setCurrentStep((prev) => prev - 1);
  }

  return (
    <section className="h-full w-full pb-5">
      <div className="flex flex-col justify-between h-28 space-y-5 bg-white">
        <div className="max-w-max px-4 pt-4 text-xl font-medium underline decoration-gray-400 underline-offset-8">
          Add Product
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
      <div className="flex h-full divide-x divide-gray-400">
        <aside className="w-44 h-full border-r border-gray-300"></aside>
        <div className="w-full px-5 py-5 h-96 space-y-5">
          {currentStep === 1 && (
            <GeneralInformation
              setProductDetails={setProductDetails}
              productDetails={productDetails}
              defaultValues={defaultValues}
              currentStep={currentStep}
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
              incStep={incStep}
              decStep={decStep}
            />
          )}
        </div>
      </div>
    </section>
  );
}
