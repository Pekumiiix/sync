import { toTypedSchema } from '@vee-validate/zod';
import z from 'zod';

const verifyEmailZodSchema = z.object({
  otp: z
    .string({ required_error: 'OTP is required' })
    .min(6, 'OTP must be 6 digits')
    .max(6, 'OTP must be 6 digits')
});

export type VerifyEmailData = z.infer<typeof verifyEmailZodSchema>;

export const verifyEmailSchema = toTypedSchema(verifyEmailZodSchema);
