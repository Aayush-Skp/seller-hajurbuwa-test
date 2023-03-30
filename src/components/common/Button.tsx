type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  className = '',
  children,
  disabled,
  type,
  ...additionalProps
}: ButtonProps) {
  return (
    <button
      className={`w-full text-white px-4 py-2 bg-blue-700 rounded ${
        disabled
          ? 'bg-opacity-50 cursor-not-allowed'
          : 'hover:opacity-80 transition-opacity'
      } ${className}`}
      disabled={disabled}
      type={type ?? 'button'}
      {...additionalProps}
    >
      {children}
    </button>
  );
}
