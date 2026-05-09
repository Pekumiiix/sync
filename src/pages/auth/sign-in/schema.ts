import { toTypedSchema } from '@vee-validate/zod';
import z from 'zod';

import { emailBaseSchema, passwordBaseSchema } from '@/components/constants/schema';

const signInZodSchema = z.object({
  email: emailBaseSchema,
  password: passwordBaseSchema,
  rememberMe: z.boolean().optional()
});

export type SignInData = z.infer<typeof signInZodSchema>;

export const signInSchema = toTypedSchema(signInZodSchema);
