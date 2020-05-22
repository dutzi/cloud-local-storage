import fetch from 'node-fetch';

// const BASE_URL = 'http://localhost:5011/cloud-local-storage/us-central1';
const BASE_URL = 'http://localhost:5011/cloud-local-storage/us-central1';

function createCloudLocalStorageClient(token: string) {
  function getItem(key: string) {
    return fetch(`${BASE_URL}/getItem?key=${key}&token=${token}`).then(
      (res) => res.json() as object | null
    );
  }

  function setItem(key: string, data: object | null) {
    if (typeof data !== 'object' || Array.isArray(data)) {
      throw new Error('data-not-object');
    }

    return fetch(`${BASE_URL}/setItem`, {
      method: 'post',
      body: JSON.stringify({
        key,
        data,
        token,
      }),
    }).then((res) => res.json());
  }

  return { getItem, setItem };
}

module.exports = createCloudLocalStorageClient;

export default createCloudLocalStorageClient;
