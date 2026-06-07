type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export function YesButton({
  className = '',
  children,
  disabled,
  ...additionalProps
}: ButtonProps) {
  return (
    <button
      className={`text-white px-8 py-2 border-2 ml-2 border-blue-700 bg-blue-700 rounded outline-none ${
        disabled
          ? 'bg-opacity-50 cursor-not-allowed'
          : 'hover:opacity-80 transition-opacity'
      } ${className}`}
      disabled={disabled}
      {...additionalProps}
    >
      {children}
    </button>
  );
}

export function NoButton({
  className = '',
  children,
  disabled,
  ...additionalProps
}: ButtonProps) {
  return (
    <button
      className={`text-black border-2 border-blue-700 mr-2 px-8 py-2 outline-none bg-white rounded ${
        disabled
          ? 'bg-opacity-50 cursor-not-allowed'
          : 'hover:bg-gray-100 transition-opacity'
      } ${className}`}
      disabled={disabled}
      {...additionalProps}
    >
      {children}
    </button>
  );
}
