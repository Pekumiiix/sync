import { useMutation, useQuery, useQueryClient } from '@tanstack/vue-query';

import { QUERY_KEYS } from '@/components/constants/query-keys';
import { notificationService } from '@/services/notification.service';

/**
 * Hook to retrieve all user notifications.
 */
export function useGetAllNotifications() {
  return useQuery({
    queryKey: QUERY_KEYS.notification.getAllNotifications(),
    queryFn: () => notificationService.getAllNotifications(),
    staleTime: 1000 * 60 * 1
  });
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
        queryKey: QUERY_KEYS.notification.all
      });
    }
  });
}
