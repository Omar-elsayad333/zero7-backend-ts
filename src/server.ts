import app from './app'

import { Server } from 'socket.io'

// Utils
import { FRONT_URL } from '@/utils/secrets'

// Services
import notificationSocket from '@/services/socket.service'

const server = app.listen(process.env.PORT, async () => {
  console.log('connected to db & listening on port', process.env.PORT)
})

export const socketIO = new Server(server, {
  cors: {
    origin: FRONT_URL,
  },
})

socketIO.on('connection', notificationSocket)

export default server
