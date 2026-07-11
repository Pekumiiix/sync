import { computed, type MaybeRefOrGetter, toValue } from 'vue';
import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { notificationService } from '@/services/notification.service';
import type { IBaseNotificationPayload, IGetNotificationsParam } from '@/types/notification.type';

/**
 * Hook to retrieve all user notifications.
 */
export function useGetAllNotifications(params: MaybeRefOrGetter<IGetNotificationsParam>) {
  return useQuery(
    computed(() => {
      const unwrappedParams = toValue(params);

      return {
        queryKey: QUERY_KEYS.notification.getAllNotifications(),
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
    }
  });
}
