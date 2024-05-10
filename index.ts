// import 'tsconfig-paths/register'
import app from './src/app'

// 3rd party libraries
import { Server } from 'socket.io'

// Config
import socketConfig from './src/config/socket'

// Services
import notificationSocket from './src/services/socket.service'

const server = app.listen(process.env.PORT, () => {
  console.log('connected to db & listening on port', process.env.PORT)
})

const socketIO = new Server(server, socketConfig)
app.set('socket', socketIO)
socketIO.on('connection', notificationSocket)
