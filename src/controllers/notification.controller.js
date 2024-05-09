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
exports.findAll = void 0;
// Services
const notification_service_1 = __importDefault(require("@/services/notification.service"));
const response_service_1 = require("@/services/response.service");
// GET notifications/
const findAll = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const notifications = yield notification_service_1.default.findAll();
        next(new response_service_1.SuccessResponse('success', notifications));
    }
    catch (error) {
        next(new response_service_1.InternalServerError());
    }
});
exports.findAll = findAll;
