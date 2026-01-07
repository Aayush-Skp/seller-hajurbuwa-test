import { z , ZodSchema } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

export default function useFormValidation(validationSchema: ZodSchema) {
  const formOptions = { resolver: zodResolver(validationSchema) };

  const {
    reset,
    control,
    setError,
    register,
    setValue,
    formState,
    getValues,
    handleSubmit,
  } = useForm<z.infer<typeof validationSchema>>(formOptions);

  const { errors, isValid } = formState;

  return {
    reset,
    errors,
    control,
    isValid,
    register,
    setError,
    setValue,
    getValues,
    formState,
    handleSubmit,
  };
}
