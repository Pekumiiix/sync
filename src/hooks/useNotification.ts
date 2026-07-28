import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/keys/query-keys';
import { notificationService } from '@/services/notification.service';
import type { IBaseNotificationPayload, IGetNotificationsParam } from '@/types/notification.type';
import { toaster } from '@/utils/toastUtils';

/**
 * Hook to retrieve all user notifications.
 */
export function useGetAllNotifications(params: MaybeRefOrGetter<IGetNotificationsParam>) {
  return useQuery(
    computed(() => {
      const unwrappedParams = toValue(params);

      return {
        queryKey: computed(() => QUERY_KEYS.notification.getAllNotifications(unwrappedParams)),
        queryFn: () => notificationService.getAllNotifications(unwrappedParams),
        staleTime: 1000 * 60 * 1
      };
    })
  );
}

/**
 * Hook to mark all unread notifications as read.
 */
export function useMarkAllAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.markAllAsRead(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notification.lists()
      });
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

/**
 * Hook to delete all notifications.
 */
export function useDeleteAllNotifications() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: () => notificationService.deleteAllNotifications(),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notification.lists()
      });
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

/**
 * Hook to delete notifications.
 */
export function useDeleteNotification() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IBaseNotificationPayload) =>
      notificationService.deleteNotification(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notification.lists()
      });
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

/**
 * Hook to mark a notification as read.
 */
export function useMarkAsRead() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IBaseNotificationPayload) => notificationService.markAsRead(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notification.lists()
      });
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}

/**
 * Hook to mark a notification as unread.
 */
export function useMarkAsUnread() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: IBaseNotificationPayload) => notificationService.markAsUnread(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.notification.lists()
      });
    },
    onError: (error) => {
      toaster.error(error.message);
    }
  });
}
