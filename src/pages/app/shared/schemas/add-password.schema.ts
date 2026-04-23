import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

import { passwordBaseSchema } from '@/components/constants/password-schema';

export const addPasswordZodSchema = z
  .object({
    password: passwordBaseSchema,
    confirmPassword: z
      .string({ required_error: 'Please confirm your password' })
      .min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

export type AddPasswordData = z.infer<typeof addPasswordZodSchema>;

export const addPasswordSchema = toTypedSchema(addPasswordZodSchema);
