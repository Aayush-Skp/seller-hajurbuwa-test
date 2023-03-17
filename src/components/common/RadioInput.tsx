import React from 'react';

type CheckboxInputFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const RadioInput = React.forwardRef<HTMLInputElement, CheckboxInputFieldProps>(
  function CustomCheckbox({ className = '', ...additionalProps }, ref) {
    return (
      <input
        type="radio"
        ref={ref}
        {...additionalProps}
        className={`h-6 w-6 border-0 ring-0 accent-blue-600 cursor-pointer ${className}`}
      />
    );
  }
);

export default RadioInput;
