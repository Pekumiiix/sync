export function pricingPlans(cycle: BillingCycle): IPricingPlans[] {
  return [
    {
      plan_name: 'free',
      usecase: 'small group',
      price: 0,
      benefits: ['1 users', '3 Folders', 'Folder Download']
    },
    {
      plan_name: 'basic',
      usecase: 'small group',
      price: cycle === 'monthly' ? 2 : 20,
      benefits: [
        '1-3 users',
        '10 Folders',
        'Folder Download',
        'Full-Page Archiving',
        'Shared Folders with Roles',
        'Priority Syncing'
      ]
    },
    {
      plan_name: 'standard',
      usecase: 'midsize group',
      price: cycle === 'monthly' ? 5 : 48,
      benefits: [
        '4-10 users',
        'Unlimited Folders',
        'Folder Download',
        'Full-Page Archiving',
        'Shared Folders with Roles',
        'Priority Syncing'
      ]
    }
  ];
}

type BillingCycle = 'monthly' | 'yearly';

interface IPricingPlans {
  plan_name: 'free' | 'basic' | 'standard';
  usecase: string;
  price: number;
  benefits: string[];
}
