const db = require('../../../config/firebase');
const { FieldValue } = require('firebase-admin').firestore;

const COLLECTION = 'tasks';

async function findAll() {
  const snapshot = await db.collection(COLLECTION).orderBy('createdAt', 'desc').get();
  return snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
}

async function findById(id) {
  const doc = await db.collection(COLLECTION).doc(id).get();
  if (!doc.exists) return null;
  return { id: doc.id, ...doc.data() };
}

async function create(data) {
  const docRef = db.collection(COLLECTION).doc();
  const task = {
    ...data,
    assignedAt: data.assignedAt || FieldValue.serverTimestamp(),
    createdAt: FieldValue.serverTimestamp(),
    updatedAt: FieldValue.serverTimestamp(),
  };
  await docRef.set(task);
  return { id: docRef.id, ...data, assignedAt: null, createdAt: null, updatedAt: null };
}

async function update(id, data) {
  const updates = {
    ...data,
    updatedAt: FieldValue.serverTimestamp(),
  };
  await db.collection(COLLECTION).doc(id).update(updates);
  return findById(id);
}

async function remove(id) {
  await db.collection(COLLECTION).doc(id).delete();
}

module.exports = { findAll, findById, create, update, remove };
