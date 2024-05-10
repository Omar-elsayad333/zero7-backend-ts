// Mongoose
import mongoose from 'mongoose'

// Utils
import { MONGODB_URI } from '../utils/secrets'

const connectDB = async () => {
  try {
    const mongoUrl = MONGODB_URI
    await mongoose.connect(mongoUrl.toString())
  } catch (error) {
    console.log('error listing', error)
    process.exit(1)
  }
}

const db = mongoose.connection

export { connectDB, db }
