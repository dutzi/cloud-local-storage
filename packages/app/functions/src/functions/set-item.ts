import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import corsOptions from '../cors-options';

const cors = require('cors')(corsOptions);

const firestore = admin.firestore();

export default functions.https.onRequest((req, res) => {
  cors(req, res, async () => {
    const { token, key, data } = JSON.parse(req.body);

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

    if (typeof data !== 'object' || Array.isArray(data)) {
      res.send({
        error: true,
        errorCode: 'data-not-object',
      });

      return;
    }

    await firestore.doc(`${token}/${key}`).set(data);

    res.send({});
  });
});
