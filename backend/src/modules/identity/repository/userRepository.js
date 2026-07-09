const db = require('../../../config/firebase');
const { FieldValue } = require('firebase-admin').firestore;

const COLLECTION = 'users';

async function findByEmail(email) {
  const snapshot = await db
    .collection(COLLECTION)
    .where('email', '==', email)
    .limit(1)
    .get();

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}

async function create({ email }) {
  const docRef = await db.collection(COLLECTION).add({
    email,
    createdAt: FieldValue.serverTimestamp(),
  });

  const doc = await docRef.get();
  return { id: doc.id, ...doc.data() };
}

module.exports = { findByEmail, create };
