import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import getUserByToken from '../utils/get-user-by-token';
import { uuid } from 'uuidv4';
import cors from 'cors';

const corsHandler = cors({
  origin: true,
  methods: ['POST'],
});

const firestore = admin.firestore();

export default functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    let body: any;

    try {
      body = JSON.parse(req.body);
    } catch (err) {
      body = req.body;
    }

    const { token, key, data } = body;

    const _key = key || uuid();

    // if (typeof data !== 'object' || Array.isArray(data)) {
    //   res.send({
    //     error: true,
    //     errorCode: 'data-not-object',
    //   });

    //   return;
    // }

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

      await firestore
        .doc(`/users/${user.id}/data/${_key}`)
        .set({ data, dateModified: new Date().getTime() });
    } else {
      await firestore
        .doc(`/data/${_key}`)
        .set({ data, dateModified: new Date().getTime() });
    }

    res.send({ key: _key });
  });
});
