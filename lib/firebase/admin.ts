import admin from 'firebase-admin'
import serviceAccount from './serviceAccountKey.json'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert({
      privateKey: serviceAccount.private_key,
      clientEmail: serviceAccount.client_email,
      projectId: serviceAccount.project_id,
    }),
    databaseURL: 'https://anywhere-fitness-296903.firebaseio.com',
  });
}

export default admin