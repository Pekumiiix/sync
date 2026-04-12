import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const addBookmarkZodSchema = z.object({
  url: z.string({ required_error: 'Provide a valid URL' }).url({ message: 'URL is not valid' })
});

export type AddBookmarkData = z.infer<typeof addBookmarkZodSchema>;

export const addBookmarkSchema = toTypedSchema(addBookmarkZodSchema);
