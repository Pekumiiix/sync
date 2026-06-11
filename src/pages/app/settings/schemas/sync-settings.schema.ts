import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const syncSettingsZodSchema = z.object({
  syncInterval: z.enum(['immediate', '3_hours', '6_hours', '12_hours'])
});

export type SyncSettingsData = z.infer<typeof syncSettingsZodSchema>;

export const syncSettingsSchema = toTypedSchema(syncSettingsZodSchema);
