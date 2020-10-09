import * as admin from 'firebase-admin';
import * as functions from 'firebase-functions';

const firestore = admin.firestore();

export default functions.https.onCall(async (_, context) => {
  const uid = context.auth?.uid;

  if (!uid) {
    return {
      error: true,
      errorCode: 'uid-not-found',
    };
  }

  const user = (await firestore.doc(`users/${uid}`).get()).data();

  if (!user) {
    return {
      error: true,
      errorCode: 'user-is-empty',
    };
  }

  return { token: user.token };
});
