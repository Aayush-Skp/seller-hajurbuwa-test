import Image from 'next/image';
import searchIcon from '../../public/icons/searchIcon.svg';

export default function Header({
  header,
  onSearchTextChange,
}: {
  header: string;
  onSearchTextChange?: (value: string) => void;
}) {
  return (
    <div className="flex items-end w-full bg-white h-[82px] px-[33.83px] pt-2 text-2xl border-b-[3px] border-gray-300 font-semibold">
      <span className="">{header}</span>
    </div>
  );
}
