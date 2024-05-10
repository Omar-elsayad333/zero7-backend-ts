// import 'tsconfig-paths/register'
import app from './src/app'

// 3rd party libraries
import { Server } from 'socket.io'

// Config
import socketConfig from './src/config/socket'

// Services
import notificationSocket from './src/services/socket.service'

app.listen(process.env.PORT, () => {
  console.log('connected to db & listening on port', process.env.PORT)
})

// export const socketIO = new Server(server, socketConfig)

// socketIO.on('connection', notificationSocket)

// export default server
