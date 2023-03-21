import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function useFormValidation(validationSchema: Zod.Schema) {
  const formOptions = { resolver: zodResolver(validationSchema) };

  const {
    register,
    handleSubmit,
    setError,
    formState,
    setValue,
    reset,
    control,
  } = useForm(formOptions);
  return {
    register,
    handleSubmit,
    setError,
    setValue,
    control,
    reset,
    ...formState,
  };
}
