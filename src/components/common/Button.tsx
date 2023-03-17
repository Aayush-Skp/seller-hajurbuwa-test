type ButtonProps = React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>;

export default function Button({
  className = '',
  children,
  disabled,
  ...additionalProps
}: ButtonProps) {
  return (
    <button
      className={`text-white px-4 py-2 bg-blue-700 hover:bg-Primary rounded ${
        disabled ? 'opacity-50' : 'opacity-100'
      } ${className}`}
      {...additionalProps}
    >
      {children}
    </button>
  );
}
