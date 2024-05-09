"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToRoom = void 0;
// Socket server
const __1 = require("..");
// Socket connection
function notificationSocket(socket) {
    const userToken = socket.handshake.auth.token;
    console.log(`A user connected with id: ${socket.id}, token: ${userToken}`);
    // const { _id } = jwt.verify(socket.handshake.auth.token, JWT_SECRET) as JwtPayload
    // Todo: join room by user id to have access to each user alone
    socket.join('some room');
    socket.on('disconnect', () => {
        console.log(`User with id: ${socket.id} disconnected`);
    });
}
exports.default = notificationSocket;
// Send to spcific room
const sendToRoom = (roomId, eventName, body) => {
    __1.socketIO.to(roomId).emit(eventName, body);
};
exports.sendToRoom = sendToRoom;
