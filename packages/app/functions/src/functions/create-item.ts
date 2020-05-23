import * as functions from 'firebase-functions';
import { uuid } from 'uuidv4';
import getUserByToken from '../utils/get-user-by-token';

export default functions.https.onRequest(async (req, res) => {
  const { token, name } = JSON.parse(req.body);

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

  const key = name || uuid();

  await user.ref.collection('data').doc(key).create({});

  res.send({ key });
});
