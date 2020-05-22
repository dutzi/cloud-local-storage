import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import corsOptions from '../cors-options';
import getUserByToken from '../utils/get-user-by-token';
import { uuid } from 'uuidv4';

const cors = require('cors')(corsOptions);

const firestore = admin.firestore();

export default functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { token, key, data } = JSON.parse(req.body);

    const _key = key || uuid();

    if (typeof data !== 'object' || Array.isArray(data)) {
      res.send({
        error: true,
        errorCode: 'data-not-object',
      });

      return;
    }

    if (token) {
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

      await firestore.doc(`/users/${user.id}/data/${_key}`).set(data);
    } else {
      await firestore.doc(`/data/${_key}`).set(data);
    }

    res.send({ key: _key });
  });
});
