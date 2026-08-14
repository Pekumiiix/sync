import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const bookmarkManagementZodSchema = z.object({
  autoMergeBookmarks: z.boolean()
});

export type BookmarkManagementData = z.infer<typeof bookmarkManagementZodSchema>;

export const bookmarkManagementSchema = toTypedSchema(bookmarkManagementZodSchema);
