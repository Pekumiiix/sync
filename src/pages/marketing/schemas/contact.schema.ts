import { toTypedSchema } from '@vee-validate/zod';
import * as z from 'zod';

const contactZodSchema = z.object({
  firstname: z
    .string({
      required_error: 'First name is required',
      invalid_type_error: 'First name must be text'
    })
    .min(2, 'First name must be at least 2 characters')
    .max(50, 'First name cannot exceed 50 characters'),
  lastname: z
    .string({
      required_error: 'Last name is required'
    })
    .min(2, 'Last name must be at least 2 characters')
    .max(50, 'Last name cannot exceed 50 characters'),
  email: z
    .string({
      required_error: 'Email address is required'
    })
    .email('Please enter a valid email address'),
  company: z
    .string({
      required_error: 'Company name is required'
    })
    .min(2, 'Company name must be at least 2 characters.')
    .max(100, 'Company name cannot exceed 100 characters'),
  country: z
    .string({
      required_error: 'Country is required'
    })
    .min(2, 'Please enter a valid country'),
  message: z
    .string({
      required_error: 'Please enter a message'
    })
    .min(10, 'Message must be at least 10 characters long')
    .max(1000, 'Message cannot exceed 1000 characters')
});

export type ContactData = z.infer<typeof contactZodSchema>;

export const contactSchema = toTypedSchema(contactZodSchema);
