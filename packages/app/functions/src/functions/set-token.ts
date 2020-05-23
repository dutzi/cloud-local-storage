import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const firestore = admin.firestore();

export default functions.https.onCall(async (data, context) => {
  const uid = context.auth?.uid;

  if (!uid) {
    return {
      error: true,
      errorCode: 'uid-not-found',
    };
  }

  const { token } = data;

  if (!token) {
    return {
      error: true,
      errorCode: 'token-missing',
    };
  }

  await firestore.doc(`users/${uid}`).set({ token });

  return {};
});
