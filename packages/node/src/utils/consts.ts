export const BASE_URL =
  process.env.CLOUD_LOCAL_STORAGE_DEV === 'true'
    ? 'http://localhost:5011/cloud-local-storage/us-central1'
    : 'https://us-central1-cloud-local-storage.cloudfunctions.net';
