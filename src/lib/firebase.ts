import admin, { ServiceAccount } from 'firebase-admin'
import { firebaseConfig } from './firebaseConfig'

try {
  admin.initializeApp({
    credential: admin.credential.cert(firebaseConfig as ServiceAccount),
  })
  console.log('Initialized.')
} catch (error) {
  if (!/already exists/u.test(error.message)) {
    console.error('Firebase admin initialization error', error.stack)
  }
}

export default admin
