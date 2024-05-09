import { Socket } from 'socket.io'

// 3rd party libs
// import jwt, { JwtPayload } from 'jsonwebtoken'

// Socket server
import { socketIO } from '../../server'

// Utils
// import { JWT_SECRET } from '@/utils/secrets'

// Socket connection
export default function notificationSocket(socket: Socket) {
  const userToken = socket.handshake.auth.token
  console.log(`A user connected with id: ${socket.id}, token: ${userToken}`)

  // const { _id } = jwt.verify(socket.handshake.auth.token, JWT_SECRET) as JwtPayload

  // Todo: join room by user id to have access to each user alone
  socket.join('some room')

  socket.on('disconnect', () => {
    console.log(`User with id: ${socket.id} disconnected`)
  })
}

// Send to spcific room
export const sendToRoom = (roomId: string, eventName: string, body?: string) => {
  socketIO.to(roomId).emit(eventName, body)
}
