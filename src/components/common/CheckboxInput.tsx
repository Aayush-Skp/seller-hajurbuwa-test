import React from 'react';

type CheckboxInputFieldProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
>;

const CheckboxInput = React.forwardRef<
  HTMLInputElement,
  CheckboxInputFieldProps
>(function CustomCheckbox({ className = '', ...additionalProps }, ref) {
  return (
    <input
      type="checkbox"
      ref={ref}
      {...additionalProps}
      className={`h-4 w-4 border-0 ring-0 accent-blue-600 cursor-pointer ${className}`}
    />
  );
});

export default CheckboxInput;
