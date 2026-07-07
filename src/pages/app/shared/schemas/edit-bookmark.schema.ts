import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const editBookmarkZodSchema = z.object({
  title: z
    .string({ required_error: 'A title is required.' })
    .min(1, 'Title cannot be empty.')
    .max(120, 'Title must be 120 characters or less.')
    .optional(),
  description: z
    .string({ required_error: 'A description is required.' })
    .max(500, 'Description cannot exceed 500 characters.')
    .optional(),
  tags: z.array(z.string().min(1, 'Tag cannot be empty.')).optional()
});

export type EditBookmarkData = z.infer<typeof editBookmarkZodSchema>;

export const editBookmarkSchema = toTypedSchema(editBookmarkZodSchema);
