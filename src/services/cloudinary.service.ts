import axios from 'axios';
import type { UploadApiResponse } from 'cloudinary';

import env from '@/config/env';

const CLOUD_NAME = env.cloudinaryCloudName;
const UPLOAD_PRESET = env.cloudinaryPresetName;

class CloudinaryService {
  uploadToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();

    formData.append('file', file);
    formData.append('upload_preset', UPLOAD_PRESET);

    const response = await axios.post<UploadApiResponse>(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      formData
    );

    return response.data.secure_url;
  };
}

export const cloudinaryService = new CloudinaryService();
