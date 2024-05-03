import mongoose, { Document } from 'mongoose'

export interface NotificationDocument extends Document {
  message: string
  userId?: string
}

const notificationSchema = new mongoose.Schema({
  message: { type: String, required: true },
  token: { type: String, required: true },
  userId: { type: String, required: false },
})

const Notification = mongoose.model<NotificationDocument>('Notification', notificationSchema)

export default Notification
