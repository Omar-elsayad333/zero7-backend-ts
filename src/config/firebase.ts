import admin, { ServiceAccount } from 'firebase-admin'
import * as serviceAccount from './zero7-406120-firebase-adminsdk-atmoz-ed2f9ba3e5.json'

const serviceAccountCredentials = serviceAccount as ServiceAccount

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountCredentials),
  storageBucket: 'zero7-406120.appspot.com', // Replace with your bucket name
})

const bucket = admin.storage().bucket()

export { admin, bucket }
