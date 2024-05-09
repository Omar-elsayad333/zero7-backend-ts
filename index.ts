import app from '@/app'

// 3rd party libraries
import { Server } from 'socket.io'

// Config
import socketConfig from '@/config/socket'

// Services
import notificationSocket from '@/services/socket.service'

const server = app.listen(process.env.PORT, async () => {
  console.log('connected to db & listening on port', process.env.PORT)
})

export const socketIO = new Server(server, socketConfig)

socketIO.on('connection', notificationSocket)

export default server
