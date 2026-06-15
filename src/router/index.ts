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
import VerifyEmailPage from '@/pages/auth/verify-email/index.vue';
// -- Marketing Pages --------
import HomePage from '@/pages/marketing/home/index.vue';
import PricingPage from '@/pages/marketing/pricing/index.vue';
// import { useAuthStore } from '@/stores/auth.store';

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
      meta: { requiresGuest: true },
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
        },
        {
          path: 'verify-email',
          name: 'Verify Email',
          component: VerifyEmailPage
        }
      ]
    },

    // --- App Routes ---
    {
      path: '/app',
      name: 'App',
      component: AppLayout,
      meta: { requiresAuth: true },
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

// router.beforeEach((to, from, next) => {
//   const authStore = useAuthStore();

//   if (to.query.invite_token) {
//     localStorage.setItem('pending_invite', to.query.invite_token as string);

//     const query = { ...to.query };
//     delete query.invite_token;

//     return next({ ...to, query });
//   }

//   if (to.meta.requiresAuth && !authStore.isAuthenticated) {
//     return next({
//       name: 'Sign In',
//       query: { redirect: to.fullPath }
//     });
//   }

//   if (to.meta.requiresGuest && authStore.isAuthenticated) {
//     return next({ name: 'All Bookmarks' });
//   }

//   next();
// });

export default router;
