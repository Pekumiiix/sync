import { toTypedSchema } from '@vee-validate/zod';
import z from 'zod';

import { passwordBaseSchema } from '@/components/constants/schema';

const resetPasswordZodSchema = z
  .object({
    password: passwordBaseSchema,
    confirmPassword: z
      .string({ required_error: 'Please confirm your password' })
      .min(1, 'Please confirm your password')
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match'
  });

export type ResetPasswordData = z.infer<typeof resetPasswordZodSchema>;

export const resetPasswordSchema = toTypedSchema(resetPasswordZodSchema);
