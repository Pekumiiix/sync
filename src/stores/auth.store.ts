import { computed } from 'vue';
import { defineStore } from 'pinia';

import { useCurrentUser, useSignIn, useSignOut } from '@/hooks/useAuth';

export const useAuthStore = defineStore('auth', () => {
  const { data, isLoading: isFetchingCurrentUser } = useCurrentUser();

  const signIn = useSignIn();
  const signOut = useSignOut();

  const isLoading = computed(
    () => signIn.isPending || signOut.isPending || isFetchingCurrentUser.value
  );
  const user = computed(() => data.value || null);
  const isAuthenticated = computed(() => !!user.value);

  return {
    user,
    isLoading,
    isAuthenticated,
    signIn,
    signOut
  };
});
