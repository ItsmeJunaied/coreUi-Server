const { initializeApp, cert } = require('firebase-admin/app');
const { getFirestore } = require('firebase-admin/firestore');

const serviceAccount = require('./coreUI.json');

const admin = initializeApp({
    credential: cert(serviceAccount)
});

const db = getFirestore(admin);

module.exports = { db, admin };
