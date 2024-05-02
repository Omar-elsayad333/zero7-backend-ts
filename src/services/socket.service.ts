import { Socket } from 'socket.io'

// App Socket
import { socketIO } from '@/server'

export const socketservices = (socket: Socket) => {
  console.log('a user connected', socket.id)

  socket.on('disconnect', () => {
    console.log(`user ${socket.id} disconnected`)
  })

  // Example: Send notification to all clients when a new message is received
  socket.on('new message', (message: string) => {
    console.log('got new message')

    socketIO.emit('notification', `New message: ${message}`)
  })
}
