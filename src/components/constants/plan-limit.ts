import type { PlanName } from './pricing-plans';

export const PLAN_FOLDER_LIMITS: Record<PlanName, number> = {
  free: 3,
  basic: 20,
  standard: Infinity
};

export const folderLimitConfig: Record<Exclude<PlanName, 'standard'>, ILimitConfig> = {
  free: {
    title: 'Free plan limit reached',
    description:
      'You can only create 3 folders on the free plan. Upgrade to Basic for up to 20 folders.'
  },
  basic: {
    title: 'Basic plan limit reached',
    description: 'You have reached your 20-folder limit. Upgrade to Standard for unlimited folders.'
  }
};

export const PLAN_MEMBER_LIMIT: Record<PlanName, number> = {
  free: 2,
  basic: 5,
  standard: 10
};

export const memberLimitConfig: Record<PlanName, ILimitConfig> = {
  free: {
    title: 'Free plan limit reached',
    description:
      'You can only invite 2 members on the free plan. Upgrade to Basic for up to 5 members.'
  },
  basic: {
    title: 'Basic plan limit reached',
    description: 'You have reached your 5-member limit. Upgrade to Standard for up to 10 members.'
  },
  standard: {
    title: 'Maximum capacity reached',
    description:
      'You have reached the maximum limit of 10 members per folder. Contact support for larger teams.'
  }
};

interface ILimitConfig {
  title: string;
  description: string;
}
