import { createRouter, createWebHistory } from 'vue-router';

// --- Layouts --------------
import AppLayout from '@/layouts/app-layout/index.vue';
import AuthLayout from '@/layouts/auth-layout/index.vue';
import MarketingLayout from '@/layouts/marketing-layout/index.vue';
// -- App Pages --------
import AllBookmarksPage from '@/pages/app/all-bookmarks/index.vue';
import BookmarkFolderPage from '@/pages/app/bookmark-folder/index.vue';
import MembersPage from '@/pages/app/members/index.vue';
import SettingsPage from '@/pages/app/settings/index.vue';
// -- Auth Pages --------
import ForgotPasswordPage from '@/pages/auth/forgot-password/index.vue';
import ResetPasswordPage from '@/pages/auth/reset-paasword/index.vue';
import SignInPage from '@/pages/auth/sign-in/index.vue';
import SignUpPage from '@/pages/auth/sign-up/index.vue';
// -- Marketing Pages --------
import HomePage from '@/pages/marketing/home/index.vue';
import PricingPage from '@/pages/marketing/pricing/index.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // --- Marketing Routes ---
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

    // --- Auth Routes ---
    {
      path: '/auth',
      name: 'Auth',
      component: AuthLayout,
      children: [
        {
          path: 'sign-in',
          name: 'Sign In',
          component: SignInPage
        },
        {
          path: 'sign-up',
          name: 'Sign Up',
          component: SignUpPage
        },
        {
          path: 'forgot-password',
          name: 'Forgot Password',
          component: ForgotPasswordPage
        },
        {
          path: 'reset-password',
          name: 'Reset Password',
          component: ResetPasswordPage
        }
      ]
    },

    // --- App Routes ---
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
