import { useMutation } from '@tanstack/vue-query';

import { cloudinaryService } from '@/services/cloudinary.service';

export function useUploadMedia() {
  return useMutation({
    mutationFn: cloudinaryService.uploadToCloudinary
  });
}
