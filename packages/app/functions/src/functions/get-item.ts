import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import corsOptions from '../cors-options';

const cors = require('cors')(corsOptions);

const firestore = admin.firestore();

export default functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { token, key } = req.query;

    if (!token) {
      res.send({
        error: true,
        errorCode: 'missing-token',
      });

      return;
    }

    if (!key) {
      res.send({
        error: true,
        errorCode: 'missing-key',
      });

      return;
    }

    const data = await firestore.doc(`${token}/${key}`).get();

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
