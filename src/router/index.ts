import { createRouter, createWebHistory } from 'vue-router';

// --- Layouts --------------
import AppLayout from '@/layouts/app-layout/index.vue';
import MarketingLayout from '@/layouts/marketing-layout/index.vue';
// -- App Pages --------
import AllBookmarksPage from '@/pages/app/all-bookmarks/index.vue';
import BookmarkFolderPage from '@/pages/app/bookmark-folder/index.vue';
import MembersPage from '@/pages/app/members/index.vue';
import SettingsPage from '@/pages/app/settings/index.vue';
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
          path: 'all-bookmarks',
          name: 'All Bookmarks',
          component: AllBookmarksPage
        },
        {
          path: 'settings',
          name: 'Settings',
          component: SettingsPage
        },
        {
          path: ':folderId',
          name: 'Bookmark Folder',
          component: BookmarkFolderPage
        },
        {
          path: ':folderId/members',
          name: 'Members',
          component: MembersPage
        }
      ]
    }
  ]
});

export default router;
