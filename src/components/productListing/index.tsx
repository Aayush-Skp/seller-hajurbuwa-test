import React, { useState } from 'react';
import Button from '../common/Button';
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
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <section className="h-full w-full">
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
          {currentStep === 1 && <GeneralInformation />}
          {currentStep === 2 && <ProductDetails />}
          {currentStep === 3 && <PriceAndStock />}
          {currentStep === 4 && <ProductImagesAndVideos />}
          {currentStep === 5 && <ServicesAndDelivery />}
          <div className="flex justify-end pr-8 pb-10 space-x-3">
            <Button className="px-16 py-4">Save As Draft</Button>
            <Button className="px-16 py-4">Discard</Button>
            <Button
              onClick={() => setCurrentStep((prev) => prev + 1)}
              className="px-16 py-4"
            >
              Continue
            </Button>
          </div>
        </div>
      </div>
      <div></div>
    </section>
  );
}
