import cls from 'cloud-local-storage';

const storage = cls('my-token');

storage.setItem('some-key', { a: 1, b: 3 }).then(() => {
  return storage.getItem('some-key').then((res) => console.log(res));
});
