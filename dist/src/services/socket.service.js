"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendToRoom = void 0;
// 3rd party libs
// import jwt, { JwtPayload } from 'jsonwebtoken'
// Socket server
const app_1 = __importDefault(require("../app"));
// Utils
// import { JWT_SECRET } from '@/utils/secrets'
const socketIO = app_1.default.get('socket');
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
    socketIO.to(roomId).emit(eventName, body);
};
exports.sendToRoom = sendToRoom;
