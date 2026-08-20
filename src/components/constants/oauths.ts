export const oauthConfig: Record<string, { name: string; icon: string }> = {
  google: {
    name: 'Google',
    icon: '/images/auth/google.png'
  }
};

export function getOAuthConfig(provider: string) {
  return oauthConfig[provider] || { name: provider, icon: '/images/app/bookmarks/placeholder.png' };
}
