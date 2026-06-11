import type { TSyncFrequency } from '@/types/settings.type';

export const syncFrequency: { label: string; value: TSyncFrequency }[] = [
  {
    label: 'Immediately',
    value: 'immediate'
  },
  {
    label: 'Every 3 hours',
    value: '3_hours'
  },
  {
    label: 'Every 6 hours',
    value: '6_hours'
  },
  {
    label: 'Every 12 hours',
    value: '12_hours'
  }
];
