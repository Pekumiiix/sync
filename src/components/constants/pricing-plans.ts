export function pricingPlans(cycle: BillingCycle): IPricingPlans[] {
  return [
    {
      plan_name: 'free',
      usecase: 'Individuals & casual sharing',
      price: 0,
      benefits: [
        'Up to 3 Folders',
        '2 members per folder',
        '12-hour sync interval',
        'Standard link sharing'
      ]
    },
    {
      plan_name: 'basic',
      usecase: 'Small teams & active users',
      price: cycle === 'monthly' ? 2 : 20,
      variant_id: cycle === 'monthly' ? '1977743' : '1977755',
      benefits: [
        'Up to 20 Folders',
        '5 members per folder',
        '3-hour sync interval',
        'Join password-protected folders'
      ]
    },
    {
      plan_name: 'standard',
      usecase: 'Growing teams & power users',
      price: cycle === 'monthly' ? 5 : 48,
      variant_id: cycle === 'monthly' ? '1977772' : '1977780',
      benefits: [
        'Unlimited Folders',
        '10 members per folder',
        'Immediate sync interval',
        'Create & join password-protected folders'
      ]
    }
  ];
}

type BillingCycle = 'monthly' | 'yearly';

export type PlanName = 'free' | 'basic' | 'standard';

interface IPricingPlans {
  plan_name: PlanName;
  usecase: string;
  price: number;
  benefits: string[];
  variant_id?: string;
}
