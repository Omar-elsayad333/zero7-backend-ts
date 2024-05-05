import mongoose, { Document, Schema } from 'mongoose'

export interface NotificationDocument extends Document {
  token: string
  status: string
  message: string
  userId?: string
}

const notificationSchema = new Schema({
  token: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: false,
  },
  userId: {
    type: Schema.Types.ObjectId,
    required: false,
  },
})

const NotificationModel = mongoose.model<NotificationDocument>('Notification', notificationSchema)

export default NotificationModel
