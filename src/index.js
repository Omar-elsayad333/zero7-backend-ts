"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.socketIO = void 0;
const app_1 = __importDefault(require("@/app"));
// 3rd party libraries
const socket_io_1 = require("socket.io");
// Config
const socket_1 = __importDefault(require("@/config/socket"));
// Services
const socket_service_1 = __importDefault(require("@/services/socket.service"));
const server = app_1.default.listen(process.env.PORT, () => __awaiter(void 0, void 0, void 0, function* () {
    console.log('connected to db & listening on port', process.env.PORT);
}));
exports.socketIO = new socket_io_1.Server(server, socket_1.default);
exports.socketIO.on('connection', socket_service_1.default);
exports.default = server;
