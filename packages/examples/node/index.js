const localStorage = require('../../node/lib/index')('0000');

localStorage.setItem('my-data-key', { a: 1 }).then(() => {
  return localStorage.getItem('my-data-key').then((res) => console.log(res));
});
