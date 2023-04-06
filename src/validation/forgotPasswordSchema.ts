import { z } from 'zod';

export const EmailSchema = z.object({
  email: z
    .string()
    .min(1, { message: 'Please enter your email' })
    .email('Email must be a valid email'),
});

export type EmailSchemaType = z.infer<typeof EmailSchema>;

export const MatchPasswordSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: 'Please enter password' })
      .min(8, { message: 'Password must be at least 8 characters long' }),
    password_confirmation: z
      .string()
      .min(1, { message: 'Please confirm your password' }),
  })
  .refine((data) => data.password === data.password_confirmation, {
    path: ['password_confirmation'],
    message: 'Passwords do not match',
  });

export type MatchPasswordSchemaType = z.infer<typeof MatchPasswordSchema>;
