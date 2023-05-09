import Image from 'next/image';
import React from 'react';
import leftChevron from '../../public/icons/leftChevron.svg';
import rightChevron from '../../public/icons/rightChevron.svg';

export default function Pagination({ paginationData, setCurrentPageUrl }: any) {
  if (paginationData.links.length < 4) return null;

  return (
    <section className="flex flex-col items-end space-y-[7px]">
      <div className="flex items-center justify-center w-[209px] h-[51px] bg-gray-100">
        {paginationData?.per_page} Results Per Page V
      </div>

      <ul className="flex space-x-[8px]">
        {paginationData?.links?.map((link: any, idx: any) => {
          return (
            <li key={idx}>
              <button
                onClick={() => {
                  setCurrentPageUrl(link?.url && link.url.split('/api')[1]);
                }}
                type="button"
                className={`flex w-[50px] h-[50px] items-center justify-center px-2 py-2 border-2 rounded-[4px] font-semibold ${
                  link.active
                    ? 'border-blue-700 text-blue-700'
                    : 'border-gray-200'
                } `}
              >
                {idx === 0 ? (
                  <Image
                    height={32}
                    width={32}
                    src={rightChevron}
                    alt="left icon"
                  />
                ) : idx === paginationData.links.length - 1 ? (
                  <Image
                    height={32}
                    width={32}
                    src={leftChevron}
                    alt="left icon"
                  />
                ) : (
                  link?.label
                )}
              </button>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
