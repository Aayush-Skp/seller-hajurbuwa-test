export default function Header({ header }: { header: string }) {
  return (
    <div className="flex items-end w-full bg-white h-[82px] pl-[33.83px] pt-2 text-2xl border-b-[3px] border-gray-300 font-semibold">
      <span className="">{header}</span>
    </div>
  );
}
