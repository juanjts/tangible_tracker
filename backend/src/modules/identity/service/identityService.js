const AppError = require('../../../shared/errors/AppError');
const db = require('../../../config/firebase');
const { FieldValue } = require('firebase-admin').firestore;

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const COLLECTION = 'users';

async function identify({ email }) {
  if (!email || !EMAIL_REGEX.test(email)) {
    throw new AppError('Invalid email format', 400);
  }

  return await db.runTransaction(async (transaction) => {
    const snapshot = await transaction.get(
      db.collection(COLLECTION).where('email', '==', email).limit(1)
    );

    if (!snapshot.empty) {
      const doc = snapshot.docs[0];
      return { id: doc.id, ...doc.data() };
    }

    const docRef = db.collection(COLLECTION).doc();
    transaction.set(docRef, {
      email,
      createdAt: FieldValue.serverTimestamp(),
    });

    return { id: docRef.id, email, createdAt: null };
  });
}

module.exports = { identify };
