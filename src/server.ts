import app from './app'
import { Server, Socket } from 'socket.io'

// Utils
import { FRONT_URL } from '@/utils/secrets'
import { socketservices } from './services/socket.service'

const server = app.listen(process.env.PORT, async () => {
  console.log('connected to db & listening on port', process.env.PORT)
})

export const socketIO = new Server(server, {
  cors: {
    origin: FRONT_URL,
  },
})

socketIO.on('connection', (socket: Socket) => {
  socketservices(socket)
})

export default server
