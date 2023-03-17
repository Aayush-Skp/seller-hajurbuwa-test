type ErrorMessageProps = {
  message: string;
};

export default function ErrorMessage({ message = '' }: ErrorMessageProps) {
  return <p className={`text-xs text-red-400`}>{message}</p>;
}
