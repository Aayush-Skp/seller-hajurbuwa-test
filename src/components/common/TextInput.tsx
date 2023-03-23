import React from 'react';

type TextInputFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: boolean;
};

const TextInput = React.forwardRef<HTMLInputElement, TextInputFieldProps>(
  function InputField({ className = '', error, ...additionalProps }, ref) {
    return (
      <input
        className={`${className} w-full h-10 px-3 border-[1px] ${
          error ? 'border-error-primary text-error-primary' : 'border-gray-600'
        }  outline-none rounded focus:shadow-[1px_-1px_8px_rgba(0,0,0,0.30)] transition-shadow duration-300`}
        ref={ref}
        {...additionalProps}
      />
    );
  }
);

export default TextInput;
