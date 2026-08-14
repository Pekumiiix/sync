import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

import { passwordBaseSchema } from '@/components/constants/schema';

const changeFolderPasswordZodSchema = z
  .object({
    oldPassword: passwordBaseSchema,
    newPassword: passwordBaseSchema,
    confirmPassword: z
      .string({ required_error: 'Please confirm your password' })
      .min(1, 'Please confirm your password')
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword']
  });

export type ChangeFolderPasswordData = z.infer<typeof changeFolderPasswordZodSchema>;

export const changeFolderPasswordSchema = toTypedSchema(changeFolderPasswordZodSchema);
