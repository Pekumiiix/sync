import { createRouter, createWebHistory } from 'vue-router';

import MarketingLayout from '@/layouts/marketing-layout/index.vue';
import HomePage from '@/pages/marketing/home/index.vue';
import PricingPage from '@/pages/marketing/pricing/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Homepage',
      component: MarketingLayout,
      children: [
        {
          path: '',
          name: 'Home',
          component: HomePage
        },
        {
          path: 'pricing',
          name: 'Pricing',
          component: PricingPage
        }
      ]
    }
  ]
});

export default router;
