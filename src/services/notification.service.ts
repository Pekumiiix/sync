import type { IApiResponse } from '@/types/api.type';
import type {
  IBaseNotificationPayload,
  IGetNotificationsParam,
  INotification,
  INotificationsResponse
} from '@/types/notification.type';
import { apiClient } from '@/utils/apiUtils';

class NotificationService {
  getAllNotifications(params: IGetNotificationsParam) {
    return apiClient<IApiResponse<INotificationsResponse>>('get', '/notifications', params);
  }

  deleteAllNotifications() {
    return apiClient<IApiResponse>('delete', '/notifications');
  }

  markAllAsRead() {
    return apiClient<IApiResponse>('patch', '/notifications/mark-all-as-read');
  }

  deleteNotification(payload: IBaseNotificationPayload) {
    return apiClient<IApiResponse>('delete', `/notifications/${payload.notificationId}`);
  }

  markAsRead(payload: IBaseNotificationPayload) {
    return apiClient<IApiResponse<INotification>>(
      'patch',
      `/notifications/${payload.notificationId}/read`
    );
  }

  markAsUnread(payload: IBaseNotificationPayload) {
    return apiClient<IApiResponse<INotification>>(
      'patch',
      `/notifications/${payload.notificationId}/unread`
    );
  }
}

export const notificationService = new NotificationService();
