import admin, { ServiceAccount } from 'firebase-admin'

const serviceAccount = JSON.parse(process.env.FIREBASE_SECRET || '')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as string | ServiceAccount),
  storageBucket: 'zero7-406120.appspot.com', // Replace with your bucket name
})

const bucket = admin.storage().bucket()

export { admin, bucket }
