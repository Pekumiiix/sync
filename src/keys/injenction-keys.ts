import type { InjectionKey, Ref } from 'vue';

export interface AppContextData {
  canCreateBookmarks: boolean;
}

export const AppContextKey = Symbol() as InjectionKey<Ref<AppContextData>>;
