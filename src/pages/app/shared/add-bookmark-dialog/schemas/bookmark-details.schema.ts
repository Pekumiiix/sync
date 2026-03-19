import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const bookmarkDetailsZodSchema = z.object({
  image: z.string().url('Image must be a valid URL.').optional(),
  title: z
    .string({ required_error: 'A title is required.' })
    .min(1, 'Title cannot be empty.')
    .max(120, 'Title must be 120 characters or less.'),
  description: z
    .string({ required_error: 'A description is required.' })
    .max(500, 'Description cannot exceed 500 characters.'),
  collection: z
    .string({ required_error: 'Please select a collection.' })
    .min(1, 'Please select a collection.'),
  tags: z
    .array(
      z
        .string()
        .min(1, 'Tag cannot be empty.')
        .max(20, 'Individual tags must be 20 characters or less.')
    )
    .max(5, 'You can only add up to 5 tags.')
    .default([]),
  url: z
    .string({ required_error: 'A URL is required.' })
    .url('Please enter a valid URL (e.g., https://example.com).')
});

export type BookmarkDetails = z.infer<typeof bookmarkDetailsZodSchema>;

export const bookmarkDetailsSchema = toTypedSchema(bookmarkDetailsZodSchema);
