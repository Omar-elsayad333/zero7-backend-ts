import NotificationModel, { NotificationDocument } from '../models/notification.model'

const findAll = async (): Promise<NotificationDocument[]> => {
  return NotificationModel.find()
}

export default {
  findAll,
}
