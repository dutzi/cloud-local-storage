export const BASE_URL =
  process.env.NODE_ENV === 'development' && false
    ? 'http://localhost:5011/cloud-local-storage/us-central1'
    : 'https://cls.tools';
