const env = {
  isDev: import.meta.env.DEV,
  frontendUrl: 'http://localhost:5173',
  apiUrl: import.meta.env.VITE_API_URL!,
  cloudinaryCloudName: import.meta.env.VITE_CLOUDINARY_CLOUD_NAME!,
  cloudinaryPresetName: import.meta.env.VITE_CLOUDINARY_PRESET_NAME!
};

export default env;
