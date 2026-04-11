import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

export const notificationZodSchema = z.object({
  notify_on_new_member: z.boolean(),
  notify_on_new_bookmark: z.boolean()
});

export type NotificationData = z.infer<typeof notificationZodSchema>;

export const notificationSchema = toTypedSchema(notificationZodSchema);
