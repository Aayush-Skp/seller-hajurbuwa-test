type InputLabelProps = React.DetailedHTMLProps<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  HTMLLabelElement
> & {
  required?: boolean;
  label: string;
};

export default function InputLabel(props: InputLabelProps) {
  const { label, required, className = '', ...additionalProps } = props;

  return (
    <label
      className={`flex w-full text-sm select-none cursor-pointer whitespace-nowrap ${className}`}
      {...additionalProps}
    >
      {label}
      {required ? '*' : ''}
    </label>
  );
}
