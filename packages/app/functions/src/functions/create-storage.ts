import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';
import { uuid } from 'uuidv4';

const firestore = admin.firestore();

export default functions.https.onRequest(async (req, res) => {
  const { token, name } = JSON.parse(req.body);

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

  const storageName = name || uuid();

  await userDoc.ref.collection('storages').doc(storageName).create({});

  res.send({ name: storageName });
});
