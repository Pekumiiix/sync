import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const createFolderZodSchema = z.object({
  name: z
    .string({ required_error: 'Folder name is required' })
    .min(3, 'Folder name must be at least 3 characters long')
});

export type CreateFolderData = z.infer<typeof createFolderZodSchema>;

export const createFolderSchema = toTypedSchema(createFolderZodSchema);
