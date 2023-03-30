import React from 'react';

type FileInputFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const FileInput = React.forwardRef<HTMLInputElement, FileInputFieldProps>(
  function InputField(
    { placeholder, accept, multiple, name, id, ...additionalProps },
    ref
  ) {
    return (
      <label
        htmlFor={id}
        className="group w-24 h-20 md:h-24 lg:h-24 md:w-36 lg:w-36 outline-dotted outline-gray-400 p-2 rounded cursor-pointer"
      >
        <input
          id={id}
          name={name}
          multiple={multiple}
          ref={ref}
          type="file"
          accept={accept}
          className="hidden"
          {...additionalProps}
        />
        <div className="flex flex-col items-center justify-center space-y-2 md:space-y-4 lg:space-y-4">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="w-5 md:w-6 transition-transform md:group-hover:scale-125 lg:md:group-hover:scale-125 duration-300"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z"
              />
            </svg>
          </div>
          <p className="text-center text-xs md:text-sm lg:text-sm md:group-hover:text-gray-500 lg:group-hover:text-gray-500 transition-colors duration-300">
            {placeholder
              ? placeholder
              : `Please select ${multiple ? 'files' : 'a file'} to upload`}
          </p>
        </div>
      </label>
    );
  }
);

export default FileInput;
