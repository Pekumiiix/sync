import { toTypedSchema } from '@vee-validate/zod';
import z from 'zod';

import { emailBaseSchema } from '@/components/constants/schema';

const forgotPasswordZodSchema = z.object({
  email: emailBaseSchema
});

export type ForgotPasswordData = z.infer<typeof forgotPasswordZodSchema>;

export const forgotPasswordSchema = toTypedSchema(forgotPasswordZodSchema);
