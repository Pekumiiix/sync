import { toTypedSchema } from '@vee-validate/zod';
import z from 'zod';

import { emailBaseSchema, passwordBaseSchema } from '@/components/constants/schema';

const signUpZodSchema = z
  .object({
    name: z.string().min(2, 'Name must be at least 2 characters long'),
    email: emailBaseSchema,
    password: passwordBaseSchema,
    confirmPassword: z.string().min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match'
  });

export type SignUpData = z.infer<typeof signUpZodSchema>;

export const signUpSchema = toTypedSchema(signUpZodSchema);
