import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

export default function useFormValidation(validationSchema: Zod.Schema) {
  type ValidationSchemaType = z.infer<typeof validationSchema>;
  const formOptions = { resolver: zodResolver(validationSchema) };

  const {
    reset,
    control,
    register,
    setError,
    setValue,
    formState,
    handleSubmit,
  } = useForm<ValidationSchemaType>(formOptions);

  const { errors, isValid } = formState;

  return {
    reset,
    control,
    register,
    setError,
    setValue,
    handleSubmit,
    formState,
    errors,
    isValid,
  };
}
