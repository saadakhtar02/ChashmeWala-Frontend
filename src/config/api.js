const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://chashme-wala-backend.vercel.app/api';

export const SERVER_URL = import.meta.env.VITE_SERVER_URL || API_BASE_URL.replace(/\/api\/?$/, '');

export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  if (imagePath.startsWith('http://') || imagePath.startsWith('https://')) {
    return imagePath;
  }
  const cleanPath = imagePath.startsWith('/') ? imagePath : `/${imagePath}`;
  return `${SERVER_URL}${cleanPath}`;
};

export default API_BASE_URL;
