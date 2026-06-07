import React, { useEffect } from 'react';
import removeBaseUrl from '../../utils/removeBaseUrl';

const Pagination = (props: {
  pagination: { links?: any[]; last_page?: number };
  setReqUrl: (url: string) => void;
  keyword?: string;
}) => {
  const { pagination, setReqUrl, keyword } = props;
  const { links, last_page } = pagination;
  const [pages, setPages] = React.useState<any[]>([]);

  useEffect(() => {
    links && setPages(links);
  }, [links]);

  if (!last_page || last_page <= 1) return null;

  return (
    <div className="mt-10 flex w-full items-center justify-end">
      <div className="flex justify-end">
        {pages.map((page: any) => (
          <PaginationItem
            keyword={keyword}
            key={page.label}
            setUrl={setReqUrl}
            page={page}
          />
        ))}
      </div>
    </div>
  );
};

const PaginationItem = (props: {
  page: { url: string | null; active: boolean; label: string };
  setUrl: (url: string) => void;
  keyword?: string;
}) => {
  const { page, setUrl, keyword } = props;

  const handleClick = () => {
    if (!page.url) return;

    let nextUrl = removeBaseUrl(page.url);

    if (keyword && keyword.length > 0 && !nextUrl.includes('keyword=')) {
      const separator = nextUrl.includes('?') ? '&' : '?';
      nextUrl = `${nextUrl}${separator}keyword=${encodeURIComponent(keyword)}`;
    }

    setUrl(nextUrl);
  };

  if (!page.url) return null;

  return (
    <div className="mx-2 flex items-center justify-center">
      <button
        onClick={handleClick}
        className={`cursor-pointer rounded-md border-2 border-gray-300 px-4 py-2 transition-all duration-100 hover:scale-125 ${
          page.active ? 'bg-blue-700 text-white' : 'bg-gray-100 text-black'
        }`}
      >
        {page.label === 'pagination.next'
          ? 'Next'
          : page.label === 'pagination.previous'
            ? 'Previous'
            : page.label}
      </button>
    </div>
  );
};

export default Pagination;
