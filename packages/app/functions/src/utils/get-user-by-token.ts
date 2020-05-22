import * as admin from 'firebase-admin';

const firestore = admin.firestore();

export default async function getUserByToken(token: string) {
  const userDocs = await firestore
    .collection('users')
    .where('token', '==', token)
    .get();

  if (userDocs.empty) {
    return null;
  }

  return userDocs.docs[0];
}
