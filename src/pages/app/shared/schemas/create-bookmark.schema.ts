import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const createBookmarkZodSchema = z.object({
  coverImageUrl: z.string().url('Image must be a valid URL.').optional(),
  title: z
    .string({ required_error: 'A title is required.' })
    .min(1, 'Title cannot be empty.')
    .max(120, 'Title must be 120 characters or less.')
    .optional(),
  description: z
    .string({ required_error: 'A description is required.' })
    .max(500, 'Description cannot exceed 500 characters.')
    .optional(),
  url: z
    .string({ required_error: 'A URL is required.' })
    .url('Please enter a valid URL (e.g., https://example.com).'),
  domain: z.string({ required_error: 'A domain is required.' }).min(1, 'Domain cannot be empty.'),
  websiteName: z
    .string({ required_error: 'A website name is required.' })
    .min(1, 'Website name cannot be empty.')
    .optional(),
  favIconUrl: z.string().url('Favicon must be a valid URL.').optional(),
  folderId: z
    .string({ required_error: 'A folder ID is required.' })
    .min(1, 'Folder ID cannot be empty.'),
  tags: z.array(z.string().min(1, 'Tag cannot be empty.')).optional(),
  browser: z
    .string({ required_error: 'Browser name is required.' })
    .min(1, 'Browser name cannot be empty.')
});

export type CreateBookmarkData = z.infer<typeof createBookmarkZodSchema>;

export const createBookmarkSchema = toTypedSchema(createBookmarkZodSchema);
