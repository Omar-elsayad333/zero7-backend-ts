import admin, { ServiceAccount } from 'firebase-admin'
import serviceAccount from './zero7-406120-firebase-adminsdk-atmoz-79c9bba6a5.json' // Download from Firebase Console

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as string | ServiceAccount),
  storageBucket: 'zero7-406120.appspot.com', // Replace with your bucket name
})

const bucket = admin.storage().bucket()

export { admin, bucket }
