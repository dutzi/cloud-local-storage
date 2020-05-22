import getItem from './commands/get-item';
import setItem from './commands/set-item';
import create from './commands/create';
import list from './commands/list';

function createCloudLocalStorageClient(token: string) {
  return {
    getItem: (key: string) => getItem(key, token),
    setItem: (key: string, value: object | null) => setItem(key, value, token),
  };
}

createCloudLocalStorageClient.getItem = getItem;
createCloudLocalStorageClient.setItem = setItem;
createCloudLocalStorageClient.create = create;
createCloudLocalStorageClient.list = list;

module.exports = createCloudLocalStorageClient;

export default createCloudLocalStorageClient;
