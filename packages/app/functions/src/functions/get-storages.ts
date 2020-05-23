import * as functions from 'firebase-functions';
import getUserByToken from '../utils/get-user-by-token';

export default functions.https.onRequest(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    res.send({
      error: true,
      errorCode: 'missing-token',
    });

    return;
  }

  if (typeof token !== 'string') {
    res.send({
      error: true,
      errorCode: 'token-invalid',
    });

    return;
  }

  const user = await getUserByToken(token);

  if (!user) {
    res.send({
      error: true,
      errorCode: 'token-incorrect',
    });

    return;
  }

  const storages = await user.ref.collection('storages').get();

  res.send({ storages: storages.docs.map((storage) => storage.id) });
});
