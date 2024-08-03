"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import 'tsconfig-paths/register'
const app_1 = __importDefault(require("./src/app"));
// 3rd party libraries
const socket_io_1 = require("socket.io");
// Config
const socket_1 = __importDefault(require("./src/config/socket"));
// Services
const socket_service_1 = __importDefault(require("./src/services/socket.service"));
const server = app_1.default.listen(process.env.PORT, () => {
    console.log('connected to db & listening on port', process.env.PORT);
});
const socketIO = new socket_io_1.Server(server, socket_1.default);
app_1.default.set('socket', socketIO);
socketIO.on('connection', socket_service_1.default);
