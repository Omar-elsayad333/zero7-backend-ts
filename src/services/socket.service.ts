import { Socket } from 'socket.io'

// 3rd party libs
import jwt, { JwtPayload } from 'jsonwebtoken'

// Models
import { JWT_SECRET } from '@/utils/secrets'

export default function notificationSocket(socket: Socket) {
  console.log(`A user connected with id: ${socket.id}`)

  socket.on('disconnect', () => {
    console.log(`User with id: ${socket.id} disconnected`)
  })

  socket.on('sendNotification', async (data) => {
    try {
      const notification = new Notification(data)
      await notification.save()

      const { _id } = jwt.verify(data.token, JWT_SECRET) as JwtPayload

      if (_id) {
        socket.to(_id).emit('notification', notification)
      } else {
        socket.broadcast.emit('notification', { id: socket.id })
      }
    } catch (error) {
      console.error(error)
    }
  })
}
