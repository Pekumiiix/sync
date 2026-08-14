import { toTypedSchema } from '@vee-validate/zod';
import { z } from 'zod';

import { passwordBaseSchema } from '@/components/constants/schema';

const joinWorkspaceZodSchema = z.object({
  password: passwordBaseSchema
});

export type JoinWorkspaceData = z.infer<typeof joinWorkspaceZodSchema>;

export const joinWorkspaceSchema = toTypedSchema(joinWorkspaceZodSchema);
