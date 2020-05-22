import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const firestore = admin.firestore();

export default functions.https.onRequest(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    res.send({
      error: true,
      errorCode: 'missing-token',
    });

    return;
  }

  const userDocs = await firestore
    .collection('users')
    .where('token', '==', token)
    .get();

  if (userDocs.empty) {
    res.send({
      error: true,
      errorCode: 'token-incorrect',
    });

    return;
  }

  const userDoc = userDocs.docs[0];

  const storages = await userDoc.ref.collection('storages').get();

  res.send({ storages: storages.docs.map((storage) => storage.id) });
});
