const db = require('../../../config/firebase');
const { FieldValue } = require('firebase-admin').firestore;

const COLLECTION = 'users';

async function findByEmail(email, transaction = null) {
  const query = db.collection(COLLECTION).where('email', '==', email).limit(1);
  const snapshot = transaction ? await transaction.get(query) : await query.get();

  if (snapshot.empty) {
    return null;
  }

  const doc = snapshot.docs[0];
  return { id: doc.id, ...doc.data() };
}

async function create({ email }, transaction = null) {
  const docRef = db.collection(COLLECTION).doc();
  const data = { email, createdAt: FieldValue.serverTimestamp() };

  if (transaction) {
    transaction.set(docRef, data);
  } else {
    await docRef.set(data);
  }

  return { id: docRef.id, email };
}

async function findAll() {
  const snapshot = await db.collection(COLLECTION).orderBy('email', 'asc').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

module.exports = { findByEmail, create, findAll };
