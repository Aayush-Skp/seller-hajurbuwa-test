type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message = '' }: ErrorMessageProps) {
  return (
    <span role="alert" className={`text-xs text-red-200`}>
      {message}
    </span>
  );
}
