import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const accountInformationZodSchema = z.object({
  avatar_url: z
    .string({ required_error: 'Avatar is required' })
    .url({ message: 'Please enter a valid URL for the avatar' })
    .max(2048, { message: 'URL exceeds maximum length of 2048 characters' }),
  first_name: z
    .string({ required_error: 'First name is required' })
    .trim()
    .min(1, { message: 'First name cannot be empty' })
    .max(50, { message: 'First name cannot exceed 50 characters' }),
  last_name: z
    .string({ required_error: 'Last name is required' })
    .trim()
    .min(1, { message: 'Last name cannot be empty' })
    .max(50, { message: 'Last name cannot exceed 50 characters' }),
  email: z
    .string({ required_error: 'Email address is required' })
    .trim()
    .min(1, { message: 'Email address is required' })
    .email({ message: 'Please enter a valid email address' })
    .max(255, { message: 'Email cannot exceed 255 characters' })
    .toLowerCase(),
  location: z
    .string({ required_error: 'Location is required' })
    .trim()
    .min(2, { message: 'Location must be at least 2 characters' })
    .max(100, { message: 'Location cannot exceed 100 characters' })
});

export type AccountInformationData = z.infer<typeof accountInformationZodSchema>;

export const accountInformationSchema = toTypedSchema(accountInformationZodSchema);
