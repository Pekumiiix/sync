import { computed, watch } from 'vue';
import { defineStore } from 'pinia';

import { useCurrentUser } from '@/hooks/useAccount';
import { useSignIn, useSignOut } from '@/hooks/useAuth';

export const useAuthStore = defineStore('auth', () => {
  const { data, isLoading: isFetchingCurrentUser } = useCurrentUser();

  const signIn = useSignIn();
  const signOut = useSignOut();

  const isLoading = computed(
    () => signIn.isPending.value || signOut.isPending.value || isFetchingCurrentUser.value
  );
  const user = computed(() => data.value?.data.user || null);
  const isAuthenticated = computed(() => !!user.value);

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
    checkAuthStatus
  };
});
