import type { IInvitationDetails } from '@/types/invitation.type';

export const mockPendingInvitation: IInvitationDetails = {
  token: 'inv_ab72-xyz9-1234',
  invitedAt: '2026-06-14T13:55:00Z',
  folder: {
    id: 'fld_unsorted',
    name: 'Unsorted',
    images: [
      'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&q=80',
      'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=100&q=80',
      'https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=100&q=80'
    ],
    isPasswordProtected: true
  },
  inviter: {
    name: 'Johnson',
    avatarUrl: 'https://i.pravatar.cc/150?u=jj1'
  }
};
