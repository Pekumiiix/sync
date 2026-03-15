import { createRouter, createWebHistory } from 'vue-router';

import AppLayout from '@/layouts/app-layout/index.vue';
// --- Layouts --------------
import MarketingLayout from '@/layouts/marketing-layout/index.vue';
// -- App Pages --------
import AllBookmarksPage from '@/pages/app/all-bookmarks/index.vue';
// -- Marketing Pages --------
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
    },
    {
      path: '/app',
      name: 'App',
      component: AppLayout,
      children: [
        {
          path: '',
          name: 'All Bookmarks',
          component: AllBookmarksPage
        }
      ]
    }
  ]
});

export default router;
