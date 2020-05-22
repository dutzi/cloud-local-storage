const whitelist = [
  'http://localhost:3071',
  'http://localhost:3070',
  'http://polychat-local:3070',
  'http://polychat-local:3071',
  'http://polychat.io',
  'http://polychat.org',
];

const corsOptions = {
  origin: function (
    origin: string,
    callback: (err: Error | null, allow?: boolean) => void
  ) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
};

export default corsOptions;
