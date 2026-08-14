import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

const notificationZodSchema = z.object({
  notifyOnNewMember: z.boolean().optional(),
  notifyOnNewBookmark: z.boolean().optional()
});

export type NotificationData = z.infer<typeof notificationZodSchema>;

export const notificationSchema = toTypedSchema(notificationZodSchema);
