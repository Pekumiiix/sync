import { computed, ref, watch } from 'vue';
import { defineStore } from 'pinia';

import { useCurrentUser } from '@/hooks/useAccount';
import { useSignIn, useSignOut } from '@/hooks/useAuth';

export const useAuthStore = defineStore('auth', () => {
  const { data, isLoading: isFetchingCurrentUser } = useCurrentUser();

  const signIn = useSignIn();
  const signOut = useSignOut();

  const token = ref<string | null>(localStorage.getItem('auth_token'));

  const isLoading = computed(
    () => signIn.isPending.value || signOut.isPending.value || isFetchingCurrentUser.value
  );

  const user = computed(() => data.value?.data.user || null);
  const isAuthenticated = computed(() => !!token.value || !!user.value);

  const setCredentials = (newToken: string) => {
    token.value = newToken;
  };

  const clearCredentials = () => {
    token.value = null;
    localStorage.removeItem('auth_token');
    localStorage.removeItem('pending_invite');
  };

  const checkAuthStatus = async () => {
    return new Promise((resolve) => {
      if (!isFetchingCurrentUser.value) {
        resolve(true);
        return;
      }

      const unwatch = watch(isFetchingCurrentUser, (isFetching) => {
        if (!isFetching) {
          unwatch();
          resolve(true);
        }
      });
    });
  };

  return {
    user,
    isLoading,
    isAuthenticated,
    signIn,
    signOut,
    checkAuthStatus,
    setCredentials,
    clearCredentials
  };
});
