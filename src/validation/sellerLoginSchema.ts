import { z } from 'zod';

export const LoginSchema = z.object({
  email: z.string().min(1, { message: 'Please enter your email or phone no.' }),
  password: z.string().min(1, { message: 'Please enter your password' }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
