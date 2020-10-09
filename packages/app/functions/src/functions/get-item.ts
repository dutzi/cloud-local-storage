import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import getUserByToken from '../utils/get-user-by-token';
import cors from 'cors';

const corsHandler = cors({
  origin: true,
  methods: ['GET'],
});

const firestore = admin.firestore();

export default functions.https.onRequest((req, res) => {
  corsHandler(req, res, async () => {
    const { token, key } = req.query;

    if (!key) {
      res.send({
        error: true,
        errorCode: 'missing-key',
      });

      return;
    }

    let data: FirebaseFirestore.DocumentSnapshot<FirebaseFirestore.DocumentData>;

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

      data = await firestore.doc(`/users/${user.id}/data/${key}`).get();
    } else {
      data = await firestore.doc(`/data/${key}`).get();
    }

    if (!data.exists) {
      res.send({
        error: true,
        errorCode: 'does-not-exist',
      });

      return;
    }

    res.send(data.data());
  });
});
