import { useEffect, useState } from 'react';
import { BsSearch } from 'react-icons/bs';

type SearchProps = {
  placeholder: string;
  setKeyword: (keyword: string) => void;
  pageName?: string;
  setUrl?: (url: string) => void;
  className?: string;
};

const Search = ({
  placeholder,
  pageName,
  setUrl,
  setKeyword,
  className,
}: SearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    if (searchTerm === '' || !pageName || !setUrl) {
      return;
    }
    setUrl(
      `/seller/${pageName}/search?keyword=${encodeURIComponent(searchTerm)}&page=1`
    );
  }, [searchTerm, pageName, setUrl]);

  return (
    <div className={className ?? 'm-2 mr-[10.5rem] relative'}>
      <BsSearch className="absolute top-[50%] left-2 transform translate-y-[-50%] text-[#d9d9d9]" />
      <input
        className="bg-[#f5f5f5] pl-10 h-10 rounded-md text-md outline-none active:outline-none focus:outline-none w-[50rem] border-none"
        type="text"
        placeholder={placeholder}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          setKeyword(e.target.value);
        }}
        value={searchTerm}
      />
    </div>
  );
};

export default Search;
