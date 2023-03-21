import React from 'react';

type SelectInputProps = React.DetailedHTMLProps<
  React.SelectHTMLAttributes<HTMLSelectElement>,
  HTMLSelectElement
> & {
  options: string[] | number[];
};

export default function SelectInput({
  className = '',
  options,
  ...additionalProps
}: SelectInputProps) {
  return (
    <select
      className={`w-full h-10 border-[1px] border-gray-600 outline-none rounded focus:shadow-[1px_-1px_8px_rgba(0,0,0,0.30)] transition-shadow duration-300 cursor-pointer ${className}`}
      {...additionalProps}
    >
      {options.map((option: string | number) => (
        <option key={option} value={option}>
          {option}
        </option>
      ))}
    </select>
  );
}
