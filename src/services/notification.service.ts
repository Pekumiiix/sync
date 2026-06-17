import type { IApiResponse } from '@/types/api.type';
import type { INotificationsResponse } from '@/types/notification.type';
import { apiClient } from '@/utils/apiUtils';

class NotificationService {
  getAllNotifications() {
    return apiClient<IApiResponse<INotificationsResponse[]>>('get', '/notifications');
  }

  markAllAsRead() {
    return apiClient<IApiResponse>('post', '/notifications/mark-all-as-read');
  }
}

export const notificationService = new NotificationService();
