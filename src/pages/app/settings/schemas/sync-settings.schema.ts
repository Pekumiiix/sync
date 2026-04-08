import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const syncSettingsZodSchema = z.object({
  syncInterval: z.enum(['Immediately', '3 hours', '6 hours', '12 hours'])
});

export type SyncSettingsData = z.infer<typeof syncSettingsZodSchema>;

export const syncSettingsSchema = toTypedSchema(syncSettingsZodSchema);
