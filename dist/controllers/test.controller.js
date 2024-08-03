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
Object.defineProperty(exports, "__esModule", { value: true });
exports.logoutTest = exports.profileTest = exports.loginTest = exports.createTest = exports.test = void 0;
const response_service_1 = require("../services/response.service");
const test = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.status(200).json('success');
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
});
exports.test = test;
const createTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { body } = req;
        console.log(req);
        // sendToRoom(roomId, 'event name', body)
        res.status(201).json('created successfully');
    }
    catch (error) {
        next(new response_service_1.BadRequestError('Invalid Request', error));
    }
});
exports.createTest = createTest;
const loginTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // const accessToken = createAccesToken({ _id })
        res.send(req.session.user);
    }
    catch (error) {
        next(new response_service_1.BadRequestError('Invalid Request', error));
    }
});
exports.loginTest = loginTest;
const profileTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.session.user;
        if (!user)
            throw new Error('Unauthorized user');
        res.send(`Welcome ${user === null || user === void 0 ? void 0 : user.username}`);
    }
    catch (error) {
        next(new response_service_1.UnauthorizedError('Unauthorized Request', error));
    }
});
exports.profileTest = profileTest;
const logoutTest = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.error(err);
                throw new Error(err);
            }
            else {
                res.send('Logged out');
            }
        });
    }
    catch (error) {
        next(new response_service_1.BadRequestError('Invalid Request', error));
    }
});
exports.logoutTest = logoutTest;
