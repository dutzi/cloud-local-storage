const localStorage = require('cloud-local-storage')('my-token');

localStorage.setItem('my-data-key', { a: 1 }).then(() => {
  return localStorage.getItem('my-data-key').then((res) => console.log(res));
});
