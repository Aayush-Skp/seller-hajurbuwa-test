import Image from 'next/image';
import { BsFire } from 'react-icons/bs';

type Product = {
  id: number;
  name: string;
  description: string;
  image: string;
  salesIncrement: string;
};

type HotSellingProductsProps = {
  products: Product[];
};

const HotSellingProducts = ({ products }: HotSellingProductsProps) => {
  return (
    <div
      className="flex flex-col justify-center items-start space-x-8 w-1/2 m-10 rounded-lg"
      style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)' }}
    >
      <div className="row py-4 w-full flex items-center justify-start px-10 text-xxl">
        <BsFire />
        <span className="ml-4">Hot Selling Products - This Month</span>
      </div>
      <div className="grid grid-cols-1  lg:grid-cols-3 border-t-2 w-11/12 pt-2 ">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-lg overflow-hidden w-11/12 m-3"
            style={{ boxShadow: '0px 0px 10px rgba(0, 0, 0, 0.25)' }}
          >
            <div className="flex items-center space-x-4 p-4">
              <div className="w-20 h-20 relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-bold">{product.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="text-red-500 font-bold text-lg">
                {product.salesIncrement}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotSellingProducts;
