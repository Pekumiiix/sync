import type { INotificationItem } from '@/types/app.type';
import type { INotification } from '@/types/app.type';

export function formatNotificationForUI(notification: INotification): INotificationItem {
  const { id, isRead, type, actor, target, createdAt } = notification;

  let title;
  let description;
  let isInvitation = false;

  switch (type) {
    case 'new_member_joined':
      title = 'New Member Joined';
      description = `Your request has been accepted and you are now part of the ${target.name} ${target.type}.`;
      break;

    case 'new_entry':
      title = 'New Entry';
      description = `${actor.name} has added a new entry to "${target.name}". Take a look to stay updated.`;
      break;

    case 'member_request':
      title = 'New Member request';
      description = `${actor.name} has sent a request to be part of ${target.name}, click below to choose an option.`;
      isInvitation = notification.actionStatus === 'pending';
      break;

    case 'invite_request':
      title = 'New invite request';
      description = `${actor.name} has requested access to the folder "${target.name}". Join to begin collaborating.`;
      isInvitation = notification.actionStatus === 'pending';
      break;

    default:
      title = 'New Notification';
      description = 'You have a new update.';
  }

  return {
    id,
    isRead,
    user: {
      name: actor.name,
      avatarUrl: actor.avatarUrl
    },
    title,
    description,
    time: createdAt,
    isInvitation
  };
}
