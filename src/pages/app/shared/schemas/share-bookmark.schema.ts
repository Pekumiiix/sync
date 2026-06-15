import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

import { emailBaseSchema } from '@/components/constants/schema';

export const shareBookmarkZodSchema = z.object({
  email: emailBaseSchema,
  action: z.enum(['viewer', 'editor'], { required_error: 'Action is required' })
});

export type ShareBookmarkData = z.infer<typeof shareBookmarkZodSchema>;

export const shareBookmarkSchema = toTypedSchema(shareBookmarkZodSchema);
