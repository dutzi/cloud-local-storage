import fetch from 'node-fetch';

function createCloudLocalStorageClient(token: string) {
  function getItem(key: string) {
    return fetch(
      `http://localhost:5011/cloud-local-storage/us-central1/getItem?key=${key}&token=${token}`
    ).then((res) => res.json());
  }

  function setItem(key: string, data: object) {
    return fetch(
      `http://localhost:5011/cloud-local-storage/us-central1/setItem`,
      {
        method: 'post',
        body: JSON.stringify({
          key,
          data,
          token,
        }),
      }
    ).then((res) => res.json() as object);
  }

  return { getItem, setItem };
}

module.exports = createCloudLocalStorageClient;

export default createCloudLocalStorageClient;
